import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "关于 | Ian's Blog",
  description: '了解更多关于这个博客和我的信息',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">关于</h1>
          <div className="mt-4 h-px bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-transparent" />
        </header>

        <div className="prose max-w-none animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2>👋 你好</h2>
          <p>
            欢迎来到我的博客！我是一名热爱技术的开发者，这里是我记录学习、思考和成长的地方。
          </p>

          <h2>🛠 技术栈</h2>
          <p>这个博客使用以下技术构建：</p>
          <ul>
            <li>
              <strong>Next.js</strong> - React 框架，支持服务端渲染和静态生成
            </li>
            <li>
              <strong>TypeScript</strong> - 类型安全的 JavaScript
            </li>
            <li>
              <strong>Tailwind CSS</strong> - 原子化 CSS 框架
            </li>
            <li>
              <strong>Markdown</strong> - 文章格式，简洁高效
            </li>
          </ul>

          <h2>📮 联系我</h2>
          <p>如果你有任何问题或想法，欢迎通过以下方式联系我：</p>
          <ul>
            <li>GitHub</li>
            <li>Email</li>
            <li>Twitter / X</li>
          </ul>

          <h2>📝 关于文章</h2>
          <p>
            博客中的所有文章都以 Markdown 格式编写，存放在 <code>posts/</code> 目录下。
            每篇文章都支持以下 frontmatter 字段：
          </p>

          <pre>
            <code>
              {`---
title: 文章标题
date: 2024-01-01
excerpt: 文章摘要
tags:
  - 标签1
  - 标签2
---`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}



