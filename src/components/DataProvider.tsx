'use client';

import { useAwards, useInformation, useMembers, useProjects, useQnA } from '@/hooks/useApi';
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
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

  const data = {
    awards: awards.data || [],
    members: members.data || [],
    projects: projects.data || [],
    qna: qna.data || [],
    information: information.data || [],
  };

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
    return (
      <LoadingScreen
        awardsLoaded={!awards.isLoading}
        membersLoaded={!members.isLoading}
        projectsLoaded={!projects.isLoading}
        qnaLoaded={!qna.isLoading}
        informationLoaded={!information.isLoading}
      />
    );
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return <>{children}</>;
};

interface LoadingScreenProps {
  awardsLoaded: boolean;
  membersLoaded: boolean;
  projectsLoaded: boolean;
  qnaLoaded: boolean;
  informationLoaded: boolean;
}

const LoadingScreen = ({
  awardsLoaded,
  membersLoaded,
  projectsLoaded,
  qnaLoaded,
  informationLoaded,
}: LoadingScreenProps) => {
  const loadedCount = [awardsLoaded, membersLoaded, projectsLoaded, qnaLoaded, informationLoaded].filter(
    Boolean,
  ).length;
  const totalCount = 5;
  const [trivia, setTrivia] = useState<string | null>(null);
  const [isTriviaLoading, setIsTriviaLoading] = useState(false);

  const fetchTrivia = async () => {
    setIsTriviaLoading(true);
    try {
      const response = await fetch('/api/trivia');
      if (!response.ok) {
        throw new Error('Failed to fetch trivia');
      }
      const data = await response.json();
      setTrivia(data.fact);
    } catch (error) {
      console.error('Error fetching trivia:', error);
      setTrivia('재미있는 사실을 불러오는 데 실패했어요. 🥲');
    } finally {
      setIsTriviaLoading(false);
    }
  };

  useEffect(() => {
    fetchTrivia();
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <Image className="opacity-50" alt="luna_logo" src="/icons/logo.svg" width={72} height={72} draggable={false} />
        <div className="w-48 h-1.5 bg-gray-300 rounded-full mt-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-luna-dark opacity-50 w-full h-full" />
          <div
            className="absolute inset-0 h-full bg-luna-purple rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(loadedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
      {trivia && (
        <div className="text-center mt-4 p-4 max-w-md">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">알고 계셨나요?</p>
          <p
            className={`mt-2 text-sm font-semibold max-w-[320px] ${isTriviaLoading ? 'animate-pulse text-gray-500' : 'cursor-pointer hover:text-luna-purple'}`}
            onClick={!isTriviaLoading ? fetchTrivia : undefined}
            onKeyDown={!isTriviaLoading ? fetchTrivia : undefined}
            title="클릭해서 다른 사실 보기">
            {isTriviaLoading && !trivia ? '재미있는 사실을 불러오는 중...' : trivia}
          </p>
        </div>
      )}
    </div>
  );
};

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
