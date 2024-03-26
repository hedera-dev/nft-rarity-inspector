import type { FC } from 'react';
import { cn } from '@/utils/helpers/cn';

interface SpinnerLoaderProps {
  className?: string;
}

const SpinnerLoader: FC<SpinnerLoaderProps> = ({ className }) => {
  const spinnerStyle = cn(
    'w-14',
    'h-14',
    'inline-block',
    'rounded-full',
    'border-4',
    'border-[#64748B]',
    'border-b-black',
    'animate-spin',
    className,
  );

  return <div className={spinnerStyle} />;
};

export default SpinnerLoader;
