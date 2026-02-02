import type { Award, Information, Member, Project, QnA } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = '/api';

async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }
  return response.json();
}

export const useAwards = () => {
  return useQuery<Award[], Error>({
    queryKey: ['awards'],
    queryFn: () => fetchData<Award[]>('awards'),
  });
};

export const useMembers = () => {
  return useQuery<Member[], Error>({
    queryKey: ['members'],
    queryFn: () => fetchData<Member[]>('members'),
  });
};

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: () => fetchData<Project[]>('projects'),
  });
};

export const useQnA = () => {
  return useQuery<QnA[], Error>({
    queryKey: ['qna'],
    queryFn: () => fetchData<QnA[]>('qna'),
  });
};

export const useInformation = () => {
  return useQuery<Information[], Error>({
    queryKey: ['information'],
    queryFn: () => fetchData<Information[]>('information'),
  });
};

export const useAllData = () => {
  const awards = useAwards();
  const members = useMembers();
  const projects = useProjects();
  const qna = useQnA();
  const information = useInformation();

  const isLoading =
    awards.isLoading || members.isLoading || projects.isLoading || qna.isLoading || information.isLoading;
  const isError = awards.isError || members.isError || projects.isError || qna.isError || information.isError;
  const isSuccess =
    awards.isSuccess && members.isSuccess && projects.isSuccess && qna.isSuccess && information.isSuccess;

  return {
    data: {
      awards: awards.data || [],
      members: members.data || [],
      projects: projects.data || [],
      qna: qna.data || [],
      information: information.data || [],
    },
    isLoading,
    isError,
    isSuccess,
  };
};
