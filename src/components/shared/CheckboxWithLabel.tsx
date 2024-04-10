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
import { Checkbox } from '@/components/ui/checkbox';
import { useMetadata } from '@/utils/contexts/MetadataContext';

interface CheckboxWithLabelProps {
  label: string;
  trait: string;
}

export const CheckboxWithLabel = ({ label = '', trait }: CheckboxWithLabelProps) => {
  const { filters, handleFilter } = useMetadata();

  const isChecked = filters[trait]?.includes(label) || false;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} onCheckedChange={(bool) => handleFilter(trait, label, bool as boolean)} checked={isChecked} />
      <label
        htmlFor={label}
        className="w-full cursor-pointer py-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
