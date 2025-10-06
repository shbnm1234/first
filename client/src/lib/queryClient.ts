import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 3,
      refetchOnWindowFocus: true,
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}`);
        }
        return response.json();
      },
    },
  },
});

// API request helper
export async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status}: ${errorText}`);
  }

  return response.json();
}