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
import { Dispatch, SetStateAction } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils/helpers/cn';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dictionary } from '@/libs/en';

interface ComboboxProps {
  attributesTraits: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSelect: (_trait: string) => void;
  traitSelected: string;
}

export const Combobox = ({ attributesTraits, open, setOpen, handleSelect, traitSelected }: ComboboxProps) => {
  return (
    <div className="mx-auto w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {traitSelected || dictionary.nftStatsDisplay.table.selectPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={dictionary.nftStatsDisplay.table.selectSearch} />
            <CommandList>
              <CommandEmpty>{dictionary.nftStatsDisplay.table.selectEmptyData}.</CommandEmpty>
              <CommandGroup>
                {attributesTraits.map((trait: string) => (
                  <CommandItem key={trait} value={trait} onSelect={() => handleSelect(trait)}>
                    <Check className={cn('mr-2 h-4 w-4', traitSelected === trait ? 'opacity-100' : 'opacity-0')} />
                    {trait}
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
