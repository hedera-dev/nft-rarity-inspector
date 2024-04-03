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
import { AttributeWithOccurrence } from '@/utils/types/attributes';
import { MetadataObject, TraitOccurrence } from 'hedera-nft-utilities';
import { Attribute } from '@/utils/types/nftDetails';

export const processAttributes = (metadataObject: MetadataObject, traitOccurrence: TraitOccurrence[]): AttributeWithOccurrence[] => {
  const attributesWithTraitOccurrences: AttributeWithOccurrence[] = [];

  (metadataObject.attributes as Attribute[])?.forEach(({ trait_type, value }) => {
    const occurrence = traitOccurrence.find(({ trait }) => trait_type === trait);
    if (occurrence) {
      const result = occurrence.values.find(({ value: valueFromSummary }) => valueFromSummary === value);
      if (result) {
        attributesWithTraitOccurrences.push({
          occurrence: Number(result.occurence),
          traitValue: result.value,
          traitName: trait_type,
        });
      }
    }
  });

  return attributesWithTraitOccurrences;
};
