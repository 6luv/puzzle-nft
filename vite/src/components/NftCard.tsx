import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";

interface NftCardProps {
  tokenId: number;
  amount: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId, amount }) => {
  const [stsNftMetadata, setStsNftMetadata] = useState<IStsNftMetadata>();
  const { mintContract } = useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !tokenId) return;

      const response = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setStsNftMetadata({
        ...response.data,
        tokenId,
        amount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, []);

  useEffect(() => console.log(stsNftMetadata), [stsNftMetadata]);

  return (
    <GridItem display="flex" flexDir="column" alignItems="center">
      <Box pos="relative">
        <Text
          pos="absolute"
          top={2}
          right={4}
          fontSize={20}
          fontWeight="semibold"
          bgColor="rgba(255, 255, 255, 0.7)"
          rounded="lg"
          px={1}
        >
          x{amount}
        </Text>
        <Image
          w={[60, 60, 72]}
          border="2px"
          borderColor="gray.200"
          boxShadow="xl"
          rounded="lg"
          src={`/images/puzzle/${tokenId}.png`}
          alt={`Save the SEA #${tokenId}`}
        />
      </Box>
      <Text fontSize={[16, 16, 20]} fontWeight="semibold" mt={4}>
        {stsNftMetadata?.name}
      </Text>
    </GridItem>
  );
};

export default NftCard;
