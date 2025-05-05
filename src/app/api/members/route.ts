// src/app/api/members/route.ts
import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import { fetchNotionDatabase, transformMembers } from '../utils';

export async function GET() {
  try {
    const response = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.MEMBERS, [
      { property: 'lunaGeneration', direction: 'descending' },
      { property: 'generation', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ]);

    const transformedData = transformMembers(response);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members data' }, { status: 500 });
  }
}
