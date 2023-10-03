'use client';

import { useState, useMemo, useEffect } from 'react';

type Props = {
  className?: string;
};

export default function SaleCountDown({ className }: Props) {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [stopCountDown, setStopCountDown] = useState(false);
  const twoDigits = (n: number) => {
    if (!n) return '00';
    return n <= 9 ? '0' + n : n;
  };
  const minutes = useMemo(
    () => twoDigits(Math.floor(timeLeft / 60)),
    [timeLeft]
  );
  const seconds = useMemo(() => twoDigits(timeLeft % 60), [timeLeft]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft - 1 >= 0) setTimeLeft(timeLeft - 1);
      else setStopCountDown(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <p className={className}>
      <b>Last Minute</b> - Sale end in
      <strong className='ml-1 text-red-500'>
        {stopCountDown ? 'Timeout' : `${minutes}:${seconds}`}
      </strong>
    </p>
  );
}
