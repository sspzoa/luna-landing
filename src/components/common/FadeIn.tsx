import { cn } from '@/lib/cn';
import type { CSSProperties, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'section' | 'article' | 'li';
}

export default function FadeIn({ children, className, delayMs = 0, as: Tag = 'div' }: FadeInProps) {
  const style: CSSProperties | undefined = delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined;

  return (
    <Tag className={cn('animate-fade-up', className)} style={style}>
      {children}
    </Tag>
  );
}
