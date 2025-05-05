import {
  awardsAtom,
  informationAtom,
  isDataInitializedAtom,
  isDataLoadingAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
} from '@/store';
import type { Award, Information, Member, Project, QnA } from '@/types';
import { useAtomValue } from 'jotai';

export function useAwardsData(): Award[] {
  return useAtomValue(awardsAtom);
}

export function useMembersData(): Member[] {
  return useAtomValue(membersAtom);
}

export function useProjectsData(): Project[] {
  return useAtomValue(projectsAtom);
}

export function useQnAData(): QnA[] {
  return useAtomValue(qnaAtom);
}

export function useInformationData(): Information[] {
  return useAtomValue(informationAtom);
}

export function useIsDataLoading(): boolean {
  return useAtomValue(isDataLoadingAtom);
}

export function useIsDataInitialized(): boolean {
  return useAtomValue(isDataInitializedAtom);
}

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
    isInitialized,
  };
}
