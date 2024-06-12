import { Box, Flex, Grid, Image, Progress, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
  const [mintedList, setMintedList] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.balanceOfNfts(signer.address);
      const temp = response.map((v: bigint) => Number(v));
      setMintedList(temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => {
    if (mintedList.length === 0) return;

    const temp = mintedList.filter((v) => {
      if (v) {
        return v;
      }
    });

    setProgress((temp.length / mintedList.length) * 100);
  }, [mintedList]);

  useEffect(() => console.log(progress), [progress]);

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
        <Text>바다를 구해주세요!</Text>
      </Flex>
      <Flex
        flexDir="column"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
        border="2px"
        borderColor="gray.200"
        boxShadow="2xl"
        rounded="lg"
      >
        {signer ? (
          <>
            <Flex flexDir="column" alignItems="center">
              <Text mb={2} fontSize={[16, 20, 20]}>
                {progress}%
              </Text>
              <Progress
                value={progress}
                h={4}
                w={[304, 384, 490]}
                mb={[4, 4, 8]}
                rounded="md"
                colorScheme="blue"
              />
            </Flex>
            <Grid templateColumns={"repeat(4, 1fr)"} border="1px">
              {mintedList.map((v, i) => (
                <PuzzleCard key={i} index={i} balance={v} />
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Flex flexDir="column" alignItems="center">
              <Text mb={2} fontSize={[16, 20, 20]}>
                0%
              </Text>
              <Progress
                value={0}
                h={4}
                w={[304, 384, 490]}
                mb={[4, 4, 8]}
                rounded="md"
                colorScheme="blue"
              />
            </Flex>
            <Box pos="relative" w={[320, 400, 512]}>
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
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
