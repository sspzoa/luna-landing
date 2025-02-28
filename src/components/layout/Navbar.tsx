'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const TRANSPARENT_PAGES = ['/members', '/projects'];

export default function Navbar() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition === 0);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparentPage = TRANSPARENT_PAGES.includes(pathname);
  const shouldBeTransparent = isAtTop && isTransparentPage;

  const backgroundColor = shouldBeTransparent ? '' : 'bg-luna-white-50';
  const textColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-dark';
  const logoTextColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-purple';

  return (
    <div
      className={`${backgroundColor} fixed top-0 w-full z-50 flex justify-center items-center p-9 transition-colors duration-300 backdrop-blur-sm`}>
      <div className="max-w-[1200px] w-full flex flex-row justify-between items-center">
        <Link href="/" className="flex flex-row justify-center items-center gap-2.5">
          <Image
            src={shouldBeTransparent ? '/icons/logo_white.svg' : '/icons/logo.svg'}
            width={20}
            height={20}
            alt="logo"
            draggable={false}
          />
          <p className={`${logoTextColor} text-16 font-extrabold transition-colors duration-300`}>LUNA</p>
        </Link>
        <div className="flex flex-row justify-center items-center gap-10">
          <Link
            className={`${textColor} hover:opacity-50 ease-in-out text-15 ${pathname === '/' ? 'font-semibold' : 'opacity-60'} transition-colors duration-300`}
            href="/">
            홈
          </Link>
          <Link
            className={`${textColor} hover:opacity-50 ease-in-out text-15 ${pathname === '/members' ? 'font-semibold' : 'opacity-60'} transition-colors duration-300`}
            href="/members">
            멤버
          </Link>
          <Link
            className={`${textColor} hover:opacity-50 ease-in-out text-15 ${pathname === '/awards' ? 'font-semibold' : 'opacity-60'} transition-colors duration-300`}
            href="/awards">
            업적
          </Link>
          <Link
            className={`${textColor} hover:opacity-50 ease-in-out text-15 ${pathname === '/projects' ? 'font-semibold' : 'opacity-60'} transition-colors duration-300`}
            href="/projects">
            프로젝트
          </Link>
          <Link
            className={`${textColor} hover:opacity-50 ease-in-out text-15 ${pathname === '/qna' ? 'font-semibold' : 'opacity-60'} transition-colors duration-300`}
            href="/qna">
            Q&A
          </Link>
        </div>
      </div>
    </div>
  );
}
