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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 50%, rgba(144, 127, 223, 0.18) 0%, rgba(144, 127, 223, 0.06) 36%, rgba(250, 250, 255, 0) 64%)',
        }}
      />
      {children}
      {scroller}
    </section>
  );
}
