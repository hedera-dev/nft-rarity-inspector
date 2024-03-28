import { MetadataRow } from '@/utils/types/metadataRow';
import { RarityType } from '@/utils/types/rarityType';

export const findNFTRarity = (metadata: MetadataRow[], rarityType: RarityType): MetadataRow => {
  const sortedMetadata = metadata.sort((a, b) => {
    const rarityA = a.rarity ? parseFloat(a.rarity.totalRarity) : 0;
    const rarityB = b.rarity ? parseFloat(b.rarity.totalRarity) : 0;
    return rarityType === 'most-rare' ? rarityB - rarityA : rarityA - rarityB;
  });
  return sortedMetadata[0];
};
