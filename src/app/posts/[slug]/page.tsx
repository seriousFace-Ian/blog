import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import TableOfContents from '@/components/TableOfContents'
import { getAllPostSlugs, getPostData } from '@/lib/posts'

import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostData(slug)
    return {
      title: `${post.title} | Ian's Blog`,
      description: post.excerpt,
    }
  } catch {
    return {
      title: '文章未找到',
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostData(slug)
  } catch {
    notFound()
  }

  const formattedDate = post.date
    ? format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })
    : ''

  return (
    <article className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <div className="min-w-0">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>

          {/* Header */}
          <header className="mb-12 animate-fade-in">
            <time className="text-sm text-muted-foreground">{formattedDate}</time>

            <h1 className="mt-4 text-3xl md:text-4xl font-medium text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs text-muted-foreground bg-accent/50 rounded-md border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 h-px bg-border" />
          </header>

          {/* Content */}
          <div
            className="prose max-w-none animate-fade-in"
            style={{ animationDelay: '100ms' }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                返回文章列表
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                回到顶部 ↑
              </a>
            </div>
          </footer>
        </div>

        <aside className="hidden lg:block">
          <TableOfContents items={post.toc || []} />
        </aside>
      </div>
    </article>
  )
}
