'use client';

import { cn } from '@/core/lib/utils';
import { useState, useEffect } from 'react';

export default function LimitedStock({ className }: { className?: string }) {
  const [people, setPeople] = useState(5416);
  const [purchased, setPurchased] = useState(3181);
  useEffect(() => {
    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const id = setInterval(() => {
      setPeople(randomNumber(4000, 8000));
      setPurchased(randomNumber(100, 200));
    }, 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={cn('text-sm md:text-base', className)}>
      <span className='text-destructive'>Limited stock! </span>{' '}
      <strong>{people}</strong> people are viewing this and{' '}
      <strong>{purchased}</strong> purchased it.
    </p>
  );
}
