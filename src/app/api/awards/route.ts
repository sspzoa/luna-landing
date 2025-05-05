// src/app/api/awards/route.ts
import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import { fetchNotionDatabase, transformAwards } from '../utils';

export async function GET() {
  try {
    const response = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.AWARDS, [
      { property: 'date', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ]);

    const transformedData = transformAwards(response);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching awards:', error);
    return NextResponse.json({ error: 'Failed to fetch awards data' }, { status: 500 });
  }
}
