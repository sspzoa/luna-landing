'use client';

import DataProvider from '@/components/DataProvider';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { Provider as JotaiProvider } from 'jotai';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

const CACHE_TIME = 1000 * 60 * 30;
const CACHE_KEY = 'luna-data-cache';
const CACHE_VERSION = '1.1';

interface PersistQueryClientProviderProps {
  children: ReactNode;
}

export function PersistQueryClientProvider({ children }: PersistQueryClientProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CACHE_TIME,
            gcTime: CACHE_TIME,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const localStoragePersister = createSyncStoragePersister({
          storage: window.localStorage,
          key: CACHE_KEY,
          throttleTime: 1000,
        });

        persistQueryClient({
          queryClient,
          persister: localStoragePersister,
          maxAge: CACHE_TIME,
          buster: CACHE_VERSION,
        });
      }
    } catch (error) {
      console.error('캐시 저장소 초기화 중 오류 발생:', error);
    }
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DataProvider>{children}</DataProvider>
      </JotaiProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
