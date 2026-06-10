'use client'

import { useEffect, useState } from 'react'

import type { TocItem } from '@/lib/posts'

interface Props {
  items: TocItem[]
}

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length === 0) return
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActiveId(topmost.target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )

    const els = items
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="本页目录" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        本页目录
      </div>
      <ul className="space-y-1.5 text-sm border-l border-border">
        {items.map(item => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault()
                  const target = document.getElementById(item.id)
                  if (!target) return
                  const top = target.getBoundingClientRect().top + window.scrollY - 72
                  window.scrollTo({ top, behavior: 'smooth' })
                  window.history.replaceState(null, '', `#${item.id}`)
                  setActiveId(item.id)
                }}
                className={`-ml-px block border-l-2 py-1 transition-colors ${
                  isActive
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
