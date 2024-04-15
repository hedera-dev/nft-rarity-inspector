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
import { createContext, useContext, useState, ReactNode, useMemo, Dispatch, SetStateAction } from 'react';
import { MetadataRow } from '@/utils/types/metadataRow';
import { dictionary } from '@/libs/en';
import { SORTING_BAR_HEIGHT } from '@/utils/helpers/consts';

export const SERIAL_ASC = 'Serial ASC';
export const SERIAL_DESC = 'Serial DESC';
export const MOST_RARE = 'Most Rare';
export const LEAST_RARE = 'Least Rare';

export type SortingOptionsType = typeof SERIAL_ASC | typeof SERIAL_DESC | typeof MOST_RARE | typeof LEAST_RARE;

interface Filters {
  [trait: string]: string[];
}

interface MetadataContextProps {
  metadata: MetadataRow[];
  setMetadata: Dispatch<SetStateAction<MetadataRow[]>>;
  sorting: SortingOptionsType;
  setSorting: Dispatch<SetStateAction<SortingOptionsType>>;
  sortingOpen: boolean;
  setSortingOpen: Dispatch<SetStateAction<boolean>>;
  handleSort: (_selectedSorting: SortingOptionsType) => void;
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  handleFilter: (_trait: string, _value: string, _isSelected: boolean) => void;
  filteredAndSortedMetadata: MetadataRow[];
  filteredAndSortedMetadataLength: number;
  totalMetadataLength: number;
}

const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<MetadataRow[]>([]);
  const [sorting, setSorting] = useState<SortingOptionsType>(SERIAL_ASC);
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({});

  const handleFilter = (trait: string, value: string, isSelected: boolean): void => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (isSelected) {
        const updatedValues = newFilters[trait] ? [...newFilters[trait], value] : [value];
        newFilters[trait] = updatedValues;
      } else {
        if (newFilters[trait]) {
          newFilters[trait] = newFilters[trait].filter((v) => v !== value);
          if (newFilters[trait].length === 0) {
            delete newFilters[trait];
          }
        }
      }
      return newFilters;
    });
  };

  const filteredMetadata = useMemo(() => {
    return metadata.filter((item) => {
      const attributes = Array.isArray(item.metadata.attributes) ? item.metadata.attributes : [];
      return Object.entries(filters).every(([trait, values]) => {
        return attributes.some((attribute) => {
          const valueAsString = attribute.value !== undefined ? attribute.value.toString() : '';
          return values.includes(valueAsString) && attribute.trait_type === trait;
        });
      });
    });
  }, [metadata, filters]);

  const handleSort = (selectedSorting: SortingOptionsType): void => {
    setSorting(selectedSorting);
    setSortingOpen(false);

    const galleryElement = document.getElementById('galleryStart');
    if (galleryElement) {
      const galleryPosition = galleryElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: galleryPosition - SORTING_BAR_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  const filteredAndSortedMetadata = useMemo(() => {
    const sortedData = [...filteredMetadata];
    switch (sorting) {
      case SERIAL_ASC:
        sortedData.sort((a, b) => a.rarity.NFT - b.rarity.NFT);
        break;
      case SERIAL_DESC:
        sortedData.sort((a, b) => b.rarity.NFT - a.rarity.NFT);
        break;
      case MOST_RARE:
        sortedData.sort((a, b) => parseFloat(b.rarity.totalRarity) - parseFloat(a.rarity.totalRarity));
        break;
      case LEAST_RARE:
        sortedData.sort((a, b) => parseFloat(a.rarity.totalRarity) - parseFloat(b.rarity.totalRarity));
        break;
      default:
        [...filteredMetadata];
        break;
    }
    return sortedData;
  }, [filteredMetadata, sorting]);

  const filteredAndSortedMetadataLength = filteredAndSortedMetadata.length;
  const totalMetadataLength = metadata.length;

  return (
    <MetadataContext.Provider
      value={{
        metadata,
        setMetadata,
        sorting,
        setSorting,
        sortingOpen,
        setSortingOpen,
        handleSort,
        filters,
        setFilters,
        handleFilter,
        filteredAndSortedMetadata,
        filteredAndSortedMetadataLength,
        totalMetadataLength,
      }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error(dictionary.errors.metadataContextError);
  }
  return context;
};
