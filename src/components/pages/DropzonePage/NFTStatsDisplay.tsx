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
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTItemWrapper';
import { RarityCurveCalculation } from '@/components/pages/NFTDetailsDialog/Charts/RarityCurveCalculation';
import { findNFTRarity } from '@/components/pages/DropzonePage/findNFTRarity';
import { findMostAndLeastCommonAttribute } from '@/components/pages/DropzonePage/findMostAndLeastCommonAttribute';
import { findNFTsWithAttribute } from '@/components/pages/DropzonePage/findNFTsWithAttribute';
import { calculateTraitOccurrenceFromData } from 'hedera-nft-utilities/src/rarity';
import { dictionary } from '@/libs/en';
import { useMemo } from 'react';

interface NFTStatsDisplayProps {
  metadata: MetadataRow[];
}

export const NFTStatsDisplay: React.FC<NFTStatsDisplayProps> = ({ metadata }) => {
  const traitOccurrence = useMemo(() => calculateTraitOccurrenceFromData(metadata.map((m) => m.metadata)), [metadata]);
  const mostRareNFT = findNFTRarity(metadata, 'most-rare');
  const leastRareNFT = findNFTRarity(metadata, 'least-rare');
  const { mostCommon, leastCommon } = findMostAndLeastCommonAttribute(metadata);
  const { nftsWithAttribute: nftsWithLeastRareAttribute, count: countMostCommon } = findNFTsWithAttribute(metadata, mostCommon);
  const { nftsWithAttribute: nftsWithMostRareAttribute, count: countLeastCommon } = findNFTsWithAttribute(metadata, leastCommon);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="w-[75%] text-center">
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
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.mostRareNFT}</p>
        </div>

        <div className="w-[75%] text-center">
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
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.mostCommonNFT}</p>
        </div>
        <div className="w-[75%] text-center">
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
          />
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.mostRareAttribute}</p>
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.usedIn(countLeastCommon)}</p>
        </div>
        <div className="w-[75%] text-center">
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
          />
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.mostCommonAttribute}</p>
          <p className="p-2 font-semibold">{dictionary.nftStatsDisplay.usedIn(countMostCommon)}</p>
        </div>
      </div>
      <div className="mx-auto my-10 w-1/2">
        <RarityCurveCalculation metadataRows={metadata} />
      </div>
    </>
  );
};
