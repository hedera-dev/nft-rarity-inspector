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
import { Button } from '@/components/ui/button';
import { getProperImageURL } from '@/utils/helpers/getProperImageURL';
import { ImageWithLoading } from '@/components/shared/ImageWithLoading';
import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';

const TRUNCATE_NAME_NUMBER = 13;

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
  const name = metadataObject.name as string;
  const image = getProperImageURL(metadataObject.image as string);
  const { trait, value } = attribute || {};

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-lg shadow-cardShadow transition duration-200 md:hover:scale-105"
    >
      <div className="flex w-full items-center justify-center">
        <ImageWithLoading src={image} alt={name} className="max-w-full object-cover" minHeight={250} />
      </div>
      <div className="flex w-full flex-col justify-between rounded-b-lg bg-white p-4 text-left sm:flex-col">
        <div className="flex w-full flex-row justify-between">
          <span>{featuredCard ? trait : `${dictionary.nftTable.headers.number} ${index + 1}`}</span>
          <span className="font-semibold">{featuredCard ? value : truncateString(name, TRUNCATE_NAME_NUMBER)}</span>
        </div>
        <div className="mt-2">
          {featuredCard ? `Used in: ${usesCount}/${metadataLength} NFTs` : `${dictionary.nftTable.rarityRank}: ${rarityRank}`}
        </div>
      </div>
      <div className="absolute bottom-0 w-full translate-y-full bg-white text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <Button className="w-full rounded-none rounded-b-lg">{dictionary.modal.details}</Button>
      </div>
    </div>
  );
};
