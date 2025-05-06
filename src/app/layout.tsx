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
  keywords:
    '루나,LUNA,디미고,DIMIGO,동아리,IT소셜벤처,한국디지털미디어고등학교,디미고 대학,디미고 동아리,디미고 입학,디미고 현실,디미고 수준,디미고 논란,디미고 경쟁률,디미고 홈페이지,디미고 내신 커트라인,디미고 현실 디시,디미고 학비,디미고 입결,디미고 급식,디미고 갤러리,디미고 교복,디미고갤,디미고 기숙사,디미고 커트라인,디미고 내신',
  openGraph: {
    images: [{ url: 'https://luna.codes/images/og-image.png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="w_nnQriETB8E6N6G5_VmiJNX9KEXKxaqCigLRsVmi4g" />
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
