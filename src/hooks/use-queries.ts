// src/hooks/use-queries.ts
import React from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import {
  fetchAwards,
  fetchMembers,
  fetchProjects,
  fetchQnA,
  fetchInformation,
  fetchAllData
} from '@/lib/api-client';
import {
  awardsAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
  informationAtom,
  isDataLoadingAtom,
  isDataInitializedAtom
} from '@/store';

// Individual hooks for each data type
export function useAwards() {
  return useQuery({
    queryKey: ['awards'],
    queryFn: fetchAwards,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });
}

export function useQnA() {
  return useQuery({
    queryKey: ['qna'],
    queryFn: fetchQnA,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInformation() {
  return useQuery({
    queryKey: ['information'],
    queryFn: fetchInformation,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to initialize all data at once
export function useInitializeData() {
  const setAwards = useSetAtom(awardsAtom);
  const setMembers = useSetAtom(membersAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setQnA = useSetAtom(qnaAtom);
  const setInformation = useSetAtom(informationAtom);
  const setIsDataLoading = useSetAtom(isDataLoadingAtom);
  const setIsDataInitialized = useSetAtom(isDataInitializedAtom);

  // Use React Query to fetch all data in parallel
  const results = useQueries({
    queries: [
      { queryKey: ['awards'], queryFn: fetchAwards, staleTime: 1000 * 60 * 5 },
      { queryKey: ['members'], queryFn: fetchMembers, staleTime: 1000 * 60 * 5 },
      { queryKey: ['projects'], queryFn: fetchProjects, staleTime: 1000 * 60 * 5 },
      { queryKey: ['qna'], queryFn: fetchQnA, staleTime: 1000 * 60 * 5 },
      { queryKey: ['information'], queryFn: fetchInformation, staleTime: 1000 * 60 * 5 },
    ],
  });

  // Check if all queries are successful
  const isSuccess = results.every((result) => result.isSuccess);
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  // Update the atoms when data is loaded
  React.useEffect(() => {
    if (isSuccess) {
      const [awardsResult, membersResult, projectsResult, qnaResult, informationResult] = results;
      setAwards(awardsResult.data || []);
      setMembers(membersResult.data || []);
      setProjects(projectsResult.data || []);
      setQnA(qnaResult.data || []);
      setInformation(informationResult.data || []);
      setIsDataLoading(false);
      setIsDataInitialized(true);
    }
  }, [isSuccess, results, setAwards, setMembers, setProjects, setQnA, setInformation, setIsDataLoading, setIsDataInitialized]);

  return {
    isLoading,
    isSuccess,
    isError,
    errors: results.filter((result) => result.error).map((result) => result.error),
  };
}