export function uniqueSortedYears(values: Array<string | null | undefined>): string[] {
  const years = Array.from(new Set(values.filter(Boolean) as string[]));
  return years.sort((a, b) => Number.parseInt(b, 10) - Number.parseInt(a, 10));
}

export function defaultYear(years: string[]): string {
  if (years.length === 0) return '';
  const thisYear = String(new Date().getFullYear());
  return years.includes(thisYear) ? thisYear : years[0];
}

export function formatKoreanDate(dateString?: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
