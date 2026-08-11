import { cn } from '@/lib/cn';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export default function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn('col-span-full flex items-center justify-center p-10', className)}>
      <p className="text-18 font-medium opacity-70">{message}</p>
    </div>
  );
}
