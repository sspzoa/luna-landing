import type { Award } from '@/lib/types';

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
