import type { Award, Information, Member, NotionResponse, NotionSortOption, Project, QnA } from '@/shared/types';
import { NOTION_CONFIG } from './config';

export class NotionApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly databaseId?: string,
  ) {
    super(message);
    this.name = 'NotionApiError';
  }
}

export async function fetchNotionDatabase(databaseId: string, sorts: NotionSortOption[] = []): Promise<NotionResponse> {
  try {
    const url = `${NOTION_CONFIG.API_URL}/databases/${databaseId}/query`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Notion-Version': NOTION_CONFIG.API_VERSION,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      },
      body: JSON.stringify({ sorts }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new NotionApiError(res.status, `Notion API error: ${res.status} ${res.statusText}`, databaseId);
    }

    return (await res.json()) as NotionResponse;
  } catch (error) {
    console.error(`Error fetching database ${databaseId}:`, error);
    throw error;
  }
}

export function transformMembers(data: NotionResponse): Member[] {
  const currentYear = new Date().getFullYear();
  const thresholdGeneration = currentYear - 2004;

  return data.results.map((item: any) => {
    const generation = item.properties.generation?.select?.name || null;
    let returnImage = false;

    if (generation) {
      const match = generation.match(/^(\d+)기$/);
      if (match?.[1]) {
        const generationNumber = Number.parseInt(match[1], 10);
        returnImage = generationNumber > thresholdGeneration;
      }
    }

    return {
      id: item.id,
      position: item.properties.position?.select?.name || null,
      image: returnImage ? item.properties.image?.files[0]?.file?.url || null : null,
      name: item.properties.name?.title[0]?.plain_text || null,
      generation: generation,
      class: item.properties.class?.select?.name || null,
      description: item.properties.description?.rich_text[0]?.plain_text || null,
      lunaGeneration: item.properties.lunaGeneration?.select?.name || null,
    };
  });
}

export function transformAwards(data: NotionResponse): Award[] {
  return data.results.map((item: any) => ({
    id: item.id,
    year: item.properties.year?.select?.name || null,
    image: item.properties.image?.files[0]?.file?.url || null,
    name: item.properties.name?.title[0]?.plain_text || null,
    prize: item.properties.prize?.rich_text[0]?.plain_text || null,
    team: item.properties.team?.rich_text[0]?.plain_text || null,
    members: item.properties.members?.multi_select.map((member: { name: string }) => member.name) || [],
    date: item.properties.date?.date || null,
    prizemoney: item.properties.prizemoney?.number || null,
  }));
}

export function transformProjects(data: NotionResponse): Project[] {
  return data.results.map((item: any) => ({
    id: item.id,
    public_url: item.public_url || null,
    year: item.properties.year?.select?.name || null,
    image: item.properties.image?.files[0]?.file?.url || null,
    name: item.properties.name?.title[0]?.plain_text || null,
    description: item.properties.description?.rich_text[0]?.plain_text || null,
    awards:
      item.properties.awards?.multi_select.map((award: { id: string; name: string }) => ({
        id: award.id,
        name: award.name,
      })) || [],
  }));
}

export function transformQnA(data: NotionResponse): QnA[] {
  return data.results.map((item: any) => ({
    id: item.id,
    question: item.properties.question?.title[0]?.plain_text || null,
    order: item.properties.order?.number || null,
    answer: item.properties.answer?.rich_text[0]?.plain_text || null,
  }));
}

export function transformInformation(data: NotionResponse): Information[] {
  return data.results.map((item: any) => ({
    id: item.id,
    moto: item.properties.moto?.title[0]?.plain_text || null,
  }));
}

export function calculateTotalPrizeMoney(awards: Award[]): number {
  let total = 0;
  for (const award of awards) {
    if (award.prizemoney) {
      const prizeValue = Number(award.prizemoney);
      if (!Number.isNaN(prizeValue)) {
        total += prizeValue;
      }
    }
  }
  return total;
}
