/*-
 *
 * Hedera Rarity Inspector
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { RarityCurveChart } from '@/components/pages/NFTDetailsDialog/RarityCurveChart';
import { frictionToPercents } from '@/utils/helpers/frictionToPercents';
import { MetadataRow } from '@/utils/types/metadataRow';
import { dictionary } from '@/libs/en';

export const RarityCalculation: React.FC<{
  name: string;
  serial: number;
  rarityScore: number;
  totalRarityRank: string;
  metadataRows: MetadataRow[];
}> = ({ name, serial, rarityScore, totalRarityRank, metadataRows }) => {
  const rarityOccurrence = metadataRows.reduce<{ [key: string]: number }>((acc, nft) => {
    const totalRarity = nft.rarity.totalRarity;
    acc[totalRarity] = (acc[totalRarity] || 0) + 1;
    return acc;
  }, {});

  const rarities = Object.keys(rarityOccurrence).sort((a, b) => Number(a) - Number(b));

  const sortedRarityOccurrence = Object.fromEntries(Object.entries(rarityOccurrence).sort(([a], [b]) => Number(a) - Number(b)));

  const countOfNFTs = metadataRows.length;

  const probabilityDistribution = Object.values(sortedRarityOccurrence).map((_, index, allNFTs) => {
    const allNFTsLowerRarityOccurrences = allNFTs.slice(0, index) as number[];
    const countOfNFTsWithLowerRarity = allNFTsLowerRarityOccurrences.reduce((a: number, b: number) => a + b, 0);
    return frictionToPercents(countOfNFTs - countOfNFTsWithLowerRarity, countOfNFTs);
  });

  return (
    <>
      <p className="mb-2 mt-8 text-lg font-bold">{dictionary.nftPreviewPage.rarityCurve}</p>
      <RarityCurveChart
        rarityScore={rarityScore}
        probabilityDistribution={probabilityDistribution}
        rarities={rarities}
        tooltipData={{ name, serial, totalRarityRank }}
      />
    </>
  );
};
