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
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { dictionary } from '@/libs/en';

interface FooterProps {
  activeId: number;
  handlePrevious: () => void;
  handleNext: () => void;
  metadataLength: number;
}

export const Footer = ({ activeId, handlePrevious, handleNext, metadataLength }: FooterProps) => {
  return (
    <DialogFooter className="flex flex-row items-center gap-1">
      <Button className="w-full md:w-[100px]" disabled={activeId === 0} onClick={handlePrevious}>
        {dictionary.modal.previousButton}
      </Button>
      <Button className="w-full md:w-[100px]" disabled={activeId === metadataLength - 1} onClick={handleNext}>
        {dictionary.modal.nextButton}
      </Button>
    </DialogFooter>
  );
};
