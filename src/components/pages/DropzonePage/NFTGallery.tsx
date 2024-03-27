/*-
 *
 * Hedera NFT Rarity Inspector
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
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCallback, useEffect, useState } from 'react';
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTItemWrapper';
import { MetadataRow } from '@/utils/types/metadataRow';

const BATCH_SIZE = 20;

interface NFTGalleryProps {
  metadataRows: MetadataRow[];
}

export const NFTGallery = ({ metadataRows }: NFTGalleryProps) => {
  const metadataObjects = metadataRows.map((m) => m.metadata);
  const [visibleItems, setVisibleItems] = useState(metadataObjects.slice(0, BATCH_SIZE));
  const [hasMore, setHasMore] = useState(metadataObjects.length > BATCH_SIZE);

  useEffect(() => {
    setVisibleItems(metadataObjects.slice(0, BATCH_SIZE));
    setHasMore(metadataRows.length > BATCH_SIZE);
  }, [metadataRows.length]);

  const fetchMoreData = useCallback(() => {
    const nextItemsCount = Math.min(visibleItems.length + BATCH_SIZE, metadataRows.length);

    if (visibleItems.length >= metadataRows.length) {
      setHasMore(false);
      return;
    }

    setVisibleItems(metadataObjects.slice(0, nextItemsCount));
  }, [visibleItems.length]);

  return (
    <InfiniteScroll dataLength={visibleItems.length} next={fetchMoreData} hasMore={hasMore} loader={<></>}>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visibleItems.map((item, index) => (
          <NFTItemWrapper key={index} singleMetadataObject={item} index={index} metadataRows={metadataRows} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
