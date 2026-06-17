import fs from 'fs'
import path from 'path'

import rehypeShiki from '@shikijs/rehype'
import matter from 'gray-matter'
import { toString as hastToString } from 'hast-util-to-string'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

import type { Element, Root } from 'hast'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface TocItem {
  id: string
  text: string
  level: 1 | 2 | 3
}

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage?: string
  tags?: string[]
  contentHtml?: string
  toc?: TocItem[]
  readMinutes: number
}

/**
 * Estimate reading time from raw markdown content. Handles mixed CJK + Latin
 * text by counting Chinese characters and English words separately, then
 * combining them with typical reading speeds:
 *   - Chinese: ~400 chars/min
 *   - English: ~220 words/min
 * Returns at least 1 minute.
 */
function estimateReadMinutes(markdown: string): number {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')

  const chineseChars = stripped.match(/[\u4e00-\u9fa5]/g)?.length ?? 0
  const englishWords = stripped.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0

  const minutes = chineseChars / 400 + englishWords / 220
  return Math.max(1, Math.ceil(minutes))
}

/**
 * Get sorted posts data for listing
 */
export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        coverImage: matterResult.data.coverImage,
        tags: matterResult.data.tags || [],
        readMinutes: estimateReadMinutes(matterResult.content),
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => ({
      slug: fileName.replace(/\.md$/, ''),
    }))
}

/** Walks the HAST after rehype-slug and collects h1/h2/h3 with their IDs. */
function rehypeExtractToc(toc: TocItem[]) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const match = /^h([1-3])$/.exec(node.tagName)
      if (!match) return
      const id = node.properties?.id
      if (typeof id !== 'string') return
      toc.push({
        id,
        text: hastToString(node),
        level: Number(match[1]) as 1 | 2 | 3,
      })
    })
  }
}

/**
 * Reads optional hash params from `<img>` `src` and turns them into inline styles:
 *   - `#w=NUMBER` / `#h=NUMBER` — width / height (pure number → `px`)
 *   - `#align=left|center|right` — horizontal alignment
 *
 * Example: `![alt](/foo.webp#w=320&align=left)` →
 * `<img src="/foo.webp" style="display: block; width: 320px; margin-left: 0; margin-right: auto;">`.
 *
 * The hash is stripped from `src` after parsing so it doesn't leak into the URL.
 * Images without a hash are left untouched, so existing posts keep their behavior.
 */
function rehypeImageSize() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return
      const src = node.properties?.src
      if (typeof src !== 'string') return
      const hashIndex = src.indexOf('#')
      if (hashIndex < 0) return

      const params = new URLSearchParams(src.slice(hashIndex + 1))
      const rawW = params.get('w')
      const rawH = params.get('h')
      const align = params.get('align')
      if (!rawW && !rawH && !align) return

      const toCssLength = (v: string) => (/^\d+(\.\d+)?$/.test(v) ? `${v}px` : v)
      const decls: string[] = ['display: block']
      if (rawW) decls.push(`width: ${toCssLength(rawW)}`)
      if (rawH) decls.push(`height: ${toCssLength(rawH)}`)
      if (align === 'left') decls.push('margin-left: 0', 'margin-right: auto')
      else if (align === 'right') decls.push('margin-left: auto', 'margin-right: 0')
      else if (align === 'center') decls.push('margin-left: auto', 'margin-right: auto')

      node.properties = node.properties ?? {}
      node.properties.src = src.slice(0, hashIndex)
      const existing = typeof node.properties.style === 'string' ? node.properties.style.trim().replace(/;$/, '') : ''
      node.properties.style = [existing, decls.join('; ')].filter(Boolean).join('; ')
    })
  }
}

/** Turns a `<p>` that contains only images into a horizontal flex row. */
function rehypeImageRow() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'p') return

      const children = node.children ?? []
      const onlyImages = children.every(child => {
        if (child.type === 'element') return (child as Element).tagName === 'img'
        if (child.type === 'text') return /^\s*$/.test(child.value)
        return false
      })
      const images = children.filter(
        child => child.type === 'element' && (child as Element).tagName === 'img',
      ) as Element[]
      if (!onlyImages || images.length < 2) return

      node.tagName = 'div'
      node.properties = {
        style: 'display: flex; gap: 1rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 2rem 0',
      }

      for (const img of images) {
        img.properties = img.properties ?? {}
        const existing = typeof img.properties.style === 'string' ? img.properties.style.trim().replace(/;$/, '') : ''
        img.properties.style = [existing, 'margin: 0'].filter(Boolean).join('; ')
      }
    })
  }
}

/**
 * Get post data by slug with parsed HTML content
 */
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const toc: TocItem[] = []

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeImageSize)
    .use(rehypeImageRow)
    .use(rehypeExtractToc, toc)
    .use(rehypeShiki, {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    })
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    toc,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    coverImage: matterResult.data.coverImage,
    tags: matterResult.data.tags || [],
    readMinutes: estimateReadMinutes(matterResult.content),
  }
}
