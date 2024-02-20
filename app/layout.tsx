import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Runway | Find the outfit you love',
  description: 'Find the outfit you love',
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <body className={inter.className}>
          <Navbar/>
          {children}
          <Toaster />
        </body>
    </html>
  )
}
