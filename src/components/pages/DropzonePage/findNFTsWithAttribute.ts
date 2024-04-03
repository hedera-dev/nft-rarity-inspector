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

export const findNFTsWithAttribute = (
  metadata: MetadataRow[],
  attribute: AttributeOccurrence,
): { nftsWithAttribute: MetadataRow[]; count: number } => {
  const nftsWithAttribute = metadata.filter((nft) => {
    const attributes = nft.metadata['attributes'];
    return Array.isArray(attributes) && attributes.some((attr) => attr.trait_type === attribute.trait && attr.value === attribute.value);
  });

  return {
    nftsWithAttribute: nftsWithAttribute,
    count: nftsWithAttribute.length,
  };
};
