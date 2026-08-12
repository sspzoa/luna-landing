export function notionImageSrc(pageId: string, image: string | null | undefined, fallback: string): string {
  if (!image) return fallback;
  return `/api/image/${pageId}`;
}
