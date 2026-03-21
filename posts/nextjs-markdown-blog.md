---
title: 使用 Next.js 构建 Markdown 博客
date: 2025-12-03
excerpt: 详细介绍如何使用 Next.js、TypeScript 和 Tailwind CSS 从零开始构建一个支持 Markdown 的博客。
tags:
  - Next.js
  - React
  - 教程
---

## 技术选型

### 为什么选择 Next.js？

Next.js 是一个强大的 React 框架，它提供了：

- **静态生成 (SSG)** - 在构建时生成 HTML，适合博客场景
- **文件系统路由** - 基于文件结构自动生成路由
- **优秀的开发体验** - 快速刷新、TypeScript 支持等

### Markdown 解析

我们使用以下库来处理 Markdown：

- `gray-matter` - 解析 frontmatter（文章元数据）
- `remark` + `remark-html` - 将 Markdown 转换为 HTML

## 核心实现

### 获取文章列表

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getSortedPostsData() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPosts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return { slug, ...data }
  })
  
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}
```



