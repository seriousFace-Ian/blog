import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import type { PostData } from '@/lib/posts'

interface PostCardProps {
  post: PostData
  index: number
}

export default function PostCard({ post, index }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })
    : ''

  return (
    <Link href={`/posts/${post.slug}`}>
      <article
        className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-orange-500/0 to-red-500/0 group-hover:from-amber-500/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500" />

        <div className="relative">
          {/* Date */}
          <time className="text-xs font-medium text-zinc-500 tracking-wider uppercase">
            {formattedDate}
          </time>

          {/* Title */}
          <h2 className="mt-3 text-xl font-semibold text-white group-hover:text-amber-200 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-white/5 rounded-full border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read more arrow */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>阅读全文</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}



