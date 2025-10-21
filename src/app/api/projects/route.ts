import { getCachedData } from '@/lib/cache';
import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import { fetchNotionDatabase, transformProjects } from '../utils';

export async function GET() {
  try {
    const cachedData = await getCachedData('projects');
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    const response = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.PROJECTS, [
      { property: 'year', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ]);

    const transformedData = transformProjects(response);

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects data' }, { status: 500 });
  }
}
