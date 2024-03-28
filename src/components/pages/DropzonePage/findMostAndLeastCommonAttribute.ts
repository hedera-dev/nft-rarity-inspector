import { AttributeOccurrence } from '@/utils/types/attributeOccurrence';
import { MetadataRow } from '@/utils/types/metadataRow';

export const findMostAndLeastCommonAttribute = (metadata: MetadataRow[]): { mostCommon: AttributeOccurrence; leastCommon: AttributeOccurrence } => {
  const attributeOccurrences: Record<string, number> = {};

  metadata.forEach((nft) => {
    const attributes = nft.metadata['attributes'];
    if (Array.isArray(attributes)) {
      attributes.forEach((attribute) => {
        const key = `${attribute.trait_type}:${attribute.value}`;
        attributeOccurrences[key] = (attributeOccurrences[key] || 0) + 1;
      });
    }
  });

  let mostCommon: AttributeOccurrence | null = null;
  let leastCommon: AttributeOccurrence | null = null;

  Object.entries(attributeOccurrences).forEach(([key, count]) => {
    const [trait, value] = key.split(':');
    if (!mostCommon || count > mostCommon.occurrence) {
      mostCommon = { trait, value, occurrence: count };
    }
    if (!leastCommon || count < leastCommon.occurrence) {
      leastCommon = { trait, value, occurrence: count };
    }
  });

  return {
    mostCommon: mostCommon || { trait: '', value: '', occurrence: 0 },
    leastCommon: leastCommon || { trait: '', value: '', occurrence: 0 },
  };
};
