'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

const TRANSPARENT_PAGES = ['/members', '/projects'];

export default function Navbar() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsAtTop(scrollPosition === 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isTransparentPage = TRANSPARENT_PAGES.includes(pathname);
  const shouldBeTransparent = isAtTop && isTransparentPage;

  const backgroundColor = shouldBeTransparent ? '' : 'bg-luna-white-50';
  const textColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-dark';
  const logoTextColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-purple';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`${backgroundColor} w-full flex justify-center items-center p-5 md:p-9 transition-colors duration-300 backdrop-blur-sm`}>
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

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="메뉴 열기"
            className={`${textColor} p-2 transition-colors duration-300 md:hidden block`}>
            <Menu size={24} />
          </button>

          <div
            className={`absolute right-0 top-[56px] w-48 bg-luna-white shadow-sm rounded-md overflow-hidden md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="flex flex-col">
              <Link
                className={`px-4 py-3 ${
                  pathname === '/' ? 'font-bold' : 'font-normal'
                } hover:opacity-50 transition-all duration-300 text-luna-dark`}
                href="/"
                onClick={() => setIsMenuOpen(false)}>
                홈
              </Link>
              <Link
                className={`px-4 py-3 ${
                  pathname === '/members' ? 'font-bold' : 'font-normal'
                } hover:opacity-50 transition-all duration-300 text-luna-dark`}
                href="/members"
                onClick={() => setIsMenuOpen(false)}>
                멤버
              </Link>
              <Link
                className={`px-4 py-3 ${
                  pathname === '/awards' ? 'font-bold' : 'font-normal'
                } hover:opacity-50 transition-all duration-300 text-luna-dark`}
                href="/awards"
                onClick={() => setIsMenuOpen(false)}>
                업적
              </Link>
              <Link
                className={`px-4 py-3 ${
                  pathname === '/projects' ? 'font-bold' : 'font-normal'
                } hover:opacity-50 transition-all duration-300 text-luna-dark`}
                href="/projects"
                onClick={() => setIsMenuOpen(false)}>
                프로젝트
              </Link>
              <Link
                className={`px-4 py-3 ${
                  pathname === '/qna' ? 'font-bold' : 'font-normal'
                } hover:opacity-50 transition-all duration-300 text-luna-dark`}
                href="/qna"
                onClick={() => setIsMenuOpen(false)}>
                Q&A
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-row justify-center items-center gap-10">
            <Link
              className={`${textColor} text-15 ${
                pathname === '/' ? 'hover:opacity-50 font-bold' : 'hover:opacity-30 opacity-60 font-normal'
              } transition-all duration-300`}
              href="/">
              홈
            </Link>
            <Link
              className={`${textColor} text-15 ${
                pathname === '/members' ? 'hover:opacity-50 font-bold' : 'hover:opacity-30 opacity-60 font-normal'
              } transition-all duration-300`}
              href="/members">
              멤버
            </Link>
            <Link
              className={`${textColor} text-15 ${
                pathname === '/awards' ? 'hover:opacity-50 font-bold' : 'hover:opacity-30 opacity-60 font-normal'
              } transition-all duration-300`}
              href="/awards">
              업적
            </Link>
            <Link
              className={`${textColor} text-15 ${
                pathname === '/projects' ? 'hover:opacity-50 font-bold' : 'hover:opacity-30 opacity-60 font-normal'
              } transition-all duration-300`}
              href="/projects">
              프로젝트
            </Link>
            <Link
              className={`${textColor} text-15 ${
                pathname === '/qna' ? 'hover:opacity-50 font-bold' : 'hover:opacity-30 opacity-60 font-normal'
              } transition-all duration-300`}
              href="/qna">
              Q&A
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
