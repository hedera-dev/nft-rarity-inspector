import { MetadataRow } from '@/utils/types/metadataRow';
import { NFTItemWrapper } from '@/components/pages/DropzonePage/NFTItemWrapper';
import { RarityCalculation } from '@/components/pages/NFTDetailsDialog/RarityCalculation';
import { findNFTRarity } from '@/components/pages/DropzonePage/findNFTRarity';
import { findMostAndLeastCommonAttribute } from '@/components/pages/DropzonePage/findMostAndLeastCommonAttribute';
import { findNFTsWithAttribute } from '@/components/pages/DropzonePage/findNFTsWithAttribute';

interface NFTStatsDisplayProps {
  metadata: MetadataRow[];
}

export const NFTStatsDisplay: React.FC<NFTStatsDisplayProps> = ({ metadata }) => {
  const mostRareNFT = findNFTRarity(metadata, 'most-rare');
  const leastRareNFT = findNFTRarity(metadata, 'least-rare');

  const { mostCommon, leastCommon } = findMostAndLeastCommonAttribute(metadata);

  const { nftsWithAttribute: nftsWithMostCommon, count: countMostCommon } = findNFTsWithAttribute(metadata, mostCommon);
  const { nftsWithAttribute: nftsWithLeastCommon, count: countLeastCommon } = findNFTsWithAttribute(metadata, leastCommon);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 border-2 border-blue-400 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {/* <NFTItemWrapper
          singleMetadataObject={mostRareNFT.metadata}
          fileName={mostRareNFT.fileName}
          metadataLength={metadata.length}
          traitOccurence={traitOccurence}
        /> */}
        <div className="h-[100px] rounded-lg border border-red-500">Least rare NFT</div>
        <div className="h-[100px] rounded-lg border border-red-500">Most rare Attribute</div>
        <div className="h-[100px] rounded-lg border border-red-500">Least rare Attribute</div>
      </div>
      <div className="mx-auto my-10 w-1/2">
        <RarityCalculation metadataRows={metadata} />
      </div>
    </>
  );
};
