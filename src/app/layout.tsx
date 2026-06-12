import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono as GeistMono } from 'next/font/google'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ThemeProvider from '@/components/ThemeProvider'

import type { Metadata } from 'next'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Ian's Blog",
  description: '分享技术、思考与生活',
  keywords: ['blog', 'tech', 'programming', 'web development'],
  authors: [{ name: 'Ian' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        <Analytics />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
