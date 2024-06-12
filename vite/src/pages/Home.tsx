import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
  const [mintedList, setMintedList] = useState<boolean[]>([]);
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.checkNfts(signer.address);
      const temp = response.map((v: boolean) => v);
      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => console.log(mintedList), [mintedList]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        border="2px"
        borderColor="gray.200"
        boxShadow="md"
        rounded="lg"
        h={[20, 20, 36]}
        justifyContent="center"
        alignItems="center"
        fontSize={[24, 24, 48]}
      >
        바다를 구해주세요!
      </Flex>
      <Flex
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        border="2px"
        borderColor="gray.200"
        boxShadow="2xl"
        rounded="lg"
      >
        {signer ? (
          <Grid templateColumns={"repeat(4, 1fr)"} border="1px">
            {mintedList.map((v, i) => (
              <PuzzleCard key={i} index={i} isMinted={v} />
            ))}
          </Grid>
        ) : (
          <Box pos="relative" w={[80, 80, 512]}>
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgColor="rgba(0, 0, 0, 0.5)"
            />
            <Image src="/images/save_the_sea.webp" alt="Save the SEA" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
