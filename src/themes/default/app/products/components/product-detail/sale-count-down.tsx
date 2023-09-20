'use client';

import { useState, useMemo, useEffect } from 'react';

type Props = {
  className?: string;
};
function twoDigits(n: number) {
  return n <= 9 ? '0' + n : n;
}
export default function SaleCountDown({ className }: Props) {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = useMemo(
    () => twoDigits(Math.floor(timeLeft / 60)),
    [timeLeft]
  );
  const seconds = useMemo(() => twoDigits(timeLeft % 60), [timeLeft]);
  return (
    <p className={className}>
      <b>Last Minute</b> - Sale end in
      <span className='ml-1 font-bold text-red-500'>
        {minutes}:{seconds}
      </span>
    </p>
  );
}
