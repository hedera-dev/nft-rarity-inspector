import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';
import { MetadataRow } from '@/utils/types/metadataRow';

export const findNFTsWithAttribute = (
  metadata: MetadataRow[],
  attribute: AttributeOccurrence,
): { nftsWithAttribute: MetadataRow[]; count: number } => {
  const nftsWithAttribute = metadata.filter((nft) => {
    const attributes = nft.metadata['attributes'];
    return Array.isArray(attributes) && attributes.some((attr) => attr.trait_type === attribute.trait && attr.value === attribute.value);
  });

  return {
    nftsWithAttribute: nftsWithAttribute,
    count: nftsWithAttribute.length,
  };
};
