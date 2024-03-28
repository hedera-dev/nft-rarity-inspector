import { MetadataRow } from '@/utils/types/metadataRow';
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTItemWrapper';
import { RarityCalculation } from '@/components/pages/NFTDetailsDialog/RarityCalculation';
import { findNFTRarity } from '@/components/pages/DropzonePage/findNFTRarity';
import { findMostAndLeastCommonAttribute } from '@/components/pages/DropzonePage/findMostAndLeastCommonAttribute';
import { findNFTsWithAttribute } from '@/components/pages/DropzonePage/findNFTsWithAttribute';
import { calculateTraitOccurrenceFromData } from 'hedera-nft-utilities/src/rarity';

interface NFTStatsDisplayProps {
  metadata: MetadataRow[];
}

export const NFTStatsDisplay: React.FC<NFTStatsDisplayProps> = ({ metadata }) => {
  const traitOccurrence = calculateTraitOccurrenceFromData(metadata.map((m) => m.metadata));
  const mostRareNFT = findNFTRarity(metadata, 'most-rare');
  const leastRareNFT = findNFTRarity(metadata, 'least-rare');
  const { mostCommon, leastCommon } = findMostAndLeastCommonAttribute(metadata);
  const { nftsWithAttribute: nftsWithLeastRareAttribute, count: countMostCommon } = findNFTsWithAttribute(metadata, mostCommon);
  const { nftsWithAttribute: nftsWithMostRareAttribute, count: countLeastCommon } = findNFTsWithAttribute(metadata, leastCommon);

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="w-[75%] text-center">
          <NFTItemWrapper
            index={mostRareNFT.rarity.NFT - 1}
            metadataObject={mostRareNFT.metadata}
            totalRarity={mostRareNFT.rarity.totalRarity}
            fileName={mostRareNFT.fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={mostRareNFT.rarityRank}
          />
          <p className="p-2 font-semibold">MOST RARE NFT</p>
        </div>

        <div className="w-[75%] text-center">
          <NFTItemWrapper
            index={leastRareNFT.rarity.NFT - 1}
            metadataObject={leastRareNFT.metadata}
            totalRarity={leastRareNFT.rarity.totalRarity}
            fileName={leastRareNFT.fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={leastRareNFT.rarityRank}
          />
          <p className="p-2 font-semibold">MOST COMMON NFT</p>
        </div>
        <div className="w-[75%] text-center">
          <NFTItemWrapper
            index={nftsWithMostRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithMostRareAttribute[0].metadata}
            totalRarity={nftsWithMostRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithMostRareAttribute[0].fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithMostRareAttribute[0].rarityRank}
          />
          <p className="p-2 font-semibold">MOST RARE ATTRIBUTE</p>
          <p className="p-2 font-semibold">Used in {countLeastCommon} NFTs</p>
        </div>
        <div className="w-[75%] text-center">
          <NFTItemWrapper
            index={nftsWithLeastRareAttribute[0].rarity.NFT - 1}
            metadataObject={nftsWithLeastRareAttribute[0].metadata}
            totalRarity={nftsWithLeastRareAttribute[0].rarity.totalRarity}
            fileName={nftsWithLeastRareAttribute[0].fileName}
            metadataLength={metadata.length}
            traitOccurrence={traitOccurrence}
            hasNextPrevButtons={false}
            metadataRows={metadata}
            rarityRank={nftsWithLeastRareAttribute[0].rarityRank}
          />
          <p className="p-2 font-semibold">MOST COMMON ATTRIBUTE</p>
          <p className="p-2 font-semibold">Used in {countMostCommon} NFTs</p>
        </div>
      </div>
      <div className="mx-auto my-10 w-1/2">
        <RarityCalculation metadataRows={metadata} />
      </div>
    </>
  );
};
