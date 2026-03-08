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
