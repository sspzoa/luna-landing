import { fetchAwards, fetchInformation, fetchMembers, fetchProjects, fetchQnA } from '@/lib/api-client';
import type React from 'react';
import { useEffect, useState } from 'react';

const LoadingPage: React.FC = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalDataTypes = 5;

  useEffect(() => {
    const loadData = async () => {
      const dataTypes = [
        { name: 'awards', fetch: fetchAwards },
        { name: 'members', fetch: fetchMembers },
        { name: 'projects', fetch: fetchProjects },
        { name: 'qna', fetch: fetchQnA },
        { name: 'information', fetch: fetchInformation },
      ];

      let completed = 0;

      const fetchPromises = dataTypes.map((dataType) => {
        return dataType
          .fetch()
          .then(() => {
            completed++;
            setLoadedCount(completed);
            return true;
          })
          .catch((error) => {
            console.error(`Error loading ${dataType.name}:`, error);
            return false;
          });
      });

      await Promise.all(fetchPromises);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2" />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-center text-lg font-bold">초기 데이터를 불러오는 중입니다</p>
        <p className="text-center text-lg font-bold">
          {loadedCount}/{totalDataTypes}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
