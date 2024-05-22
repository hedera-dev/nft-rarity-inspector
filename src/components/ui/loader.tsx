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

import { ValidateArrayOfObjectsResult } from '@hashgraph/hedera-nft-sdk';

export const countInvalidObjects = (validationResponse: ValidateArrayOfObjectsResult): number => {
  return Object.values(validationResponse.results).reduce((acc, current) => {
    if (current.errorsCount > 0) {
      acc += 1;
    }
    return acc;
  }, 0);
};
