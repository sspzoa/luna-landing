export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png|webp|avif)$/i) !== null || isExternalUrl(url);
}

export function getImageUrl(url: string | undefined, fallbackUrl = '/images/placeholder.png'): string {
  if (!url || !isValidImageUrl(url)) {
    return fallbackUrl;
  }
  return url;
}

export function shouldPrioritizeImage(index: number): boolean {
  return index < 3;
}

export function calculateImageSize(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 1200,
): { width: number; height: number } {
  if (originalWidth <= maxWidth) {
    return { width: originalWidth, height: originalHeight };
  }

  const ratio = originalHeight / originalWidth;
  const height = Math.round(maxWidth * ratio);

  return { width: maxWidth, height };
}
