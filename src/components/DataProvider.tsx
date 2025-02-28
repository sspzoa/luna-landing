// src/components/DataProvider.tsx
'use client';

import type React from 'react';
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  awardsAtom,
  membersAtom,
  projectsAtom,
  qnaAtom,
  informationAtom,
  isDataLoadingAtom,
  isDataInitializedAtom
} from '@/store';
import { useQuery } from '@tanstack/react-query';
import { fetchAllData } from '@/lib/api-client';
import LoadingPage from './LoadingPage';

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Jotai atoms
  const setAwards = useSetAtom(awardsAtom);
  const setMembers = useSetAtom(membersAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setQnA = useSetAtom(qnaAtom);
  const setInformation = useSetAtom(informationAtom);
  const setIsDataLoading = useSetAtom(isDataLoadingAtom);
  const setIsDataInitialized = useSetAtom(isDataInitializedAtom);

  const isDataLoading = useAtomValue(isDataLoadingAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  // React Query를 사용하여 모든 데이터 가져오기
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 데이터가 로드되면 Jotai atoms 업데이트
  useEffect(() => {
    if (data) {
      console.log('Data loaded:', data);
      setAwards(data.awards);
      setMembers(data.members);
      setProjects(data.projects);
      setQnA(data.qna);
      setInformation(data.information);
      setIsDataLoading(false);
      setIsDataInitialized(true);
    }
  }, [data, setAwards, setMembers, setProjects, setQnA, setInformation, setIsDataLoading, setIsDataInitialized]);

  // 오류 발생 시 표시
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-red-100">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-center text-lg font-bold text-red-900">
            필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
            페이지를 새로고침해 주세요.
          </p>
        </div>
      </div>
    );
  }

  // 데이터 로딩 중 로딩 페이지 표시
  if (isLoading || isDataLoading || !isDataInitialized) {
    return <LoadingPage />;
  }

  // 데이터 로드 후 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default DataProvider;