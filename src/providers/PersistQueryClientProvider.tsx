// src/providers/PersistQueryClientProvider.tsx
'use client';

import DataProvider from '@/components/DataProvider';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { Provider as JotaiProvider } from 'jotai';
import type React from 'react';
import { useEffect, useState } from 'react';

export function PersistQueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
            gcTime: 1000 * 60 * 60 * 24,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
      key: 'luna-data-cache',
      throttleTime: 1000,
    });

    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      buster: '1.0',
    });
  }, [queryClient]);

  return (
    <ReactQueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DataProvider>{children}</DataProvider>
      </JotaiProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </ReactQueryClientProvider>
  );
}
