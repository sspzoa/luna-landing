'use client';

import { useScaling } from '@/components/layout/ScalingLayout';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
  scroller?: ReactNode;
}

export default function HeroSection({ children, className, scroller }: HeroSectionProps) {
  const { scaledVh } = useScaling();

  return (
    <section
      style={{ height: scaledVh(100) }}
      className={cn('relative flex w-full items-center justify-center p-9', className)}>
      {children}
      {scroller}
    </section>
  );
}
