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
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@dropzone-ui/react';
import type { ExtFile } from '@dropzone-ui/react';
import { calculateRarityFromData } from 'hedera-nft-utilities/src/rarity';
import { SUPPORTED_FILE_TYPES_ARRAY, supportedFileTypes } from '@/components/pages/DropzonePage/utils/supportedFileTypes';
import { dictionary } from '@/libs/en';
import { NFTGallery } from '@/components/pages/DropzonePage/NFTGallery/NFTGallery';
import { processZipFile } from '@/components/pages/DropzonePage/file-management/processZipFile';
import SpinnerLoader from '@/components/ui/loader';
import { NFTStatsDisplay } from '@/components/pages/DropzonePage/NFTStatsDisplay/NFTStatsDisplay';
import { NFTSorting } from '@/components/pages/DropzonePage/NFTGallery/NFTSorting';
import { useMetadata } from '@/utils/contexts/MetadataContext';
import { NFTFiltering } from '@/components/pages/DropzonePage/NFTGallery/NFTFiltering';

export default function DropzonePage() {
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [error, setError] = useState<string>('');
  const [isSticky, setIsSticky] = useState(false);
  const [fileLoading, setIsFileLoading] = useState<boolean>(false);
  const { metadata, setMetadata, sorting, filteredAndSortedMetadata, filteredAndSortedMetadataLength } = useMetadata();

  const readFile = async (extFile: ExtFile) => {
    setIsFileLoading(true);
    setMetadata([]);
    setError('');

    if (!extFile.file) {
      setIsFileLoading(false);
      return;
    }

    if (extFile.file.type === 'application/zip' || extFile.file.name.endsWith('.zip')) {
      try {
        const newMetadata = await processZipFile(extFile);
        // This sorting is used because ZIP files don't keep files in order, so it makes sure everything is listed alphabetically
        const sortedMetadataWithoutRarity = newMetadata.sort((a, b) =>
          a.fileName.localeCompare(b.fileName, undefined, { numeric: true, sensitivity: 'base' }),
        );

        const rarityResults = calculateRarityFromData(sortedMetadataWithoutRarity.map((item) => item.metadata));
        const metadataWithRarity = newMetadata.map((metadataRow, index) => ({
          ...metadataRow,
          rarity: rarityResults[index],
        }));

        const sortedByRarity = metadataWithRarity.sort((a, b) => parseFloat(b.rarity.totalRarity) - parseFloat(a.rarity.totalRarity));

        const updatedMetadataWithRarityRank = sortedByRarity.map((metadataRow, index) => ({
          ...metadataRow,
          rarityRank: index + 1,
        }));

        setMetadata(updatedMetadataWithRarityRank);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        setIsFileLoading(false);
      } finally {
        setIsFileLoading(false);
      }
    } else {
      setError(dictionary.errors.unsupportedFileType);
      setIsFileLoading(false);
      return;
    }
  };

  const updateFilesReplace = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  useEffect(() => {
    if (files.length > 0) {
      void readFile(files[0]);
    }
  }, [files]);

  useEffect(() => {
    const handleScroll = () => {
      const sortingBar = document.querySelector('.sorting-bar');
      if (sortingBar) setIsSticky(sortingBar.getBoundingClientRect().top <= 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto">
      <div className="relative mx-auto flex max-w-[600px] flex-col items-center justify-center">
        <h1 className="mt-20 scroll-m-20 text-center text-[28px] font-extrabold tracking-tight sm:text-4xl md:text-5xl">{dictionary.header.title}</h1>
        <p className="mb-10 text-center text-[12px] leading-7 sm:text-[14px] md:text-[16px] [&:not(:first-child)]:mt-6">
          {dictionary.header.description}
        </p>
        <Dropzone
          onChange={updateFilesReplace}
          accept={supportedFileTypes()}
          header={false}
          footer={false}
          label={dictionary.dropzone.description}
          behaviour="replace"
          max={1}
          className="dropzone-label"
        >
          {files.length > 0 &&
            files.map((file) => (
              <FileMosaic
                key={file.id}
                {...file}
                valid={SUPPORTED_FILE_TYPES_ARRAY.some((type) => file.file?.name.endsWith(type)) ? undefined : false}
                className="dropzone-label"
                progress={55}
              />
            ))}
        </Dropzone>
        {error && <span className="mt-2 text-center font-bold text-red-500">{error}</span>}
      </div>
      {metadata.length === 0 && fileLoading && (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <SpinnerLoader />
        </div>
      )}
      {metadata.length > 0 && !fileLoading && (
        <div className="my-10">
          <NFTStatsDisplay metadata={metadata} />

          <div
            className={`sorting-bar sticky top-0 z-10 flex h-[50px] w-full items-center overflow-x-hidden bg-white transition duration-200 ${isSticky ? 'border-b-2 border-b-slate-500 shadow-md' : ''} pl-9 pr-12`}
          >
            <p>
              {dictionary.nftGallery.results}: <span className="font-semibold">{filteredAndSortedMetadataLength}</span>
            </p>
            <NFTSorting />
          </div>
          <div className="flex px-3 sm:px-5 lg:px-8">
            <NFTFiltering />
            <NFTGallery key={sorting} metadataRows={filteredAndSortedMetadata} />
          </div>
        </div>
      )}
    </div>
  );
}
