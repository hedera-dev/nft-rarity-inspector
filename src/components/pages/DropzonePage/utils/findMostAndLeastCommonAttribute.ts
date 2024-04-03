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
import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';
import { MetadataRow } from '@/utils/types/metadataRow';

export const findMostAndLeastCommonAttribute = (metadata: MetadataRow[]): { mostCommon: AttributeOccurrence; leastCommon: AttributeOccurrence } => {
  const attributeOccurrences: Record<string, number> = {};

  metadata.forEach((nft) => {
    const attributes = nft.metadata['attributes'];
    if (Array.isArray(attributes)) {
      attributes.forEach((attribute) => {
        const key = `${attribute.trait_type}:${attribute.value}`;
        attributeOccurrences[key] = (attributeOccurrences[key] || 0) + 1;
      });
    }
  });

  let mostCommon: AttributeOccurrence | null = null;
  let leastCommon: AttributeOccurrence | null = null;

  Object.entries(attributeOccurrences).forEach(([key, count]) => {
    const [trait, value] = key.split(':');
    if (!mostCommon || count > mostCommon.occurrence) {
      mostCommon = { trait, value, occurrence: count };
    }
    if (!leastCommon || count < leastCommon.occurrence) {
      leastCommon = { trait, value, occurrence: count };
    }
  });

  return {
    mostCommon: mostCommon || { trait: '', value: '', occurrence: 0 },
    leastCommon: leastCommon || { trait: '', value: '', occurrence: 0 },
  };
};
