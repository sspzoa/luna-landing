import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../config';
import {
  calculateTotalPrizeMoney,
  fetchNotionDatabase,
  transformAwards,
  transformInformation,
  transformProjects,
} from '../utils';

export async function GET() {
  try {
    const infoResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.INFORMATION);
    const baseInfo = transformInformation(infoResponse);

    const awardsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.AWARDS);
    const awards = transformAwards(awardsResponse);

    const projectsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.PROJECTS);
    const projects = transformProjects(projectsResponse);

    const totalPrizeMoney = calculateTotalPrizeMoney(awards);

    const updatedInfo = baseInfo.map((info) => ({
      ...info,
      contests: (awards.length + 40).toString(),
      projects: (projects.length + 23).toString(),
      prizemoney: `${(totalPrizeMoney + 75000000).toString().slice(0, -6)}00`,
    }));

    return NextResponse.json(updatedInfo);
  } catch (error) {
    console.error('Error fetching information:', error);
    return NextResponse.json({ error: 'Failed to fetch information data' }, { status: 500 });
  }
}
