import type { Award } from '@/lib/types';

export { cn } from '@/lib/cn';
export { defaultYear, formatKoreanDate, uniqueSortedYears } from '@/lib/collection';
export { formatPrizeMoney } from '@/lib/format';

export function calculateTotalPrizeMoney(awards: Award[]): number {
  let total = 0;
  for (const award of awards) {
    if (award.prizemoney) {
      const prizeValue = Number(award.prizemoney);
      if (!Number.isNaN(prizeValue)) {
        total += prizeValue;
      }
    }
  }
  return total;
}
