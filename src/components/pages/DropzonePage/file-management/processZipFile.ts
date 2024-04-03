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
import JSZip from 'jszip';
import { dictionary } from '@/libs/en';
import type { ExtFile } from '@dropzone-ui/react';
import { MetadataObject } from 'hedera-nft-utilities';
import { processCsvFile } from '@/components/pages/DropzonePage/file-management/processCSVFile';
import { SUPPORTED_IMAGE_TYPES } from '@/components/pages/DropzonePage/utils/supportedFileTypes';
import { SimpleMetadataRow } from '@/utils/types/metadataRow';

export async function processZipFile(extFile: ExtFile): Promise<SimpleMetadataRow[]> {
  if (!extFile.file) throw new Error(dictionary.errors.noFileProvided);

  const zip = new JSZip();
  const content = await zip.loadAsync(extFile.file);
  const jsonFiles: string[] = [];
  const csvFiles: string[] = [];
  const mediaFiles: string[] = [];

  let metadataFolderExists = false;
  let jsonOrCsvFilesFound = false;

  // Iterating over all files in the zip to classify them into JSON, CSV, or media files
  Object.keys(content.files).forEach((fileName) => {
    const relativePath = fileName.split('/').slice(1).join('/');
    if (relativePath.startsWith('metadata/')) {
      metadataFolderExists = true;
      if (relativePath.endsWith('.json') || relativePath.endsWith('.csv')) {
        jsonOrCsvFilesFound = true;
        if (relativePath.endsWith('.json')) jsonFiles.push(fileName);
        if (relativePath.endsWith('.csv')) csvFiles.push(fileName);
      }
    } else if (relativePath.startsWith('media/') && SUPPORTED_IMAGE_TYPES.some((ext) => relativePath.endsWith(ext))) {
      mediaFiles.push(fileName);
    }
  });

  if (!metadataFolderExists) throw new Error(dictionary.errors.zipFileStructureIncorrect);
  if (metadataFolderExists && !jsonOrCsvFilesFound) throw new Error(dictionary.errors.zipFileWithoutJsonFiles);

  const metadataRows: SimpleMetadataRow[] = [];
  const mediaMap = new Map();

  // Processing each image inside /media folder to create a Blob URL and mapping it with its file name
  for (const fileName of mediaFiles) {
    const filePromise = await content.file(fileName)?.async('blob');
    if (filePromise) {
      const fileKey = fileName.split('/').pop()?.split('.')[0];
      if (fileKey) {
        const blobUrl = URL.createObjectURL(filePromise);
        mediaMap.set(fileKey, blobUrl);
      }
    }
  }

  // Processing JSON files to extract metadata and link to the corresponding media file if available
  for (const fullFileName of jsonFiles) {
    const filePromise = content.file(fullFileName)?.async('string');
    if (filePromise) {
      const fileData = (await filePromise).trim();
      const json = fileData ? (JSON.parse(fileData) as MetadataObject) : {};
      const fileKey = fullFileName.split('/').pop()?.split('.')[0];
      if (fileKey && mediaMap.has(fileKey)) {
        json.image = mediaMap.get(fileKey);
      }
      // Użyj SimpleMetadataRow zamiast MetadataRow
      metadataRows.push({ metadata: json, fileName: `${fileKey}.json` } as SimpleMetadataRow);
    }
  }

  // Processing CSV files to extract metadata and link to the corresponding media file if available
  for (const fullFileName of csvFiles) {
    const filePromise = content.file(fullFileName)?.async('blob');
    if (filePromise) {
      const fileBlob = await filePromise;
      const relativePath = fullFileName.split('/').slice(1).join('/');
      const extFileForCsv: ExtFile = { file: fileBlob, name: relativePath } as ExtFile;
      try {
        const csvMetadataRows = await processCsvFile(extFileForCsv);
        csvMetadataRows.forEach((row, index) => {
          const key = (index + 1).toString();
          if (mediaMap.has(key)) {
            row.metadata.image = mediaMap.get(key);
          }
        });
        metadataRows.push(...csvMetadataRows);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    }
  }

  return metadataRows;
}
