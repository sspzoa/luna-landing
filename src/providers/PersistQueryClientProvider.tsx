'use client';

import DataProvider from '@/components/DataProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import type { ReactNode } from 'react';
import { useState } from 'react';

const CACHE_TIME = 1000 * 60 * 30;

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

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <DataProvider>{children}</DataProvider>
      </JotaiProvider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
