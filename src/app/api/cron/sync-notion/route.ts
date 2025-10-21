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
  uploadImageToS3,
  fetchImageFromNotion,
  deleteAllLunaImages,
} from "@/lib/s3";

export async function GET() {
  try {
    // 기존 S3 파일들 삭제
    console.log("Deleting existing S3 luna images...")
    const deletedCount = await deleteAllLunaImages()
    console.log(`Deleted ${deletedCount} existing images from S3`)

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
      const processedMembersResponse = { ...membersResponse, results: await processImages(membersResponse.results) };
      const membersData = transformMembers(processedMembersResponse);
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
      const processedAwardsResponse = { ...awardsResponse, results: await processImages(awardsResponse.results) };
      const awardsData = transformAwards(processedAwardsResponse);
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
      const processedProjectsResponse = { ...projectsResponse, results: await processImages(projectsResponse.results) };
      const projectsData = transformProjects(processedProjectsResponse);
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

async function processImages(
  items: Record<string, unknown>[]
): Promise<Record<string, unknown>[]> {
  return await Promise.all(
    items.map(async (item: Record<string, unknown>) => {
      const updatedItem = { ...item }

      // properties 처리
      if (item.properties && typeof item.properties === "object") {
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
                      !fileObj.url.includes(`${process.env.S3_BUCKET_NAME}.s3`)
                    ) {
                      try {
                        const {
                          buffer,
                          filename,
                          contentType: mimeType,
                        } = await fetchImageFromNotion(fileObj.url)
                        const s3Url = await uploadImageToS3(
                          buffer,
                          filename,
                          mimeType
                        )

                        console.log(
                          `Image migrated: ${fileObj.url} -> ${s3Url}`
                        )

                        return {
                          ...file,
                          file: {
                            ...fileObj,
                            url: encodeURI(s3Url),
                            expiry_time: undefined,
                          },
                        }
                      } catch (error) {
                        console.error(
                          `Failed to migrate image ${fileObj.url}:`,
                          error
                        )
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

      // cover 이미지 처리 (프로젝트의 커버 이미지)
      if (item.cover && typeof item.cover === "object") {
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
            !fileObj.url.includes(`${process.env.S3_BUCKET_NAME}.s3`)
          ) {
            try {
              const {
                buffer,
                filename,
                contentType: mimeType,
              } = await fetchImageFromNotion(fileObj.url)
              const s3Url = await uploadImageToS3(buffer, filename, mimeType)

              console.log(`Cover image migrated: ${fileObj.url} -> ${s3Url}`)

              updatedItem.cover = {
                ...cover,
                file: {
                  ...fileObj,
                  url: encodeURI(s3Url),
                  expiry_time: undefined,
                },
              }
            } catch (error) {
              console.error(
                `Failed to migrate cover image ${fileObj.url}:`,
                error
              )
            }
          }
        }
      }

      // icon 이미지 처리 (페이지 아이콘)
      if (item.icon && typeof item.icon === "object") {
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
            !fileObj.url.includes(`${process.env.S3_BUCKET_NAME}.s3`)
          ) {
            try {
              const {
                buffer,
                filename,
                contentType: mimeType,
              } = await fetchImageFromNotion(fileObj.url)
              const s3Url = await uploadImageToS3(buffer, filename, mimeType)

              console.log(`Icon image migrated: ${fileObj.url} -> ${s3Url}`)

              updatedItem.icon = {
                ...icon,
                file: {
                  ...fileObj,
                  url: encodeURI(s3Url),
                  expiry_time: undefined,
                },
              }
            } catch (error) {
              console.error(
                `Failed to migrate icon image ${fileObj.url}:`,
                error
              )
            }
          }
        }
      }

      return updatedItem
    })
  )
}
