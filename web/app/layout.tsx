import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StoreProvider } from '@/components/store-provider'
import { AuthProvider } from '@/contexts/auth-context'
import './globals.css'
import { AuthGate } from '@/components/auth-gate'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Nova Mall — The Future of Shopping',
  description:
    'Nova Mall is a premium smart shopping experience. Discover, scan, prebook and check out with a luxurious futuristic interface.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#161a2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
       <AuthProvider>
  <AuthGate>
    <StoreProvider>{children}</StoreProvider>
  </AuthGate>
</AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
