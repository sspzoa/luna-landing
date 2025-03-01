// src/components/DataProvider.tsx
'use client';

import { fetchAwards, fetchInformation, fetchMembers, fetchProjects, fetchQnA } from '@/lib/api-client';
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
import { useAtomValue, useSetAtom } from 'jotai';
import type React from 'react';
import { useEffect, useState } from 'react';

interface DataProviderProps {
  children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const totalDataTypes = 5;

  const setAwards = useSetAtom(awardsAtom);
  const setMembers = useSetAtom(membersAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setQnA = useSetAtom(qnaAtom);
  const setInformation = useSetAtom(informationAtom);
  const setIsDataLoading = useSetAtom(isDataLoadingAtom);
  const setIsDataInitialized = useSetAtom(isDataInitializedAtom);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const dataTypes = [
        { name: 'awards', fetch: fetchAwards, setter: setAwards },
        { name: 'members', fetch: fetchMembers, setter: setMembers },
        { name: 'projects', fetch: fetchProjects, setter: setProjects },
        { name: 'qna', fetch: fetchQnA, setter: setQnA },
        { name: 'information', fetch: fetchInformation, setter: setInformation },
      ];

      type DataTypeKey = 'awards' | 'members' | 'projects' | 'qna' | 'information';

      interface DataTypeMapping {
        name: DataTypeKey;
        fetch: () => Promise<any>;
        setter: (data: any) => void;
      }

      const typedDataTypes: DataTypeMapping[] = dataTypes as DataTypeMapping[];

      const allData: Record<DataTypeKey, any> = {
        awards: [],
        members: [],
        projects: [],
        qna: [],
        information: [],
      };

      const fetchPromises = typedDataTypes.map(async (dataType) => {
        try {
          const result = await dataType.fetch();

          allData[dataType.name] = result;

          setLoadedCount((prev) => prev + 1);

          return result;
        } catch (error) {
          console.error(`Error loading ${dataType.name}:`, error);
          throw error;
        }
      });

      await Promise.all(fetchPromises);
      return allData;
    },
  });

  useEffect(() => {
    if (data) {
      setAwards(data.awards);
      setMembers(data.members);
      setProjects(data.projects);
      setQnA(data.qna);
      setInformation(data.information);
      setIsDataLoading(false);
      setIsDataInitialized(true);
    }
  }, [data, setAwards, setMembers, setProjects, setQnA, setInformation, setIsDataLoading, setIsDataInitialized]);

  if (isError) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 bg-[#ffe2e2]">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-center text-lg font-bold text-[#82181a]">
            필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
            페이지를 새로고침해 주세요.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2" />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-center text-lg font-bold">초기 데이터를 불러오는 중입니다.</p>
          <p className="text-center text-lg font-bold">
            {loadedCount}/{totalDataTypes}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DataProvider;
