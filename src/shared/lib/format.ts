import type { Award, Information, Project } from '@/shared/types';

/** Historical offsets for data predating the Notion database */
const LEGACY_OFFSETS = {
  CONTESTS: 40,
  PROJECTS: 23,
  PRIZE_MONEY: 75000000,
} as const;

export function enrichInformationWithStats(
  information: Information[],
  awards: Award[],
  projects: Project[],
): Information[] {
  const totalPrizeMoney = awards.reduce((sum, award) => {
    const value = Number(award.prizemoney);
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  return information.map((info) => ({
    ...info,
    contests: (awards.length + LEGACY_OFFSETS.CONTESTS).toString(),
    projects: (projects.length + LEGACY_OFFSETS.PROJECTS).toString(),
    prizemoney: `${(totalPrizeMoney + LEGACY_OFFSETS.PRIZE_MONEY).toString().slice(0, -6)}00`,
  }));
}

/**
 * Formats prize money in Korean units (억, 만원)
 * @param manwon - Amount in 만원 (10,000 KRW) units (string or number)
 * @returns Formatted string with 억 and 만원 units
 *
 * Examples:
 * - 500 → "500만원"
 * - 10000 → "1억원"
 * - 15000 → "1억 5000만원"
 * - 25500 → "2억 5500만원"
 */
export function formatPrizeMoney(manwon: string | number): string {
  const amount = typeof manwon === 'string' ? Number.parseInt(manwon, 10) : manwon;

  if (Number.isNaN(amount)) {
    return '0만원';
  }

  const eok = Math.floor(amount / 10000);
  const remainingManwon = amount % 10000;

  if (eok > 0 && remainingManwon > 0) {
    return `${eok}억 ${remainingManwon.toLocaleString()}만원`;
  }
  if (eok > 0) {
    return `${eok}억원`;
  }
  return `${amount.toLocaleString()}만원`;
}
