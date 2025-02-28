// src/hooks/use-data.ts
import { useAtom, useAtomValue } from 'jotai';
import {
  awardsAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
  informationAtom,
  isDataLoadingAtom,
  isDataInitializedAtom
} from '@/store';
import type {Award, Information, Member, Project, QnA} from "@/types";

// Hook to access awards data
export function useAwardsData(): Award[] {
  return useAtomValue(awardsAtom);
}

// Hook to access members data
export function useMembersData(): Member[] {
  return useAtomValue(membersAtom);
}

// Hook to access projects data
export function useProjectsData(): Project[] {
  return useAtomValue(projectsAtom);
}

// Hook to access QnA data
export function useQnAData(): QnA[] {
  return useAtomValue(qnaAtom);
}

// Hook to access information data
export function useInformationData(): Information[] {
  return useAtomValue(informationAtom);
}

// Hook to check if data is loading
export function useIsDataLoading(): boolean {
  return useAtomValue(isDataLoadingAtom);
}

// Hook to check if data is initialized
export function useIsDataInitialized(): boolean {
  return useAtomValue(isDataInitializedAtom);
}

// Hook to access all data at once
export function useAllData() {
  const awards = useAwardsData();
  const members = useMembersData();
  const projects = useProjectsData();
  const qna = useQnAData();
  const information = useInformationData();
  const isLoading = useIsDataLoading();
  const isInitialized = useIsDataInitialized();

  return {
    awards,
    members,
    projects,
    qna,
    information,
    isLoading,
    isInitialized
  };
}