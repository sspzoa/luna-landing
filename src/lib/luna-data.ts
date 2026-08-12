import { notionRequest } from '@/lib/notion';
import type { NotionAwardPage, NotionFaqPage, NotionMemberPage, NotionProjectPage } from '@/lib/notion-types';
import {
  dateRange,
  fileUrl,
  multiSelectNames,
  multiSelectOptions,
  numberAsString,
  richText,
  selectName,
  titleText,
} from '@/lib/notion/mappers';
import { awardSchema, faqSchema, informationSchema, memberSchema, projectSchema } from '@/lib/schemas';
import type { Award, Faq, Information, Member, Project } from '@/lib/types';
import { calculateTotalPrizeMoney } from '@/lib/utils';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';

const DATABASE_IDS = {
  AWARDS: '5c6c5d4aa4e24a1ba18aee280fcfc39a',
  FAQ: '5153a7c657844eebaa62b737c726447d',
  MEMBERS: '3d3cae4b3b50481497a6c52f61413921',
  PROJECTS: 'f73e99abb9ea4817b2d6c6333d152242',
} as const;

const REVALIDATE_SECONDS = 60 * 5;

async function queryDatabase<T>(databaseId: string, body?: Record<string, unknown>) {
  return notionRequest<{ results: T[] }>(`/databases/${databaseId}/query`, {
    method: 'POST',
    body,
  });
}

async function loadAwards(): Promise<Award[]> {
  const response = await queryDatabase<NotionAwardPage>(DATABASE_IDS.AWARDS, {
    sorts: [
      { property: 'date', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ],
  });

  const awards = response.results.map((result) => ({
    id: result.id,
    year: selectName(result.properties.year),
    image: fileUrl(result.properties.image),
    name: titleText(result.properties.name),
    prize: richText(result.properties.prize),
    team: richText(result.properties.team),
    members: multiSelectNames(result.properties.members),
    date: dateRange(result.properties.date),
    prizemoney: numberAsString(result.properties.prizemoney),
  }));

  return awardSchema.array().parse(awards);
}

async function loadFaq(): Promise<Faq[]> {
  const response = await queryDatabase<NotionFaqPage>(DATABASE_IDS.FAQ, {
    sorts: [{ property: 'order', direction: 'ascending' }],
  });

  const faqs = response.results.map((result) => ({
    id: result.id,
    question: titleText(result.properties.question),
    order: result.properties.order?.number ?? null,
    answer: richText(result.properties.answer),
  }));

  return faqSchema.array().parse(faqs);
}

async function loadMembers(): Promise<Member[]> {
  const currentYear = new Date().getFullYear();
  const thresholdGeneration = currentYear - 2004;

  const response = await queryDatabase<NotionMemberPage>(DATABASE_IDS.MEMBERS, {
    sorts: [
      { property: 'lunaGeneration', direction: 'descending' },
      { property: 'generation', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ],
  });

  const members = response.results.map((result) => {
    const generation = selectName(result.properties.generation);
    const lunaGeneration = selectName(result.properties.lunaGeneration);
    let showImage = false;

    if (lunaGeneration !== '명예 멤버' && generation) {
      const match = generation.match(/^(\d+)기$/);
      if (match?.[1]) {
        const generationNumber = Number.parseInt(match[1], 10);
        showImage = generationNumber > thresholdGeneration;
      }
    }

    return {
      id: result.id,
      position: selectName(result.properties.position),
      image: showImage ? fileUrl(result.properties.image) : null,
      name: titleText(result.properties.name),
      generation,
      class: selectName(result.properties.class),
      description: richText(result.properties.description),
      lunaGeneration,
    };
  });

  return memberSchema.array().parse(members);
}

async function loadProjects(): Promise<Project[]> {
  const response = await queryDatabase<NotionProjectPage>(DATABASE_IDS.PROJECTS, {
    sorts: [
      { property: 'year', direction: 'descending' },
      { property: 'name', direction: 'ascending' },
    ],
  });

  const projects = response.results.map((result) => ({
    id: result.id,
    public_url: result.public_url ?? null,
    year: selectName(result.properties.year),
    image: fileUrl(result.properties.image),
    name: titleText(result.properties.name),
    description: richText(result.properties.description),
    awards: multiSelectOptions(result.properties.awards),
  }));

  return projectSchema.array().parse(projects);
}

const getAwardsCached = unstable_cache(loadAwards, ['luna-awards'], {
  revalidate: REVALIDATE_SECONDS,
  tags: ['awards'],
});

const getFaqCached = unstable_cache(loadFaq, ['luna-faq'], {
  revalidate: REVALIDATE_SECONDS,
  tags: ['faq'],
});

const getMembersCached = unstable_cache(loadMembers, ['luna-members'], {
  revalidate: REVALIDATE_SECONDS,
  tags: ['members'],
});

const getProjectsCached = unstable_cache(loadProjects, ['luna-projects'], {
  revalidate: REVALIDATE_SECONDS,
  tags: ['projects'],
});

export const fetchAwards = cache(() => getAwardsCached());
export const fetchFaq = cache(() => getFaqCached());
export const fetchMembers = cache(() => getMembersCached());
export const fetchProjects = cache(() => getProjectsCached());

export const fetchInformation = cache(async (): Promise<Information> => {
  const [awards, projects] = await Promise.all([fetchAwards(), fetchProjects()]);
  const totalPrizeMoney = calculateTotalPrizeMoney(awards);

  return informationSchema.parse({
    contests: (awards.length + 40).toString(),
    projects: (projects.length + 23).toString(),
    prizemoney: `${(totalPrizeMoney + 75000000).toString().slice(0, -6)}00`,
  });
});

export async function getHomeData() {
  const [information, projects] = await Promise.all([fetchInformation(), fetchProjects()]);
  return { information, projects };
}

export async function getAwardsPageData() {
  const [information, awards] = await Promise.all([fetchInformation(), fetchAwards()]);
  return { information, awards };
}
