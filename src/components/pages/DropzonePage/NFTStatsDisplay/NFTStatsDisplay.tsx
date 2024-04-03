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
import { MetadataRow } from '@/utils/types/metadataRow';
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTGallery/NFTItemWrapper';
import { RarityCurveCalculation } from '@/components/pages/NFTDetailsDialog/Charts/RarityCurveCalculation';
import { dictionary } from '@/libs/en';
import { useNFTRarityData } from '@/components/pages/DropzonePage/useNFTRarityData';
import { Combobox } from '@/components/pages/DropzonePage/NFTStatsDisplay/Combobox';
import { useState } from 'react';

interface NFTStatsDisplayProps {
  metadata: MetadataRow[];
}

export const NFTStatsDisplay: React.FC<NFTStatsDisplayProps> = ({ metadata }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const {
    traitOccurrence,
    mostRareNFT,
    leastRareNFT,
    mostRareAttribute,
    leastRareAttribute,
    nftsWithLeastRareAttribute,
    nftsWithMostRareAttribute,
    countLeastRare,
    countMostRare,
    attributesTraits,
  } = useNFTRarityData(metadata);

  const handleSelect = (trait: string): void => {
    setValue(trait);
    setOpen(false);
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <div className="mx-auto w-[75%] text-center">
          <NFTItemWrapper
            index={mostRareNFT.rarity.NFT - 1}
            metadataObject={mostRareNFT.metadata}
            totalRarity={mostRareNFT.rarity.totalRarity}
            fileName={mostRareNFT.fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={mostRareNFT.rarityRank}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostRareNFT}</p>
        </div>
        <div className="mx-auto w-[75%] text-center">
          <NFTItemWrapper
            index={leastRareNFT.rarity.NFT - 1}
            metadataObject={leastRareNFT.metadata}
            totalRarity={leastRareNFT.rarity.totalRarity}
            fileName={leastRareNFT.fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={leastRareNFT.rarityRank}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostCommonNFT}</p>
        </div>
        <div className="mx-auto w-[75%] text-center">
          <NFTItemWrapper
            index={nftsWithMostRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithMostRareAttribute[0].metadata}
            totalRarity={nftsWithMostRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithMostRareAttribute[0].fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithMostRareAttribute[0].rarityRank}
            attribute={mostRareAttribute}
            usesCount={countMostRare}
            featuredCard
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostRareAttribute}</p>
        </div>
        <div className="mx-auto w-[75%] text-center">
          <NFTItemWrapper
            index={nftsWithLeastRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithLeastRareAttribute[0].metadata}
            totalRarity={nftsWithLeastRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithLeastRareAttribute[0].fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithLeastRareAttribute[0].rarityRank}
            attribute={leastRareAttribute}
            usesCount={countLeastRare}
            featuredCard
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostCommonAttribute}</p>
        </div>
      </div>
      <div className="mx-auto my-10 flex">
        <div className="w-1/2">
          <RarityCurveCalculation metadataRows={metadata} />
        </div>
        <div className="mb-2 mt-8 w-1/2 border-2 border-red-600 text-lg font-bold">
          <Combobox attributesTraits={attributesTraits} open={open} setOpen={setOpen} handleSelect={handleSelect} value={value} />
        </div>
      </div>
    </>
  );
};
