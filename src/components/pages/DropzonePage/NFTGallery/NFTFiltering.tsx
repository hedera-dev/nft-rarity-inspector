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
import { Button } from '@/components/ui/button';
import { dictionary } from '@/libs/en';
import { ClearFiltersIcon } from '@/utils/assets/icons/ClearFiltersIcon';
import { useMetadata } from '@/utils/contexts/MetadataContext';
import { Tooltip } from 'react-tooltip';

export const NFTFiltering = () => {
  const { setFilters, filteredAndSortedMetadataLength } = useMetadata();
  const { traitsWithValues } = useNFTRarityData();

  return (
    <div className={`sticky top-[50px] max-h-screen min-w-[200px] lg:min-w-[250px] xl:min-w-[300px]`}>
      <div className="flex w-full justify-between bg-slate-100">
        <h3 className=" p-2 text-center">
          {dictionary.nftGallery.results}: <span className="font-bold">{filteredAndSortedMetadataLength}</span>
        </h3>
        <Button
          data-tooltip-id="clear-filters"
          onClick={() => setFilters({})}
          className="flex w-[40px] justify-center rounded-none bg-slate-100 p-0 hover:bg-slate-200"
          data-tooltip-place="left"
        >
          <ClearFiltersIcon className="w-1/3" />
        </Button>
        <Tooltip id="clear-filters">{dictionary.nftGallery.clearFilters}</Tooltip>
      </div>
      <div className="max-h-screen overflow-y-scroll">
        {traitsWithValues.map(({ trait, values }, index) => (
          <FilterCategoryAccordion key={trait} index={index} trait={trait} values={values} />
        ))}
      </div>
    </div>
  );
};
