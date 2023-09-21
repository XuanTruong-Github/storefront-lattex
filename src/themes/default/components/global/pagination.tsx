'use client';
import { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import ReactPaginate from 'react-paginate';
import { cn } from '@/core/lib/utils';
import useResponsive from '@/core/hooks/useResponsive';

export type PaginationProps = {
  className?: string;
  page: number;
  length?: number;
  totalVisible?: number;
  onChange: (currentPage: number) => void;
};

export default function Pagination(props: PaginationProps) {
  //Props
  const {
    className,
    page = 1,
    length = 1,
    totalVisible = length,
    onChange,
  } = props;
  // States
  const { isMobile } = useResponsive();
  const pageStyle =
    'w-10 aspect-square grid place-items-center font-medium text-sm rounded-full bg-secondary text-secondary-foreground hover:text-accent-foreground hover:text-primary-foreground hover:!bg-primary';
  const pageActive = '!bg-primary !text-primary-foreground';
  // Methods
  function onPageChange({ selected }: { selected: number }) {
    if (Number(selected) + 1 !== page) {
      onChange(selected + 1);
    }
  }
  function onMobilePrev() {
    if (page > 1) {
      onChange(page - 1);
    }
  }
  function onMobileNext() {
    if (page < length) {
      onChange(page + 1);
    }
  }

  // Render
  if (isMobile) {
    return (
      <div
        className={cn('flex w-fit items-center gap-3', className)}
      >
        <span>{`${page} of (${length})`}</span>
        <div>
          <Button
            variant='outline'
            disabled={page == 1}
            className='mr-1'
            onClick={onMobilePrev}
          >
            <i className='fas fa-chevron-left mr-2'></i>
            Previous
          </Button>
          <Button
            variant='outline'
            disabled={page == length}
            onClick={onMobileNext}
          >
            Next
            <i className='fas fa-chevron-right ml-2'></i>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <ReactPaginate
      breakLabel='...'
      className={cn('flex w-fit items-center md:gap-x-2', className)}
      previousLabel={<i className='fas fa-chevron-left'></i>}
      nextLabel={<i className='fas fa-chevron-right'></i>}
      previousLinkClassName={pageStyle}
      nextLinkClassName={pageStyle}
      activeLinkClassName={pageActive}
      pageLinkClassName={pageStyle}
      disabledClassName='opacity-40 pointer-events-none'
      initialPage={page - 1}
      onPageChange={onPageChange}
      pageRangeDisplayed={totalVisible}
      marginPagesDisplayed={1}
      pageCount={length}
      renderOnZeroPageCount={null}
    />
  );
}
