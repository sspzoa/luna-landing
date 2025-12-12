import { setCachedData } from '@/lib/cache';
import { NextResponse } from 'next/server';
import { NOTION_CONFIG } from '../../config';
import {
  fetchNotionDatabase,
  transformAwards,
  transformInformation,
  transformMembers,
  transformProjects,
  transformQnA,
} from '../../utils';

export async function GET() {
  try {
    const syncResults = {
      members: { success: false, error: null as string | null, count: 0 },
      awards: { success: false, error: null as string | null, count: 0 },
      projects: { success: false, error: null as string | null, count: 0 },
      qna: { success: false, error: null as string | null, count: 0 },
      information: { success: false, error: null as string | null, count: 0 },
    };

    try {
      const membersResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.MEMBERS, [
        { property: 'lunaGeneration', direction: 'descending' },
        { property: 'generation', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ]);
      const membersData = transformMembers(membersResponse);
      await setCachedData('members', membersData);
      syncResults.members = { success: true, error: null, count: membersData.length };
    } catch (error) {
      syncResults.members.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error syncing members:', error);
    }

    // Sync Awards
    try {
      const awardsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.AWARDS, [
        { property: 'date', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ]);
      const awardsData = transformAwards(awardsResponse);
      await setCachedData('awards', awardsData);
      syncResults.awards = { success: true, error: null, count: awardsData.length };
    } catch (error) {
      syncResults.awards.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error syncing awards:', error);
    }

    // Sync Projects
    try {
      const projectsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.PROJECTS, [
        { property: 'year', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ]);
      const projectsData = transformProjects(projectsResponse);
      await setCachedData('projects', projectsData);
      syncResults.projects = { success: true, error: null, count: projectsData.length };
    } catch (error) {
      syncResults.projects.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error syncing projects:', error);
    }

    // Sync QnA
    try {
      const qnaResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.QNA, [
        { property: 'order', direction: 'ascending' },
      ]);
      const qnaData = transformQnA(qnaResponse);
      await setCachedData('qna', qnaData);
      syncResults.qna = { success: true, error: null, count: qnaData.length };
    } catch (error) {
      syncResults.qna.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error syncing qna:', error);
    }

    // Sync Information
    try {
      const informationResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.INFORMATION);
      const informationData = transformInformation(informationResponse);
      await setCachedData('information', informationData);
      syncResults.information = { success: true, error: null, count: informationData.length };
    } catch (error) {
      syncResults.information.error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error syncing information:', error);
    }

    const totalSuccessful = Object.values(syncResults).filter((result) => result.success).length;
    const totalFailed = Object.values(syncResults).filter((result) => !result.success).length;

    return NextResponse.json({
      success: totalFailed === 0,
      timestamp: new Date().toISOString(),
      summary: {
        total: 5,
        successful: totalSuccessful,
        failed: totalFailed,
      },
      results: syncResults,
    });
  } catch (error) {
    console.error('Error in sync-notion cron:', error);
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
