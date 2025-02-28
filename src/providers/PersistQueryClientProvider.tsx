// src/providers/PersistQueryClientProvider.tsx
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import DataProvider from '@/components/DataProvider';

export function PersistQueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24, // 24시간
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      })
  );

  // 클라이언트 사이드에서만 실행되도록 useEffect 사용
  useEffect(() => {
    // 로컬 스토리지에 캐시 저장
    if (typeof window !== 'undefined') {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
        key: 'LUNA_QUERY_CACHE',
        throttleTime: 1000,
      });

      // 캐시 지속성 설정
      persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, // 1일
        buster: process.env.NEXT_PUBLIC_CACHE_BUSTER || '1', // 캐시 무효화를 위한 버스터 값
      });
    }
  }, [queryClient]);

  return (
    <ReactQueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DataProvider>{children}</DataProvider>
      </JotaiProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </ReactQueryClientProvider>
  );
}