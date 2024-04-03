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
import { NFTItem } from '@/components/pages/DropzonePage/NFTItem';
import { useCallback, useState } from 'react';
import { NFTDetails } from '@/components/pages/NFTDetailsDialog/Dialog/NFTDetails';
import { MetadataObject, TraitOccurrence } from 'hedera-nft-utilities';
import { MetadataRow } from '@/utils/types/metadataRow';

export const NFTItemWrapper = ({
  index,
  metadataRows,
  metadataObject,
  totalRarity,
  fileName,
  metadataLength,
  traitOccurrence,
  hasNextPrevButtons = true,
  rarityRank,
}: {
  index: number;
  metadataObject: MetadataObject;
  totalRarity: string;
  fileName: string;
  metadataLength: number;
  metadataRows?: MetadataRow[];
  traitOccurrence: TraitOccurrence[];
  hasNextPrevButtons?: boolean;
  rarityRank: number;
}) => {
  const [activeId, setActiveId] = useState(index);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = useCallback(() => setActiveId((oldId) => Math.max(oldId - 1, 0)), []);
  const handleNext = useCallback(() => setActiveId((oldId) => Math.min(oldId + 1, metadataLength - 1)), [metadataLength]);

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
        key={index}
        metadataObject={metadataObject}
        index={index}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        rarityRank={activeId === index ? rarityRank : (metadataRows?.[activeId].rarityRank as number)}
      />
    </>
  );
};
