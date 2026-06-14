import { notionRequest } from '@/lib/notion';
import type {
  NotionAwardPage,
  NotionInformationPage,
  NotionMemberPage,
  NotionProjectPage,
  NotionQnAPage,
} from '@/lib/notion-types';
import { awardSchema, informationSchema, memberSchema, projectSchema, qnaSchema } from '@/lib/schemas';
import type { Award, Information, Member, Project, QnA } from '@/lib/types';
import { calculateTotalPrizeMoney } from '@/lib/utils';

const DATABASE_IDS = {
  AWARDS: '5c6c5d4aa4e24a1ba18aee280fcfc39a',
  QNA: '5153a7c657844eebaa62b737c726447d',
  MEMBERS: '3d3cae4b3b50481497a6c52f61413921',
  INFORMATION: '564bbb8126ca46a69e44288548d99fa2',
  PROJECTS: 'f73e99abb9ea4817b2d6c6333d152242',
};

export interface LunaData {
  awards: Award[];
  qna: QnA[];
  members: Member[];
  projects: Project[];
  information: Information[];
}

export async function fetchAwards(): Promise<Award[]> {
  const response = await notionRequest<{ results: NotionAwardPage[] }>(`/databases/${DATABASE_IDS.AWARDS}/query`, {
    method: 'POST',
    body: {
      sorts: [
        { property: 'date', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ],
    },
  });

  const awards = response.results.map((result) => ({
    id: result.id,
    year: result.properties.year?.select?.name ?? null,
    image: result.properties.image?.files?.[0]?.file?.url ?? result.properties.image?.files?.[0]?.external?.url ?? null,
    name: result.properties.name?.title?.[0]?.plain_text ?? null,
    prize: result.properties.prize?.rich_text?.[0]?.plain_text ?? null,
    team: result.properties.team?.rich_text?.[0]?.plain_text ?? null,
    members: result.properties.members?.multi_select?.map((member) => member.name) ?? [],
    date: result.properties.date?.date
      ? {
          start: result.properties.date.date.start ?? null,
          end: result.properties.date.date.end ?? null,
        }
      : null,
    prizemoney: result.properties.prizemoney?.number?.toString() ?? null,
  }));

  return awardSchema.array().parse(awards);
}

export async function fetchQnA(): Promise<QnA[]> {
  const response = await notionRequest<{ results: NotionQnAPage[] }>(`/databases/${DATABASE_IDS.QNA}/query`, {
    method: 'POST',
    body: {
      sorts: [{ property: 'order', direction: 'ascending' }],
    },
  });

  const qna = response.results.map((result) => ({
    id: result.id,
    question: result.properties.question?.title?.[0]?.plain_text ?? null,
    order: result.properties.order?.number ?? null,
    answer: result.properties.answer?.rich_text?.[0]?.plain_text ?? null,
  }));

  return qnaSchema.array().parse(qna);
}

export async function fetchMembers(): Promise<Member[]> {
  const currentYear = new Date().getFullYear();
  const thresholdGeneration = currentYear - 2004;

  const response = await notionRequest<{ results: NotionMemberPage[] }>(`/databases/${DATABASE_IDS.MEMBERS}/query`, {
    method: 'POST',
    body: {
      sorts: [
        { property: 'lunaGeneration', direction: 'descending' },
        { property: 'generation', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ],
    },
  });

  const members = response.results.map((result) => {
    const generation = result.properties.generation?.select?.name ?? null;
    let returnImage = false;

    if (generation) {
      const match = generation.match(/^(\d+)기$/);
      if (match?.[1]) {
        const generationNumber = Number.parseInt(match[1], 10);
        returnImage = generationNumber > thresholdGeneration;
      }
    }

    return {
      id: result.id,
      position: result.properties.position?.select?.name ?? null,
      image: returnImage
        ? (result.properties.image?.files?.[0]?.file?.url ?? result.properties.image?.files?.[0]?.external?.url ?? null)
        : null,
      name: result.properties.name?.title?.[0]?.plain_text ?? null,
      generation,
      class: result.properties.class?.select?.name ?? null,
      description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
      lunaGeneration: result.properties.lunaGeneration?.select?.name ?? null,
    };
  });

  return memberSchema.array().parse(members);
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await notionRequest<{ results: NotionProjectPage[] }>(`/databases/${DATABASE_IDS.PROJECTS}/query`, {
    method: 'POST',
    body: {
      sorts: [
        { property: 'year', direction: 'descending' },
        { property: 'name', direction: 'ascending' },
      ],
    },
  });

  const projects = response.results.map((result) => ({
    id: result.id,
    public_url: result.public_url ?? null,
    year: result.properties.year?.select?.name ?? null,
    image: result.properties.image?.files?.[0]?.file?.url ?? result.properties.image?.files?.[0]?.external?.url ?? null,
    name: result.properties.name?.title?.[0]?.plain_text ?? null,
    description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
    awards:
      result.properties.awards?.multi_select?.map((award) => ({
        id: award.id,
        name: award.name,
      })) ?? [],
  }));

  return projectSchema.array().parse(projects);
}

export async function fetchInformation(): Promise<Information[]> {
  const [infoResponse, awards, projects] = await Promise.all([
    notionRequest<{ results: NotionInformationPage[] }>(`/databases/${DATABASE_IDS.INFORMATION}/query`, {
      method: 'POST',
    }),
    fetchAwards(),
    fetchProjects(),
  ]);

  const baseInfo = infoResponse.results.map((result) => ({
    id: result.id,
    moto: result.properties.moto?.title?.[0]?.plain_text ?? null,
  }));

  const totalPrizeMoney = calculateTotalPrizeMoney(awards);

  const information = baseInfo.map((info) => ({
    ...info,
    contests: (awards.length + 40).toString(),
    projects: (projects.length + 23).toString(),
    prizemoney: `${(totalPrizeMoney + 75000000).toString().slice(0, -6)}00`,
  }));

  return informationSchema.array().parse(information);
}

export async function getLunaData(): Promise<LunaData> {
  const [awards, qna, members, projects, information] = await Promise.all([
    fetchAwards(),
    fetchQnA(),
    fetchMembers(),
    fetchProjects(),
    fetchInformation(),
  ]);

  return {
    awards,
    qna,
    members,
    projects,
    information,
  };
}
