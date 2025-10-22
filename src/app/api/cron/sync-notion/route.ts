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
import {
  uploadImageToR2,
  fetchImageFromNotion,
  deleteAllLunaImages,
} from "@/lib/r2";

export async function GET() {
  const startTime = Date.now()
  try {
    const deletedCount = await deleteAllLunaImages()

    const syncResults = {
      members: { success: false, error: null as string | null, count: 0 },
      awards: { success: false, error: null as string | null, count: 0 },
      projects: { success: false, error: null as string | null, count: 0 },
      qna: { success: false, error: null as string | null, count: 0 },
      information: { success: false, error: null as string | null, count: 0 },
    };

    const syncTasks = await Promise.allSettled([
      (async () => {
        try {
          const membersResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.MEMBERS, [
            { property: 'lunaGeneration', direction: 'descending' },
            { property: 'generation', direction: 'descending' },
            { property: 'name', direction: 'ascending' },
          ]);
          const processedMembersResponse = { ...membersResponse, results: await processImages(membersResponse.results, 'members') };
          const membersData = transformMembers(processedMembersResponse);
          await setCachedData('members', membersData);
          syncResults.members = { success: true, error: null, count: membersData.length };
        } catch (error) {
          syncResults.members.error = error instanceof Error ? error.message : 'Unknown error';
        }
      })(),

      (async () => {
        try {
          const awardsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.AWARDS, [
            { property: 'date', direction: 'descending' },
            { property: 'name', direction: 'ascending' },
          ]);
          const processedAwardsResponse = { ...awardsResponse, results: await processImages(awardsResponse.results) };
          const awardsData = transformAwards(processedAwardsResponse);
          await setCachedData('awards', awardsData);
          syncResults.awards = { success: true, error: null, count: awardsData.length };
        } catch (error) {
          syncResults.awards.error = error instanceof Error ? error.message : 'Unknown error';
        }
      })(),

      (async () => {
        try {
          const projectsResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.PROJECTS, [
            { property: 'year', direction: 'descending' },
            { property: 'name', direction: 'ascending' },
          ]);
          const processedProjectsResponse = { ...projectsResponse, results: await processImages(projectsResponse.results) };
          const projectsData = transformProjects(processedProjectsResponse);
          await setCachedData('projects', projectsData);
          syncResults.projects = { success: true, error: null, count: projectsData.length };
        } catch (error) {
          syncResults.projects.error = error instanceof Error ? error.message : 'Unknown error';
        }
      })(),

      (async () => {
        try {
          const qnaResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.QNA, [
            { property: 'order', direction: 'ascending' },
          ]);
          const qnaData = transformQnA(qnaResponse);
          await setCachedData('qna', qnaData);
          syncResults.qna = { success: true, error: null, count: qnaData.length };
        } catch (error) {
          syncResults.qna.error = error instanceof Error ? error.message : 'Unknown error';
        }
      })(),

      (async () => {
        try {
          const informationResponse = await fetchNotionDatabase(NOTION_CONFIG.DATABASE_IDS.INFORMATION);
          const informationData = transformInformation(informationResponse);
          await setCachedData('information', informationData);
          syncResults.information = { success: true, error: null, count: informationData.length };
        } catch (error) {
          syncResults.information.error = error instanceof Error ? error.message : 'Unknown error';
        }
      })(),
    ])

    const totalSuccessful = Object.values(syncResults).filter((result) => result.success).length;
    const totalFailed = Object.values(syncResults).filter((result) => !result.success).length;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log(`Sync completed in ${duration}s`);

    return NextResponse.json({
      success: totalFailed === 0,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      summary: {
        total: 5,
        successful: totalSuccessful,
        failed: totalFailed,
      },
      results: syncResults,
    });
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Sync failed in ${duration}s`);
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        duration: `${duration}s`,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

function shouldProcessMemberImage(item: Record<string, unknown>): boolean {
  if (!item.properties || typeof item.properties !== "object") {
    return true;
  }

  const properties = item.properties as Record<string, unknown>;
  const generation = (properties.generation as any)?.select?.name || null;

  if (!generation) return true;

  const currentYear = new Date().getFullYear();
  const thresholdGeneration = currentYear - 2004;
  const match = generation.match(/^(\d+)기$/);

  if (match?.[1]) {
    const generationNumber = Number.parseInt(match[1], 10);
    return generationNumber > thresholdGeneration;
  }

  return true;
}

async function processImages(
  items: Record<string, unknown>[],
  dataType?: string
): Promise<Record<string, unknown>[]> {
  return await Promise.all(
    items.map(async (item: Record<string, unknown>) => {
      const updatedItem = { ...item }

      const shouldProcessImages = dataType !== 'members' || shouldProcessMemberImage(item);

      if (item.properties && typeof item.properties === "object" && shouldProcessImages) {
        const properties = item.properties as Record<string, unknown>

        for (const [key, property] of Object.entries(properties)) {
          if (property && typeof property === "object") {
            const prop = property as Record<string, unknown>

            if (prop.type === "files" && Array.isArray(prop.files)) {
              const updatedFiles = await Promise.all(
                prop.files.map(async (file: Record<string, unknown>) => {
                  if (
                    file.type === "file" &&
                    file.file &&
                    typeof file.file === "object"
                  ) {
                    const fileObj = file.file as Record<string, unknown>

                    if (
                      typeof fileObj.url === "string" &&
                      (fileObj.url.includes("prod-files-secure.s3") ||
                        fileObj.url.includes("notion.so")) &&
                      !fileObj.url.includes(process.env.R2_PUBLIC_URL || "")
                    ) {
                      try {
                        const {
                          buffer,
                          contentType: mimeType,
                        } = await fetchImageFromNotion(fileObj.url)
                        const r2Url = await uploadImageToR2(
                          buffer,
                          mimeType
                        )


                        return {
                          ...file,
                          file: {
                            ...fileObj,
                            url: encodeURI(r2Url),
                            expiry_time: undefined,
                          },
                        }
                      } catch (error) {
                        return file
                      }
                    }
                  }

                  return file
                })
              )

              ;(updatedItem.properties as Record<string, unknown>)[key] = {
                ...prop,
                files: updatedFiles,
              }
            }
          }
        }
      }

      if (item.cover && typeof item.cover === "object" && shouldProcessImages) {
        const cover = item.cover as Record<string, unknown>

        if (
          cover.type === "file" &&
          cover.file &&
          typeof cover.file === "object"
        ) {
          const fileObj = cover.file as Record<string, unknown>

          if (
            typeof fileObj.url === "string" &&
            (fileObj.url.includes("prod-files-secure.s3") ||
              fileObj.url.includes("notion.so")) &&
            !fileObj.url.includes(process.env.R2_PUBLIC_URL || "")
          ) {
            try {
              const {
                buffer,
                contentType: mimeType,
              } = await fetchImageFromNotion(fileObj.url)
              const r2Url = await uploadImageToR2(buffer, mimeType)


              updatedItem.cover = {
                ...cover,
                file: {
                  ...fileObj,
                  url: encodeURI(r2Url),
                  expiry_time: undefined,
                },
              }
            } catch (error) {
            }
          }
        }
      }

      if (item.icon && typeof item.icon === "object" && shouldProcessImages) {
        const icon = item.icon as Record<string, unknown>

        if (
          icon.type === "file" &&
          icon.file &&
          typeof icon.file === "object"
        ) {
          const fileObj = icon.file as Record<string, unknown>

          if (
            typeof fileObj.url === "string" &&
            (fileObj.url.includes("prod-files-secure.s3") ||
              fileObj.url.includes("notion.so")) &&
            !fileObj.url.includes(process.env.R2_PUBLIC_URL || "")
          ) {
            try {
              const {
                buffer,
                contentType: mimeType,
              } = await fetchImageFromNotion(fileObj.url)
              const r2Url = await uploadImageToR2(buffer, mimeType)


              updatedItem.icon = {
                ...icon,
                file: {
                  ...fileObj,
                  url: encodeURI(r2Url),
                  expiry_time: undefined,
                },
              }
            } catch (error) {
            }
          }
        }
      }

      return updatedItem
    })
  )
}
