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
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LEAST_RARE, MOST_RARE, SERIAL_ASC, SERIAL_DESC, SortingOptionsType, useMetadata } from '@/utils/contexts/MetadataContext';

const SORTING_OPTIONS: SortingOptionsType[] = [SERIAL_ASC, SERIAL_DESC, MOST_RARE, LEAST_RARE];

export const NFTSorting = () => {
  const { sorting, sortingOpen, setSortingOpen, handleSort } = useMetadata();

  return (
    <div className="ml-auto w-full max-w-[300px] sm:w-[200px]">
      <Popover open={sortingOpen} onOpenChange={setSortingOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={sortingOpen} className="w-full justify-between">
            {sorting}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 sm:w-[200px]">
          <Command>
            <CommandList>
              <CommandGroup>
                {SORTING_OPTIONS.map((option) => (
                  <CommandItem key={option} value={option} onSelect={() => handleSort(option)}>
                    <Check className={sorting === option ? 'mr-2 h-4 w-4 opacity-100' : 'mr-2 h-4 w-4 opacity-0'} />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
