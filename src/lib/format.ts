/**
 * Formats prize money in Korean units (억, 만원)
 * @param manwon - Amount in 만원 (10,000 KRW) units
 * @returns Formatted string with 억 and 만원 units
 *
 * Examples:
 * - 500 → "500만원"
 * - 10000 → "1억원"
 * - 15000 → "1억 5000만원"
 * - 25500 → "2억 5500만원"
 */
export function formatPrizeMoney(manwon: number): string {
  const eok = Math.floor(manwon / 10000);
  const remainingManwon = manwon % 10000;

  if (eok > 0 && remainingManwon > 0) {
    return `${eok}억 ${remainingManwon.toLocaleString()}만원`;
  }
  if (eok > 0) {
    return `${eok}억원`;
  }
  return `${manwon.toLocaleString()}만원`;
}
