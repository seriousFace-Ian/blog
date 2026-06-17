import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

import type { PostData } from '@/lib/posts'

interface PostCardProps {
  post: PostData
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.date
    ? format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })
    : ''
  const readMin = post.readMinutes

  return (
    <article className="border-b border-border last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block py-8 group">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-2">
          {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
          {formattedDate && <span aria-hidden>•</span>}
          <span>{readMin} 分钟阅读</span>
        </div>
        <h2 className="text-xl font-medium text-foreground mb-3 group-hover:underline decoration-primary/30 underline-offset-4">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        )}
        <span className="text-sm text-primary inline-flex items-center gap-1 group-hover:underline underline-offset-4">
          阅读全文
          <span aria-hidden>→</span>
        </span>
      </Link>
    </article>
  )
}
