'use client';
import { useState, useEffect } from 'react';

import { Button } from 'ui/button';
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
        variant='gray'
        className='fixed bottom-8 right-6 duration-500 ease-in-out hover:scale-110 hover:transition lg:bottom-10 lg:h-12 lg:w-12'
        title='Scroll to top'
        onClick={onBackToTop}
      >
        <i className='far fa-arrow-up'></i>
      </Button>
    );
  }
}
