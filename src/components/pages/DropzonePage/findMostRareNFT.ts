import { MetadataRow } from '@/utils/types/metadataRow';

export const findMostRareNFT = (metadata: MetadataRow[]): MetadataRow | undefined => {
  return metadata.sort((a, b) => {
    const rarityA = a.rarity ? parseFloat(a.rarity.totalRarity) : 0;
    const rarityB = b.rarity ? parseFloat(b.rarity.totalRarity) : 0;
    return rarityA - rarityB;
  })[0];
};
