import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

import './globals.css'
import { NavbarTest } from '@/components/ui/NavbarTest'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

// const roboto = Roboto({
//   weight: '400',
//   subsets: ['latin'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'Runway | Where fashion lovers hang',
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
    <html lang="en" className={`${inter.className}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="https://getlaunchlist.com/js/widget.js" defer></script> */}
      </Head>
        <body className='bg-gray'>
          {/* <Navbar/> */}
          <NavbarTest/>
          {children}
          <Toaster />
          <Analytics />
        </body>
    </html>
  )
}
