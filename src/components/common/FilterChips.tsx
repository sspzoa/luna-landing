'use client';

import { cn } from '@/lib/cn';

interface FilterChipsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  formatLabel?: (option: string) => string;
  align?: 'start' | 'center';
  className?: string;
}

export default function FilterChips({
  options,
  value,
  onChange,
  formatLabel = (option) => option,
  align = 'start',
  className,
}: FilterChipsProps) {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center gap-4',
        align === 'center' ? 'justify-center' : 'justify-start',
        className,
      )}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-3 transition-all duration-300',
              active ? 'border-luna-purple bg-luna-purple' : 'border-luna-dark-10 hover:border-luna-purple/40',
            )}>
            <span className={cn('text-14 font-medium', active ? 'text-luna-white' : 'opacity-50')}>
              {formatLabel(option)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
