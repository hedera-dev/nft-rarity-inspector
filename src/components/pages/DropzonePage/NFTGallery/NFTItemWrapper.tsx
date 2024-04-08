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
import { NFTItem } from '@/components/pages/DropzonePage/NFTGallery/NFTItem';
import { useCallback, useEffect, useState } from 'react';
import { NFTDetails } from '@/components/pages/NFTDetailsDialog/Dialog/NFTDetails';
import { MetadataObject } from 'hedera-nft-utilities';
import { MetadataRow } from '@/utils/types/metadataRow';
import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';
import { useNFTRarityData } from '@/components/pages/DropzonePage/useNFTRarityData';

export const NFTItemWrapper = ({
  index,
  metadataRows,
  metadataObject,
  totalRarity,
  fileName,
  metadataLength,
  hasNextPrevButtons = true,
  rarityRank,
  featuredCard = false,
  usesCount,
  attribute,
}: {
  index: number;
  metadataObject: MetadataObject;
  totalRarity: string;
  fileName: string;
  metadataLength: number;
  metadataRows: MetadataRow[];
  hasNextPrevButtons?: boolean;
  rarityRank: number;
  featuredCard?: boolean;
  usesCount?: number;
  attribute?: AttributeOccurrence;
}) => {
  const [activeId, setActiveId] = useState(index);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { traitOccurrence } = useNFTRarityData();

  const handlePrevious = useCallback(() => setActiveId((oldId) => Math.max(oldId - 1, 0)), []);
  const handleNext = useCallback(() => setActiveId((oldId) => Math.min(oldId + 1, metadataLength - 1)), [metadataLength]);

  useEffect(() => {
    if (!isModalOpen) {
      setActiveId(index);
    }
  }, [isModalOpen]);

  return (
    <>
      <NFTDetails
        metadataObject={activeId === index ? metadataObject : (metadataRows?.[activeId].metadata as MetadataObject)}
        totalRarity={activeId === index ? totalRarity : (metadataRows?.[activeId].rarity.totalRarity as string)}
        fileName={activeId === index ? fileName : (metadataRows?.[activeId].fileName as string)}
        metadataLength={metadataLength}
        metadataRows={metadataRows}
        activeId={activeId}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        traitOccurrence={traitOccurrence}
        hasNextPrevButtons={hasNextPrevButtons}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        rarityRank={activeId === index ? rarityRank : (metadataRows?.[activeId].rarityRank as number)}
      />
      <NFTItem
        metadataObject={metadataObject}
        metadataLength={metadataLength}
        index={index}
        setIsModalOpen={setIsModalOpen}
        featuredCard={featuredCard}
        attribute={attribute}
        usesCount={usesCount}
        rarityRank={activeId === index ? rarityRank : (metadataRows?.[activeId].rarityRank as number)}
      />
    </>
  );
};
