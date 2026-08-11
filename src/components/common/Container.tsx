import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[1200px]', className)}>{children}</div>;
}
