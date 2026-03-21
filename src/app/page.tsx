import PostCard from '@/components/PostCard'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const posts = getSortedPostsData()

  return (
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-2xl font-medium text-foreground tracking-tight">欢迎来到我的博客</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            记录技术、设计与日常思考——学习与构建过程中的笔记与随笔。
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-0">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground mb-2">暂无文章</p>
            <p className="text-sm text-muted-foreground">
              在 <code className="text-primary font-mono text-xs">posts/</code> 目录中添加 Markdown 文件开始写作
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
