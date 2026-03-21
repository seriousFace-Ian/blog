import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "关于 | Ian's Blog",
  description: '了解更多关于这个博客和我的信息',
}

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">关于</h1>
          <div className="mt-6 h-px bg-border" />
        </header>

        <div className="prose max-w-none animate-fade-in" style={{ animationDelay: '100ms' }}>
          <p>
            欢迎来到我的博客！前端开发者，正在转全栈开发的路上，这里将记录我的转型之路和一些生活碎片。欢迎互相交流。
          </p>

          <h2>📮 联系我</h2>
          <ul>
            <li>
              <a href="https://github.com/seriousFace-Ian">GitHub</a>
            </li>
            <li>
              <a href="mailto:ianchoi.cn@gmail.com">Email</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
