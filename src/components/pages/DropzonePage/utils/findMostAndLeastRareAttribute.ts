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

export const findMostAndLeastRareAttribute = (
  metadata: MetadataRow[],
): { leastRareAttribute: AttributeOccurrence; mostRareAttribute: AttributeOccurrence } => {
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

  let leastRare: AttributeOccurrence | null = null;
  let mostRare: AttributeOccurrence | null = null;

  Object.entries(attributeOccurrences).forEach(([key, count]) => {
    const [trait, value] = key.split(':');
    if (!leastRare || count > leastRare.occurrence) {
      leastRare = { trait, value, occurrence: count };
    }
    if (!mostRare || count < mostRare.occurrence) {
      mostRare = { trait, value, occurrence: count };
    }
  });

  return {
    leastRareAttribute: leastRare || { trait: '', value: '', occurrence: 0 },
    mostRareAttribute: mostRare || { trait: '', value: '', occurrence: 0 },
  };
};
