import { cn } from '@/lib/cn';

interface ErrorStateProps {
  message?: string;
  detail?: string;
  className?: string;
}

export default function ErrorState({
  message = '데이터를 불러오지 못했습니다.',
  detail = '잠시 후 다시 시도해 주세요.',
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex min-h-dvh w-full flex-col items-center justify-center gap-2 px-5', className)}>
      <p className="text-center text-20 font-bold text-luna-dark sm:text-24">{message}</p>
      {detail ? <p className="text-center text-14 text-luna-dark opacity-50">{detail}</p> : null}
    </div>
  );
}
