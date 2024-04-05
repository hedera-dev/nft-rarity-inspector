import { createContext, useContext, useState, ReactNode, useMemo, Dispatch, SetStateAction } from 'react';
import { MetadataRow } from '@/utils/types/metadataRow';
import { dictionary } from '@/libs/en';

export const SERIAL_ASC = 'Serial ASC';
export const SERIAL_DESC = 'Serial DESC';
export const MOST_RARE = 'Most Rare';
export const LEAST_RARE = 'Least Rare';

export type SortingOptionsType = typeof SERIAL_ASC | typeof SERIAL_DESC | typeof MOST_RARE | typeof LEAST_RARE;

interface MetadataContextType {
  metadata: MetadataRow[];
  setMetadata: Dispatch<SetStateAction<MetadataRow[]>>;
  sorting: SortingOptionsType;
  setSorting: Dispatch<SetStateAction<SortingOptionsType>>;
  sortedMetadata: MetadataRow[];
  sortingOpen: boolean;
  setSortingOpen: Dispatch<SetStateAction<boolean>>;
  handleSort: (_selectedSorting: SortingOptionsType) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
  const [metadata, setMetadata] = useState<MetadataRow[]>([]);
  const [sorting, setSorting] = useState<SortingOptionsType>(SERIAL_ASC);
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);

  const handleSort = (selectedSorting: SortingOptionsType): void => {
    setSorting(selectedSorting);
    setSortingOpen(false);
  };

  const sortedMetadata = useMemo(() => {
    const sortedData = [...metadata];
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
        [...metadata];
        break;
    }
    return sortedData;
  }, [metadata, sorting]);

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata, sorting, setSorting, sortedMetadata, sortingOpen, setSortingOpen, handleSort }}>
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
