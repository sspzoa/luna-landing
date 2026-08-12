import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  scroller?: ReactNode;
}

export default function HeroSection({ children, className, scroller }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative flex h-dvh w-full items-center justify-center overflow-hidden px-5 py-8 sm:px-9 sm:py-9',
        className,
      )}>
      {children}
      {scroller}
    </section>
  );
}
