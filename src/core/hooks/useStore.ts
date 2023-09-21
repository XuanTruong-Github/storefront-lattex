import { useQuery } from '@tanstack/react-query';
import queryClient from '@/core/lib/react-query/query-client';
const useStore = (key: any, initialData: any) => {
  const { data } = useQuery({
    queryKey: [key, initialData],
    queryFn: () => initialData,
    enabled: false,
    initialData,
  });
  const setData = (value: any) => queryClient.setQueriesData(key, value);

  return [data, setData];
};
export default useStore;
