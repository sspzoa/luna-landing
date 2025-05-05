// src/components/DataProvider.tsx
'use client';

import {
  awardsAtom,
  informationAtom,
  isDataInitializedAtom,
  isDataLoadingAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
} from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import type React from 'react';
import { useEffect } from 'react';
import { fetchAllData } from '@/lib/api-client';

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const setAwards = useSetAtom(awardsAtom);
  const setMembers = useSetAtom(membersAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setQnA = useSetAtom(qnaAtom);
  const setInformation = useSetAtom(informationAtom);
  const setIsDataLoading = useSetAtom(isDataLoadingAtom);
  const setIsDataInitialized = useSetAtom(isDataInitializedAtom);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,
  });

  useEffect(() => {
    setIsDataLoading(isLoading);
  }, [isLoading, setIsDataLoading]);

  useEffect(() => {
    if (data) {
      setAwards(data.awards);
      setMembers(data.members);
      setProjects(data.projects);
      setQnA(data.qna);
      setInformation(data.information);
      setIsDataInitialized(true);
    }
  }, [data, setAwards, setMembers, setProjects, setQnA, setInformation, setIsDataInitialized]);

  // Show loading state if needed
  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-luna-purple" />
        </div>
        <p className="text-center text-lg font-medium text-luna-dark">데이터를 불러오는 중입니다</p>
      </div>
    );
  }

  // Show error state if needed
  if (isError) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 bg-[#ffe2e2]">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-center text-lg font-bold text-[#82181a]">
            필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
            페이지를 새로고침해 주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#82181a] text-white rounded hover:bg-[#6a1315] transition-colors">
            새로고침
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataProvider;
