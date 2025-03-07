'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const TRANSPARENT_PAGES = ['/members', '/projects'];

export default function Navbar() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const [scale, setScale] = useState(1);

  const calculateScale = useCallback((width: number): number => {
    const minWidth = 600;
    const scaleStep = 0.01;

    if (width < minWidth) {
      const newScale = Math.max(width / minWidth, 0.1);
      return Math.round(newScale / scaleStep) * scaleStep;
    }

    return 1;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition === 0);
    };

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setScale(calculateScale(width));
      }
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateScale]);

  const isTransparentPage = TRANSPARENT_PAGES.includes(pathname);
  const shouldBeTransparent = isAtTop && isTransparentPage;

  const backgroundColor = shouldBeTransparent ? '' : 'bg-luna-white-50';
  const textColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-dark';
  const logoTextColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-purple';

  return (
    <div className="fixed top-0 left-0 w-full z-50" style={{ height: `${56 * scale}px` }}>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'left top',
          width: `${(1 / scale) * 100}%`,
        }}
        className={`${backgroundColor} w-full flex justify-center items-center p-9 transition-colors duration-300 backdrop-blur-sm`}>
        <div className="max-w-[1200px] w-full flex flex-row gap-5 justify-between items-center">
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
              className={`${textColor} text-15 ${pathname === '/' ? 'hover:opacity-50 font-semibold' : 'hover:opacity-30 opacity-60'} transition-all duration-300`}
              href="/">
              홈
            </Link>
            <Link
              className={`${textColor} text-15 ${pathname === '/members' ? 'hover:opacity-50 font-semibold' : 'hover:opacity-30 opacity-60'} transition-all duration-300`}
              href="/members">
              멤버
            </Link>
            <Link
              className={`${textColor} text-15 ${pathname === '/awards' ? 'hover:opacity-50 font-semibold' : 'hover:opacity-30 opacity-60'} transition-all duration-300`}
              href="/awards">
              업적
            </Link>
            <Link
              className={`${textColor} text-15 ${pathname === '/projects' ? 'hover:opacity-50 font-semibold' : 'hover:opacity-30 opacity-60'} transition-all duration-300`}
              href="/projects">
              프로젝트
            </Link>
            <Link
              className={`${textColor} text-15 ${pathname === '/qna' ? 'hover:opacity-50 font-semibold' : 'hover:opacity-30 opacity-60'} transition-all duration-300`}
              href="/qna">
              Q&A
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
