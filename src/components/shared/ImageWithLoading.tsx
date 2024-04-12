/*-
 *
 * NFT Rarity Inspector
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/helpers/cn';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  parentRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}

export const ImageWithLoading = ({ src, alt, className }: ImageWithLoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    if (!src) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setError(false);
    };
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <>
      {isLoading ? (
        <div style={{ height: `220px`, width: '100%' }} className={cn('flex', 'flex-col', 'space-y-3', className)}>
          <Skeleton className="h-full min-h-full w-full rounded-xl" />
        </div>
      ) : (
        <img className={`max-h-[400px] ${className}`} src={error ? 'no-image-placeholder.webp' : src} alt={alt} />
      )}
    </>
  );
};
