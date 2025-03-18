// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScalingLayout from '@/components/layout/ScalingLayout';
import { PersistQueryClientProvider } from '@/providers/PersistQueryClientProvider';
import type React from 'react';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'IT 소셜벤처 동아리, LUNA',
  description: '한국디지털미디어고등학교의 IT 소셜벤처 동아리.',
  keywords: '루나,LUNA,디미고,DIMIGO,동아리,IT소셜벤처',
  openGraph: {
    images: [{ url: 'https://luna.codes/images/og-image.png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2186209581588169"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Analytics />
        <PersistQueryClientProvider>
          <Navbar />
          <ScalingLayout>
            {children}
            <Footer />
          </ScalingLayout>
        </PersistQueryClientProvider>
      </body>
    </html>
  );
}
