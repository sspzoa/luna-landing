type ClassValue = string | false | null | undefined | 0 | 0n;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}
