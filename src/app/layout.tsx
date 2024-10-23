import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IT 소셜벤처 동아리, LUNA",
  description: "한국디지털미디어고등학교의 IT 소셜벤처 동아리.",
    keywords: "루나,LUNA,디미고,DIMIGO,동아리,IT소셜벤처",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="kr">
      <link rel='icon' href='/icons/logo.svg'/>
      <meta name="theme-color" content="#524B9B"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="#524B9B"/>
      <body className={inter.className}>
      <Header/>
      {children}
      <Footer/>
      </body>
      </html>
  );
}
