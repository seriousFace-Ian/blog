import PostCard from '@/components/PostCard'
import { getSortedPostsData } from '@/lib/posts'

export default function Home() {
  const posts = getSortedPostsData()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="gradient-text">探索</span>
              <span className="text-white">、</span>
              <span className="gradient-text">思考</span>
              <span className="text-white">、</span>
              <span className="gradient-text">分享</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              这里记录着我的技术探索、编程心得与生活感悟。欢迎来到我的数字花园。
            </p>
          </div>

          {/* Stats or tags */}
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {['React', 'TypeScript', 'Next.js', 'Web 开发', '随笔'].map(tag => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium text-zinc-300 bg-white/5 rounded-full border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-semibold text-white">最新文章</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
                <svg
                  className="w-8 h-8 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-zinc-300 mb-2">暂无文章</h3>
              <p className="text-zinc-500">
                在 <code className="text-amber-400">posts/</code> 目录中添加 Markdown 文件开始写作吧
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
