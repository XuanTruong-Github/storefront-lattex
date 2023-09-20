'use client';
import Pagination from '@/themes/default/components/global/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
export type Props = {
  pagination: {
    page: number;
    limit: number;
    length: number;
  };
};
export default function ProductListPagination({ pagination }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q');
  function onChangePage(currentPage: number) {
    router.push(
      `/search?q=${keyword}&page=${currentPage}&limit=${pagination.limit}`
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <Pagination
      className='ml-auto md:mx-auto'
      totalVisible={5}
      page={pagination.page}
      length={pagination.length}
      onChange={onChangePage}
    />
  );
}
