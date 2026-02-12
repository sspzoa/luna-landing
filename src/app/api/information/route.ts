import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import { fetchNotionDatabase, transformInformation } from '../utils';

export async function GET() {
  try {
    const infoResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.INFORMATION);
    const baseInfo = transformInformation(infoResponse);

    return NextResponse.json(baseInfo);
  } catch (error) {
    console.error('Error fetching information:', error);
    return NextResponse.json({ error: 'Failed to fetch information data' }, { status: 500 });
  }
}
