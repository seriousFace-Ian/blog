import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    <article className="min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-400 transition-colors mb-8 group"
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
          {/* Date */}
          <time className="text-sm font-medium text-zinc-500 tracking-wider uppercase">
            {formattedDate}
          </time>

          {/* Title */}
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-zinc-400 bg-white/5 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="mt-8 h-px bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-transparent" />
        </header>

        {/* Content */}
        <div
          className="prose max-w-none animate-fade-in"
          style={{ animationDelay: '100ms' }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors group"
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
            <a
              href="#"
              className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
            >
              回到顶部 ↑
            </a>
          </div>
        </footer>
      </div>
    </article>
  )
}

