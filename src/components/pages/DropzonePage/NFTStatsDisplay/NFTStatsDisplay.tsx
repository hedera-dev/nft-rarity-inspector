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
import { AttributesTableBrowser } from '@/components/pages/DropzonePage/NFTStatsDisplay/AttributesTableBrowser';

interface NFTStatsDisplayProps {
  metadata: MetadataRow[];
}

export const NFTStatsDisplay: React.FC<NFTStatsDisplayProps> = ({ metadata }) => {
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
  } = useNFTRarityData();

  const [open, setOpen] = useState<boolean>(false);
  const [traitSelected, setTraitSelected] = useState<string>(attributesTraits[0]);

  const handleSelect = (trait: string): void => {
    setTraitSelected(trait);
    setOpen(false);
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 px-3 sm:grid-cols-2 sm:gap-0 sm:px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="mx-auto w-full text-center sm:w-3/4">
          <NFTItemWrapper
            index={mostRareNFT.rarity.NFT - 1}
            metadataObject={mostRareNFT.metadata}
            totalRarity={mostRareNFT.rarity.totalRarity}
            fileName={mostRareNFT.fileName}
            metadataLength={metadata.length}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={mostRareNFT.rarityRank}
            nftNumber={mostRareNFT.rarity.NFT}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostRareNFT}</p>
        </div>
        <div className="mx-auto w-[100%] text-center sm:w-3/4">
          <NFTItemWrapper
            index={leastRareNFT.rarity.NFT - 1}
            metadataObject={leastRareNFT.metadata}
            totalRarity={leastRareNFT.rarity.totalRarity}
            fileName={leastRareNFT.fileName}
            metadataLength={metadata.length}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={leastRareNFT.rarityRank}
            nftNumber={leastRareNFT.rarity.NFT}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostCommonNFT}</p>
        </div>
        <div className="mx-auto w-[100%] text-center sm:w-3/4">
          <NFTItemWrapper
            index={nftsWithMostRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithMostRareAttribute[0].metadata}
            totalRarity={nftsWithMostRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithMostRareAttribute[0].fileName}
            metadataLength={metadata.length}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithMostRareAttribute[0].rarityRank}
            attribute={mostRareAttribute}
            usesCount={countMostRare}
            featuredCard
            nftNumber={nftsWithMostRareAttribute[0].rarity.NFT}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostRareAttribute}</p>
        </div>
        <div className="mx-auto w-[100%] text-center sm:w-3/4">
          <NFTItemWrapper
            index={nftsWithLeastRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithLeastRareAttribute[0].metadata}
            totalRarity={nftsWithLeastRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithLeastRareAttribute[0].fileName}
            metadataLength={metadata.length}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithLeastRareAttribute[0].rarityRank}
            attribute={leastRareAttribute}
            usesCount={countLeastRare}
            featuredCard
            nftNumber={nftsWithLeastRareAttribute[0].rarity.NFT}
          />
          <p className="mt-2 p-2 font-semibold uppercase xl:whitespace-nowrap">{dictionary.nftStatsDisplay.mostCommonAttribute}</p>
        </div>
      </div>
      <div className="mx-auto mb-10 mt-10 flex max-w-[1600px] flex-col lg:mt-20 lg:flex-row">
        <div className="mx-auto flex w-full flex-col gap-4 px-4 sm:w-2/3 lg:ml-auto lg:w-1/2 xl:w-[40%]">
          <RarityCurveCalculation metadataRows={metadata} />
        </div>
        <div className="mx-auto mb-2 mt-10 flex max-h-[350px] w-[260px] flex-col gap-4 text-lg font-semibold sm:w-[400px] lg:mt-0">
          <p className="text-lg font-bold text-black">{dictionary.nftStatsDisplay.table.title}</p>
          <Combobox attributesTraits={attributesTraits} open={open} setOpen={setOpen} handleSelect={handleSelect} traitSelected={traitSelected} />
          <AttributesTableBrowser traitOccurrence={traitOccurrence} traitSelected={traitSelected} />
        </div>
      </div>
    </>
  );
};
