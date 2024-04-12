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
import { useRef } from 'react';
import { MetadataObject } from 'hedera-nft-utilities';
import { truncateString } from '@/utils/helpers/truncateString';
import { dictionary } from '@/libs/en';
import { Button } from '@/components/ui/button';
import { getProperImageURL } from '@/utils/helpers/getProperImageURL';
import { ImageWithLoading } from '@/components/shared/ImageWithLoading';
import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

interface NFTItemProps {
  metadataObject: MetadataObject;
  metadataLength: number;
  index: number;
  setIsModalOpen: (_isOpen: boolean) => void;
  rarityRank: number;
  featuredCard: boolean;
  attribute?: AttributeOccurrence;
  usesCount?: number;
}

export const NFTItem = ({
  metadataObject,
  metadataLength,
  index,
  setIsModalOpen,
  rarityRank,
  featuredCard = false,
  attribute,
  usesCount,
}: NFTItemProps) => {
  const ref = useRef(null);
  const name = metadataObject.name as string;
  const image = getProperImageURL(metadataObject.image as string);
  const { trait, value } = attribute || {};
  const { isMobile } = useBreakpoint();

  const TRUNCATE_NAME_NUMBER = isMobile ? 50 : 10;
  const TRUNCATE_ATTRIBUTE_VALUE = isMobile ? 50 : 10;

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-lg shadow-cardShadow transition duration-200 md:hover:scale-105"
    >
      <div ref={ref} className="flex max-h-[300px] w-full items-center justify-center">
        <ImageWithLoading src={image} alt={name} className="max-w-full object-cover" parentRef={ref} />
      </div>
      <div className="flex w-full flex-col justify-between rounded-b-lg bg-white p-4 text-left sm:flex-col">
        <div className="flex w-full flex-col justify-between gap-4 text-[14px] sm:flex-row">
          <span>{featuredCard ? truncateString(trait!, TRUNCATE_ATTRIBUTE_VALUE) : `${dictionary.nftGallery.headers.number} ${index}`}</span>
          <span className="font-semibold">
            {featuredCard ? truncateString(value!, TRUNCATE_ATTRIBUTE_VALUE) : truncateString(name, TRUNCATE_NAME_NUMBER)}
          </span>
        </div>
        <div className="mt-2">
          {featuredCard ? (
            <div>
              <span>{dictionary.nftGallery.nftCard.usedIn}: </span>
              <span>
                {usesCount}/{metadataLength} {dictionary.nftGallery.nftCard.nfts}
              </span>
            </div>
          ) : (
            <span className="text-[14px]">
              {dictionary.nftGallery.rarityRank}: <span className="font-semibold">{rarityRank}</span>
            </span>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full translate-y-full bg-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <Button className="w-full rounded-none rounded-b-lg">{dictionary.modal.details}</Button>
      </div>
    </div>
  );
};
