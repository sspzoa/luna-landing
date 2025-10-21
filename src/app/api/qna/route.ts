import { getCachedData } from '@/lib/cache';
import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import { fetchNotionDatabase, transformQnA } from '../utils';

export async function GET() {
  try {
    const cachedData = await getCachedData('qna');
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    const response = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.QNA, [
      { property: 'order', direction: 'ascending' },
    ]);

    const transformedData = transformQnA(response);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching QnA:', error);
    return NextResponse.json({ error: 'Failed to fetch QnA data' }, { status: 500 });
  }
}
