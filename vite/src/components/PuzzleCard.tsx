import { Box, Grid, Image } from "@chakra-ui/react";
import { FC } from "react";

interface PuzzleCardProps {
  index: number;
  balance: number;
}

const PuzzleCard: FC<PuzzleCardProps> = ({ index, balance }) => {
  return (
    <Grid pos="relative" w={[20, 28, 32]} h={[20, 28, 32]}>
      {!balance && (
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
