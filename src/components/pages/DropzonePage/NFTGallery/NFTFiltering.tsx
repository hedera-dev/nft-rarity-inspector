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
import { FilterCategoryAccordion } from '@/components/pages/DropzonePage/NFTGallery/FilterCategoryAccordion';
import { useNFTRarityData } from '@/components/pages/DropzonePage/useNFTRarityData';

export const NFTFiltering = () => {
  const { traitsWithValues } = useNFTRarityData();

  return (
    <div className="m-0 w-[25%] border-2 border-red-600 p-0">
      <h3 className="bg-slate-100 p-2 text-center font-semibold uppercase">Traits</h3>
      {traitsWithValues.map(({ trait, values }, index) => (
        <FilterCategoryAccordion key={trait} index={index} trait={trait} values={values} />
      ))}
    </div>
  );
};
