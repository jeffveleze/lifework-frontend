'use client';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const staleTime = 60 * 1000 * 5; // Five minutes in milliseconds
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: staleTime,
    },
  },
});

type ApiContextValue = {
  instance: AxiosInstance;
};
const ApiContext = createContext<ApiContextValue | null>(null);

export function ApiProvider(props: { children?: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const instance = useMemo(() => {
    const config: AxiosRequestConfig = {
      baseURL: url,
    };
    return axios.create(config);
  }, [url]);

  return (
    <ApiContext.Provider value={{ instance }}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('API is not provided');
  }
  return context.instance;
}
