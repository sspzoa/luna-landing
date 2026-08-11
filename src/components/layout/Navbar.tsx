'use client';

import { NAV_ITEMS, TRANSPARENT_NAV_PATHS } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY === 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeTransparent =
    isAtTop && TRANSPARENT_NAV_PATHS.includes(pathname as (typeof TRANSPARENT_NAV_PATHS)[number]);
  const textColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-dark';
  const logoTextColor = shouldBeTransparent ? 'text-luna-white' : 'text-luna-purple';

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div
        className={cn(
          'flex w-full items-center justify-center p-5 backdrop-blur-sm transition-colors duration-300 md:p-9',
          !shouldBeTransparent && 'bg-luna-white-50',
        )}>
        <div className="relative flex w-full max-w-[1200px] flex-row items-center justify-between gap-5">
          <Link href="/" className="flex flex-row items-center justify-center gap-2.5">
            <Image
              src={shouldBeTransparent ? '/icons/logo_white.svg' : '/icons/logo.svg'}
              width={20}
              height={20}
              alt="logo"
              draggable={false}
            />
            <p className={cn(logoTextColor, 'text-16 font-extrabold transition-colors duration-300')}>LUNA</p>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
            className={cn(textColor, 'block p-2 transition-colors duration-300 md:hidden')}>
            <Menu size={24} />
          </button>

          <nav
            className={cn(
              'absolute top-full right-0 mt-1 w-48 overflow-hidden rounded-md bg-luna-white shadow-sm md:hidden',
              isMenuOpen ? 'block' : 'hidden',
            )}>
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-luna-dark transition-all duration-300 hover:opacity-50',
                    pathname === item.href ? 'font-bold' : 'font-normal',
                  )}>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="hidden flex-row items-center justify-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    textColor,
                    'text-15 transition-all duration-300',
                    active ? 'font-bold hover:opacity-50' : 'font-normal opacity-60 hover:opacity-30',
                  )}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
