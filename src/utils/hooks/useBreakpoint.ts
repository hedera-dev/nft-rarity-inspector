import { useState, useEffect } from 'react';

export const useBreakpoint = (): {
  isMobile: boolean;
  isTablet: boolean;
  isLargeScreen: boolean;
  windowSize: number;
} => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowSize < 640;
  const isTablet = windowSize >= 640 && windowSize < 1024;
  const isLargeScreen = windowSize >= 1920;

  return { isMobile, isTablet, isLargeScreen, windowSize };
};
