import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og';

export const runtime = 'nodejs';
export const alt = '세상을 비추는 달, LUNA';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return createOgImage({
    title: 'LUNA',
    eyebrow: '세상을 비추는 달,',
    showModel: true,
  });
}
