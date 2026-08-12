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
