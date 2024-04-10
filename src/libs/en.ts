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
export const dictionary = {
  header: {
    title: 'NFT Rarity Inspector',
    description: 'Upload either a CSV file or a directory of JSONs...',
    downloadExampleCollection: 'Download example collection',
  },
  dropzone: { description: 'Upload a file' },
  nftGallery: {
    detailsButton: 'Details',
    imageAltText: 'Image of',
    invalidFilesCount: 'Invalid files count',
    totalNftsNumber: 'Total number of nfts',
    rarityRank: 'Rarity rank',
    headers: {
      number: 'No.',
      image: 'Image',
      name: 'Name',
      description: 'Description',
      validationStatus: 'Validation status',
      errors: 'Errors',
    },
    nftCard: {
      usedIn: 'Used in',
      nfts: 'NFTs',
    },
  },
  nftStatsDisplay: {
    mostRareNFT: 'Most rare NFT',
    mostCommonNFT: 'Most common NFT',
    mostRareAttribute: 'Most rare attribute',
    mostCommonAttribute: 'Most common attribute',
    usedIn: (nftsNumber: number) => `Used in ${nftsNumber} NFTs`,
    table: {
      title: 'Attributes rarity',
      selectPlaceholder: 'Select an attribute...',
      selectEmptyData: 'No attributes found',
      selectSearch: 'Search for attribute...',
      value: 'Value',
    },
  },
  nftPreviewPage: {
    rarityChartLabels: {
      mostRare: 'Most Rare',
      rarity: 'Rarity',
      leastRare: 'Least Rare',
      yAxesLabel: 'Probability distribution ⓘ',
    },
    rarityChart: {
      header: 'Rarity curve',
      xAxisLabel: 'Rarity',
      yAxisLabel: 'Probability distribution',
      tooltipContent: (serial: number, totalRarityRank: string) => `Serial: #${serial}\nRarity rank: ${totalRarityRank}`,
      yAxesLabelTooltip: 'The probability distribution defines the likelihood of obtaining an NFT with a rarity score equal to or higher than this.',
    },
    noData: '(no-data)',
    noCreator: '(no-creator)',
    rarityRank: 'Rarity rank: ',
    rarityScore: 'Rarity score: ',
    attributesOccurrence: 'Attributes occurrence',
    rarityCurve: 'Rarity curve',
  },
  errors: {
    unknownError: 'Unknown error occurred',
    jsonFileUpload: 'Error during processing the JSON file',
    csvFileUpload: 'Error during processing the CSV file',
    emptyJsonFiles: (emptyFiles: string[]) => `Empty JSON ${emptyFiles.length > 1 ? 'files' : 'file'} detected and skipped: ${emptyFiles.join(', ')}`,
    jsonFileEmpty: 'This json file is empty',
    duplicateFile: (fileName?: string) => `Duplicate file detected: ${fileName}`,
    parsingError: (fileName: string | undefined, err: string) => `Error parsing JSON from file ${fileName}: ${err}`,
    unsupportedFileType: 'This file type is unsupported',
    noFileProvided: 'No file provided',
    zipFileWithoutJsonFiles: "The ZIP file's 'metadata' folder is empty or does not contain any JSON or CSV files",
    zipFileStructureIncorrect: "The ZIP file structure is incorrect. Please ensure your ZIP file includes a 'metadata' folder",
  },
  modal: {
    details: 'See more',
    modalTitle: 'NFT Preview',
    modalDescription: 'Preview how NFT will be displayed on a marketplace that follows HIP-412 standards.',
    modalImageAlt: 'NFT Image',
    descriptionTitle: 'Description',
    attributesTitle: 'Attributes',
    thereAreErrors: 'There are errors',
    nextButton: 'Next',
    previousButton: 'Previous',
    fileName: 'File name',
  },
} as const;
