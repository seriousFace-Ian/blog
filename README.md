# Personal Blog

Build by Next.js, deploy power by GitHub + Vercel

## Tech Stack

- **Next.js** - React framework with SSG/SSR support
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## Code Style Management

- **ESLint** - JavaScript/TypeScript linter
- **Prettier** - Code formatter

## Article

- Markdown format with frontmatter support
- Independent path for every article (`/posts/[slug]`)
- Place your markdown files in the `posts/` directory

### Article Format

```markdown
---
title: Article Title
date: 2024-01-01
excerpt: A brief summary of the article
tags:
  - tag1
  - tag2
---

# Content starts here...
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Deployment

All assets are static. Once pushed to the GitHub repo, Vercel can do its job successfully.

1. Push code to GitHub
2. Import repository in Vercel
3. Auto build and deploy on every push

## Project Structure

```
├── posts/              # Markdown articles
├── public/             # Static assets
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── about/     # About page
│   │   ├── posts/     # Article pages
│   │   ├── layout.tsx # Root layout
│   │   └── page.tsx   # Home page
│   ├── components/    # React components
│   └── lib/           # Utility functions
├── .prettierrc        # Prettier config
├── eslint.config.mjs  # ESLint config
└── tailwind.config.ts # Tailwind config
```
