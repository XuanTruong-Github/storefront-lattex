'use client';
import { Label } from '@/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';

type Option = {
  value: string;
  label: string;
};

export default function Sort() {
  const router = useRouter();
  const sortOptions = [
    {
      value: '',
      label: 'Manual',
    },
    {
      value: 'final_price:asc',
      label: 'Price: Low to high',
    },
    {
      value: 'final_price:desc',
      label: 'Price: High to low',
    },
  ];
  function onSort(value: string) {
    const path = window.location.pathname;
    let searchParams = queryString.parse(window.location.search);
    searchParams.sort = value;
    if (!searchParams.sort) delete searchParams.sort;
    const url = `${path}?${queryString.stringify(searchParams)}`;
    router.push(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className='flex items-center gap-2'>
      <Label className='whitespace-nowrap'>Sort by:</Label>
      <Select onValueChange={onSort}>
        <SelectTrigger className='w-52'>
          <SelectValue placeholder='Sort by'></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((item: Option, key: number) => (
            <SelectItem key={key} value={item.value} textValue={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
