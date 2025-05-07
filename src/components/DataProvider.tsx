'use client';

import { useAllData } from '@/hooks/useApi';
import {
  awardsAtom,
  informationAtom,
  isDataInitializedAtom,
  isDataLoadingAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
} from '@/store';
import { useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider = ({ children }: DataProviderProps) => {
  const setAwards = useSetAtom(awardsAtom);
  const setMembers = useSetAtom(membersAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setQnA = useSetAtom(qnaAtom);
  const setInformation = useSetAtom(informationAtom);
  const setIsDataLoading = useSetAtom(isDataLoadingAtom);
  const setIsDataInitialized = useSetAtom(isDataInitializedAtom);

  const { data, isLoading, isError, isSuccess } = useAllData();

  useEffect(() => {
    setIsDataLoading(isLoading);
  }, [isLoading, setIsDataLoading]);

  useEffect(() => {
    if (isSuccess) {
      setAwards(data.awards);
      setMembers(data.members);
      setProjects(data.projects);
      setQnA(data.qna);
      setInformation(data.information);
      setIsDataInitialized(true);
    }
  }, [
    isSuccess,
    data.awards,
    data.members,
    data.projects,
    data.qna,
    data.information,
    setAwards,
    setMembers,
    setProjects,
    setQnA,
    setInformation,
    setIsDataInitialized,
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return <>{children}</>;
};

const LoadingScreen = () => (
  <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8">
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luna-purple" />
    </div>
  </div>
);

const ErrorScreen = () => (
  <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 bg-[#ffe2e2]">
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-center text-lg font-bold text-[#82181a]">
        필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
        페이지를 새로고침해 주세요.
      </p>
    </div>
  </div>
);

export default DataProvider;
