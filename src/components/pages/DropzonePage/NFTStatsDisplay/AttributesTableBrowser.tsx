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
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dictionary } from '@/libs/en';
import { TraitOccurrence } from 'hedera-nft-utilities';

interface AttributesTableBrowserProps {
  traitOccurrence: TraitOccurrence[];
  traitSelected: string;
}

export const AttributesTableBrowser = ({ traitOccurrence, traitSelected }: AttributesTableBrowserProps) => {
  const selectedTraitValues = useMemo(() => {
    const selectedTrait = traitOccurrence.find(({ trait }) => trait === traitSelected);
    const sortedValues = selectedTrait?.values.sort((a, b) => parseFloat(a.occurence) - parseFloat(b.occurence));
    return sortedValues || [];
  }, [traitOccurrence, traitSelected]);

  return (
    <Table className="mx-auto h-full w-full divide-y divide-gray-200">
      <TableHeader className="bg-gray-50">
        <TableRow className="text-center">
          <TableHead
            scope="col"
            className="w-1/2 border-r border-black px-6 py-3 text-left text-center text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            {dictionary.nftStatsDisplay.table.value}
          </TableHead>
          <TableHead
            scope="col"
            className="w-1/2 border-l border-black px-6 py-3 text-left text-center text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            %
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-200 bg-white">
        {selectedTraitValues.map(({ value, occurence }, index) => (
          <TableRow key={index}>
            <TableCell className="w-[100px] whitespace-nowrap border-r border-black px-6 py-4 text-center text-sm font-medium text-gray-900">
              {value}
            </TableCell>
            <TableCell className="w-[100px] whitespace-nowrap border-l border-black px-6 py-4 text-center text-sm text-gray-500">
              {occurence}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
