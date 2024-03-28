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
import { MetadataObject } from 'hedera-nft-utilities';
import { truncateString } from '@/utils/helpers/truncateString';
import { dictionary } from '@/libs/en';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/helpers/cn';
import { Button } from '@/components/ui/button';
import { getProperImageURL } from '@/utils/helpers/getProperImageURL';
import { ImageWithLoading } from '@/components/pages/NFTDetailsDialog/ImageWithLoading';

const TRUNCATE_NAME_NUMBER = 13;

interface NFTItemProps {
  metadata: MetadataObject;
  index: number;
  isModalOpen: boolean;
  setIsModalOpen: (_isOpen: boolean) => void;
}

export const NFTItem = ({ metadata, index, isModalOpen, setIsModalOpen }: NFTItemProps) => {
  const [hoverActive, setHoverActive] = useState(false);
  const name = metadata.name as string;
  const image = getProperImageURL(metadata.image as string);

  useEffect(() => {
    isModalOpen && setHoverActive(false);
  }, [isModalOpen]);

  const showButton = !isModalOpen && hoverActive;

  return (
    <div
      key={index}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      onClick={() => setIsModalOpen(true)}
      className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-lg shadow-cardShadow transition duration-200 md:hover:scale-105"
    >
      <div className="flex w-full items-center justify-center">
        <ImageWithLoading src={image} alt={name} className="max-w-full object-cover" minHeight={250} />
      </div>
      <div className="flex w-full flex-col justify-between rounded-b-lg bg-white p-4 text-left sm:flex-col">
        <div className="flex w-full flex-row justify-between">
          <span>
            {dictionary.nftTable.headers.number} {index + 1}
          </span>
          <span className="font-semibold">{truncateString(name, TRUNCATE_NAME_NUMBER)}</span>
        </div>
        {/* TODO - change mocked rarity rank */}
        <div className="mt-2">Rarity rank: 100</div>
      </div>
      <div
        className={cn(
          showButton ? 'translate-y-0' : 'translate-y-full',
          'absolute bottom-0 w-full bg-white text-center transition duration-300 ease-in-out',
        )}
      >
        <Button className="w-full rounded-none rounded-b-lg">{dictionary.modal.details}</Button>
      </div>
    </div>
  );
};
