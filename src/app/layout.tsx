import type { Metadata, Viewport } from 'next';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScalingLayout from '@/components/layout/ScalingLayout';
import { PersistQueryClientProvider } from '@/providers/PersistQueryClientProvider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'IT 소셜벤처 동아리, LUNA',
  description: '한국디지털미디어고등학교의 IT 소셜벤처 동아리.',
  keywords:
    '루나,LUNA,디미고,DIMIGO,동아리,IT소셜벤처,한국디지털미디어고등학교,디미고 대학,디미고 동아리,디미고 입학,디미고 현실,디미고 수준,디미고 논란,디미고 경쟁률,디미고 홈페이지,디미고 내신 커트라인,디미고 현실 디시,디미고 학비,디미고 입결,디미고 급식,디미고 갤러리,디미고 교복,디미고갤,디미고 기숙사,디미고 커트라인,디미고 내신',
  openGraph: {
    title: 'IT 소셜벤처 동아리, LUNA',
    description: '한국디지털미디어고등학교의 IT 소셜벤처 동아리.',
    url: 'https://luna.codes',
    siteName: 'LUNA',
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: 'https://luna.codes/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT 소셜벤처 동아리, LUNA',
    description: '한국디지털미디어고등학교의 IT 소셜벤처 동아리.',
    images: ['https://luna.codes/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: 'LUNA',
  authors: [{ name: 'LUNA', url: 'https://github.com/luna-codes' }],
};

export const viewport: Viewport = {
  themeColor: '#524b9b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="w_nnQriETB8E6N6G5_VmiJNX9KEXKxaqCigLRsVmi4g" />
        <meta name="google-adsense-account" content="ca-pub-2186209581588169" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2186209581588169"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">
        <Analytics />
        <SpeedInsights />
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
