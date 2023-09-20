import { useQuery } from '@tanstack/react-query';
import queryClient from '@/core/lib/react-query/query-client';
const useStore = (key: any[], initialData: any) => [
  useQuery(key, () => initialData, { enabled: false, initialData }).data,
  (value: any) => queryClient.setQueriesData(key, value),
];
export default useStore;
