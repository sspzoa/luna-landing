// src/app/layout.tsx
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import FixedScalingLayout from '@/components/layout/FixedScalingLayout';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScalingLayout from '@/components/layout/ScalingLayout';
import { PersistQueryClientProvider } from '@/providers/PersistQueryClientProvider';
import type React from 'react';

const SuitVariable = localFont({
  src: [
    {
      path: './fonts/SUIT-Variable.woff2',
    },
  ],
  variable: '--font-SuitVariable',
});

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
      <body className={`${SuitVariable.variable} antialiased`}>
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
