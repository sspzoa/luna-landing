// src/lib/api-client.ts
import type { Award, Information, Member, Project, QnA } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export async function fetchAwards(): Promise<Award[]> {
  const response = await fetch(`${API_BASE_URL}/awards`);
  if (!response.ok) {
    throw new Error('Failed to fetch awards');
  }
  return response.json();
}

export async function fetchMembers(): Promise<Member[]> {
  const response = await fetch(`${API_BASE_URL}/members`);
  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }
  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function fetchQnA(): Promise<QnA[]> {
  const response = await fetch(`${API_BASE_URL}/qna`);
  if (!response.ok) {
    throw new Error('Failed to fetch QnA');
  }
  return response.json();
}

export async function fetchInformation(): Promise<Information[]> {
  const response = await fetch(`${API_BASE_URL}/information`);
  if (!response.ok) {
    throw new Error('Failed to fetch information');
  }
  return response.json();
}

export type AllData = {
  awards: Award[];
  members: Member[];
  projects: Project[];
  qna: QnA[];
  information: Information[];
};

export async function fetchAllData(): Promise<AllData> {
  const [awards, members, projects, qna, information] = await Promise.all([
    fetchAwards(),
    fetchMembers(),
    fetchProjects(),
    fetchQnA(),
    fetchInformation(),
  ]);

  return {
    awards,
    members,
    projects,
    qna,
    information,
  };
}
