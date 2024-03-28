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
import { Button } from '@/components/ui/button';
import { dictionary } from '@/libs/en';
import { MetadataObject, TraitOccurrence } from 'hedera-nft-utilities';
import { Attribute } from '@/utils/types/nftDetails';
import { getProperImageURL } from '@/utils/helpers/getProperImageURL';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MetadataRow } from '@/utils/types/metadataRow';
import { NFTAttribute } from '@/components/pages/NFTDetailsDialog/NFTAttribute';
import { NFTAttributesRarity } from '@/components/pages/NFTDetailsDialog/NFTAttributesRarity';
import { RarityCalculation } from '@/components/pages/NFTDetailsDialog/RarityCalculation';
import { AttributeWithOccurrence } from '@/utils/types/attributes';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { ImageWithLoading } from '@/components/pages/NFTDetailsDialog/ImageWithLoading';

export const NFTDetails = ({
  metadataObject,
  totalRarity,
  fileName,
  activeId,
  metadataLength,
  metadataRows,
  handlePrevious,
  handleNext,
  traitOccurrence,
  hasNextPrevButtons,
  setIsModalOpen,
  isModalOpen,
}: {
  metadataObject: MetadataObject;
  totalRarity: string;
  fileName: string;
  activeId: number;
  metadataLength: number;
  metadataRows?: MetadataRow[];
  handlePrevious: () => void;
  handleNext: () => void;
  traitOccurrence: TraitOccurrence[];
  hasNextPrevButtons: boolean;
  setIsModalOpen: (_isOpen: boolean) => void;
  isModalOpen: boolean;
}) => {
  const name = metadataObject?.name as string;
  const description = metadataObject?.description as string;
  const image = getProperImageURL(metadataObject?.image as string);
  const creator = metadataObject?.creator as string;
  const totalRarityRank = metadataRows ? `${metadataRows[activeId].rarityRank}/${metadataLength}` : '';
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

  const attributes = attributesWithTraitOccurrences.length > 0 ? attributesWithTraitOccurrences : (metadataObject?.attributes as Attribute[]);

  return (
    <Dialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <DialogContent className="flex max-h-screen max-w-[1300px] flex-col justify-center md:h-[900px]">
        <DialogHeader>
          <DialogTitle>
            <span className="font-bold">{dictionary.modal.fileName}: </span>
            {fileName}
          </DialogTitle>
        </DialogHeader>
        <div className="h-full gap-4 overflow-y-scroll py-4">
          <div className="grid grid-cols-1 items-start md:grid-cols-2 md:items-center">
            <div className="mb-auto hidden flex-col items-center justify-center pr-8 md:flex">
              <ImageWithLoading src={image} alt={dictionary.modal.modalImageAlt} />
              <div className="mb-2 mt-5 w-full">
                <p className="text-lg font-bold">{dictionary.modal.descriptionTitle}</p>
                {description || '-'}
              </div>
            </div>
            <div className="mb-auto flex flex-col">
              <p>#{activeId + 1}</p>
              <h2 className="text-3xl font-semibold tracking-tight first:mt-0 ">{name || '-'}</h2>
              <p className="mb-10 scroll-m-20 border-b pb-2 md:mb-10">{creator || dictionary.nftPreviewPage.noCreator}</p>
              <div className="flex flex-col">
                {totalRarity && (
                  <>
                    <p className="text-lg font-bold">
                      {dictionary.nftPreviewPage.rarityRank}
                      <span className="font-normal">{totalRarityRank}</span>
                    </p>
                    <p className="text-lg font-bold">
                      {dictionary.nftPreviewPage.rarityScore}
                      <span className="font-normal">{totalRarity}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="mb-10 flex items-center justify-center md:hidden">
                <ImageWithLoading src={image} alt={dictionary.modal.modalImageAlt} />
              </div>
              <div className="flex flex-col md:hidden">
                <p className="text-lg font-bold ">{dictionary.modal.descriptionTitle}</p>
                <p>{description || '-'}</p>
              </div>
              {attributes?.length > 0 && (
                <div className="my-6">
                  <p className="text-lg font-bold">{dictionary.modal.attributesTitle}</p>
                  <ul className="flex flex-wrap gap-2 [&>li]:mt-2">
                    {attributes.map((attribute, index) => {
                      if ('occurrence' in attribute) {
                        const { traitName, traitValue, occurrence } = attribute;
                        return <NFTAttribute key={index} trait={traitName} value={traitValue} occurrence={`${occurrence}%`} />;
                      }

                      const { trait_type, value } = attribute;
                      return <NFTAttribute key={index} trait={trait_type} value={value} />;
                    })}
                  </ul>
                </div>
              )}
              {totalRarity && metadataRows && (
                <>
                  <NFTAttributesRarity attributesData={attributesWithTraitOccurrences} />
                  <RarityCalculation
                    name={(metadataObject?.name as string) || dictionary.nftPreviewPage.noData}
                    serial={activeId + 1}
                    rarityScore={Number(totalRarity)}
                    totalRarityRank={totalRarityRank}
                    metadataRows={metadataRows}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {hasNextPrevButtons && (
          <DialogFooter className="flex flex-row items-center gap-1">
            <Button className="w-full md:w-[100px]" disabled={activeId === 0} onClick={handlePrevious}>
              {dictionary.modal.previousButton}
            </Button>
            <Button className="w-full md:w-[100px]" disabled={activeId === metadataLength - 1} onClick={handleNext}>
              {dictionary.modal.nextButton}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
