'use client';
import Pagination from '@/themes/default/components/global/pagination';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';

export type Props = {
  pagination: {
    page: number;
    limit: number;
    length: number;
  };
};
export default function ProductListPagination({ pagination }: Props) {
  const router = useRouter();
  function onChangePage(currentPage: number) {
    const path = window.location.pathname;
    let searchParams: any = queryString.parse(window.location.search);
    searchParams.page = currentPage;
    searchParams.limit = pagination.limit;
    const url = `${path}?${queryString.stringify(searchParams)}`;
    router.push(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
