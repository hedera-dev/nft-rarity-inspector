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
import { CheckboxWithLabel } from '@/components/shared/CheckboxWithLabel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { truncateString } from '@/utils/helpers/truncateString';

const CATEGORY_NAME_LENGTH = 20;

interface FilterCategoryAccordionProps {
  index: number;
  trait: string;
  values: string[];
}

export const FilterCategoryAccordion = ({ index, trait, values }: FilterCategoryAccordionProps) => {
  const sortedValues = [...values].sort();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={`${trait}-${index}`}>
        <AccordionTrigger className="px-2 text-left hover:no-underline">{truncateString(trait, CATEGORY_NAME_LENGTH)}</AccordionTrigger>
        {sortedValues.map((value) => (
          <AccordionContent key={value} className="cursor-pointer px-2 transition duration-200 hover:bg-slate-100">
            <CheckboxWithLabel label={value} trait={trait} />
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
