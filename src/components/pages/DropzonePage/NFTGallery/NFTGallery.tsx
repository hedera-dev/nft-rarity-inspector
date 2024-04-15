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
import { MetadataObject } from 'hedera-nft-utilities';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTGallery/NFTItemWrapper';
import { MetadataRow } from '@/utils/types/metadataRow';
import { dictionary } from '@/libs/en';
import { Button } from '@/components/ui/button';
import { useMetadata } from '@/utils/contexts/MetadataContext';

const BATCH_SIZE = 20;

export const NFTGallery = ({ metadataRows }: { metadataRows: MetadataRow[] }) => {
  const metadataObjects: MetadataObject[] = metadataRows.map((m) => m.metadata);
  const [visibleItems, setVisibleItems] = useState(metadataRows.slice(0, BATCH_SIZE));
  const [hasMore, setHasMore] = useState<boolean>(metadataObjects.length > BATCH_SIZE);
  const { setFilters } = useMetadata();

  useEffect(() => {
    if (metadataRows.length > 0) {
      setVisibleItems(metadataRows.slice(0, BATCH_SIZE));
      setHasMore(metadataRows.length > BATCH_SIZE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadataRows.length]);

  const fetchMoreData = useCallback(() => {
    const nextItemsCount = Math.min(visibleItems.length + BATCH_SIZE, metadataRows.length);
    if (visibleItems.length >= metadataRows.length) {
      setHasMore(false);
      return;
    }
    setVisibleItems(metadataRows.slice(0, nextItemsCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.length]);

  return (
    <div id="galleryStart" className="mx-auto flex justify-center">
      {metadataRows.length > 0 ? (
        <InfiniteScroll dataLength={visibleItems.length} next={fetchMoreData} hasMore={hasMore} loader={<></>}>
          <div className="grid w-full grid-cols-2 gap-4 px-0 pb-4 sm:grid-cols-2 sm:px-4 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((item, index) => (
              <NFTItemWrapper
                key={`${item.fileName}-${item.rarityRank}-${item?.rarity.NFT}-${index}`}
                metadataObject={item.metadata}
                index={index}
                metadataRows={metadataRows}
                totalRarity={metadataRows[index]?.rarity?.totalRarity}
                fileName={metadataRows[index]?.fileName}
                metadataLength={metadataRows.length}
                hasNextPrevButtons={true}
                rarityRank={metadataRows[index]?.rarityRank}
                nftNumber={item.rarity.NFT}
              />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="w-full pt-4 text-center">
          <p className="mb-6 text-4xl font-semibold">{dictionary.nftGallery.noResults}</p>
          <Button onClick={() => setFilters({})} className="p-8 text-2xl">
            {dictionary.nftGallery.clearFilters}
          </Button>
        </div>
      )}
    </div>
  );
};
