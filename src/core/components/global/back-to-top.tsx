'use client';
import { useState, useEffect } from 'react';

import { Button } from '@/core/components/ui/button';
export default function BackToTop() {
  const [isVisible, setVisible] = useState(false);

  function onBackToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setVisible(window.scrollY > 200);
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  if (isVisible) {
    return (
      <Button
        size='icon'
        className='fixed bottom-8 right-6 lg:bottom-10 bg-black/60 duration-500 ease-in-out hover:scale-110 hover:transition lg:h-12 lg:w-12'
        title='Scroll to top'
        onClick={onBackToTop}
      >
        <i className='far fa-arrow-up'></i>
      </Button>
    );
  }
}
