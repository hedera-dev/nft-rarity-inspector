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
import { RarityType } from '@/utils/types/rarityType';

export const findNFTRarity = (metadata: MetadataRow[], rarityType: RarityType): MetadataRow => {
  const sortedMetadata = metadata.sort((a, b) => {
    const rarityA = a.rarity ? parseFloat(a.rarity.totalRarity) : 0;
    const rarityB = b.rarity ? parseFloat(b.rarity.totalRarity) : 0;
    return rarityType === 'most-rare' ? rarityB - rarityA : rarityA - rarityB;
  });
  return sortedMetadata[0];
};
