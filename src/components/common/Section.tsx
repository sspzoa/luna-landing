import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('flex w-full flex-col items-center justify-center px-5 py-16 sm:px-9 sm:py-25', className)}>
      {children}
    </section>
  );
}
