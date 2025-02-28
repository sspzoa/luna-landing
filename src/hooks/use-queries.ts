import { fetchAllData, fetchAwards, fetchInformation, fetchMembers, fetchProjects, fetchQnA } from '@/lib/api-client';
// src/hooks/use-queries.ts
import { useQuery } from '@tanstack/react-query';

export function useAwardsQuery() {
  return useQuery({
    queryKey: ['awards'],
    queryFn: fetchAwards,
  });
}

export function useMembersQuery() {
  return useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
}

export function useQnAQuery() {
  return useQuery({
    queryKey: ['qna'],
    queryFn: fetchQnA,
  });
}

export function useInformationQuery() {
  return useQuery({
    queryKey: ['information'],
    queryFn: fetchInformation,
  });
}

export function useAllDataQuery() {
  return useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,
  });
}
