import { Box, Grid, Image } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import axios from "axios";

interface PuzzleCardProps {
  index: number;
  isMinted: boolean;
}

const PuzzleCard: FC<PuzzleCardProps> = ({ index, isMinted }) => {
  const [nftMetadata, setNftMetadata] = useState<INftMetadata>();

  const getNftMetadata = async () => {
    try {
      const response = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}${index + 1}.json`
      );

      setNftMetadata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  useEffect(() => console.log(nftMetadata), [nftMetadata]);

  return (
    <Grid pos="relative" w={[20, 28, 32]} h={[20, 28, 32]}>
      {!isMinted && (
        <Box
          pos="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgColor="rgba(0, 0, 0, 0.5)"
          border="1px"
        />
      )}
      <Image
        src={`/images/puzzle/${index + 1}.png`}
        alt={`Save the SEA #${index + 1}`}
      />
    </Grid>
  );
};

export default PuzzleCard;
