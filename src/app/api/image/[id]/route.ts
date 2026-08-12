import { notionRequest } from '@/lib/notion';
import type { NotionFilesProperty, NotionPage } from '@/lib/notion-types';
import { fileUrl } from '@/lib/notion/mappers';
import { unstable_cache } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';

const NOTION_PAGE_ID_RE = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

interface NotionImagePage extends NotionPage {
  properties: {
    image?: NotionFilesProperty;
  };
}

async function loadNotionImageWebp(pageId: string): Promise<{ body: Buffer; contentType: string }> {
  const page = await notionRequest<NotionImagePage>(`/pages/${pageId}`);
  const url = fileUrl(page.properties.image);
  if (!url) {
    throw new Error('Image not found');
  }

  const imageResponse = await fetch(url, { cache: 'no-store' });
  if (!imageResponse.ok) {
    throw new Error(`Upstream image failed: ${imageResponse.status}`);
  }

  const input = Buffer.from(await imageResponse.arrayBuffer());
  const upstreamType = imageResponse.headers.get('content-type') ?? '';

  if (upstreamType.includes('svg') || url.includes('.svg')) {
    return { body: input, contentType: 'image/svg+xml' };
  }

  return {
    body: await sharp(input).webp({ quality: 80 }).toBuffer(),
    contentType: 'image/webp',
  };
}

const getCachedNotionImage = unstable_cache(
  async (pageId: string) => {
    const { body, contentType } = await loadNotionImageWebp(pageId);
    return { base64: body.toString('base64'), contentType };
  },
  ['notion-image-webp'],
  { revalidate: 60 * 60 * 24 },
);

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!NOTION_PAGE_ID_RE.test(id)) {
    return new NextResponse('Invalid id', { status: 400 });
  }

  try {
    const { base64, contentType } = await getCachedNotionImage(id);
    return new NextResponse(Buffer.from(base64, 'base64'), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new NextResponse('Image unavailable', { status: 404 });
  }
}
