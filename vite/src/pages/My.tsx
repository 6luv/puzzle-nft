import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import NftCard from "../components/NftCard";
import { useMetamaskLogin } from "../lib";

const My: FC = () => {
  const [mintedList, setMintedList] = useState<number[]>([]);
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

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

  useEffect(() => console.log(mintedList), [mintedList]);

  return (
    <Flex
      flexDir="column"
      w="100%"
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderColor="gray.200"
      boxShadow="md"
      rounded="lg"
    >
      {signer ? (
        <Flex flexDir="column" w="100%" p={8}>
          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={8}
            justifyItems="center"
          >
            {mintedList.map((v, i) => {
              if (v > 0) {
                return <NftCard key={i} tokenId={i + 1} amount={v} />;
              }
            })}
          </Grid>
        </Flex>
      ) : (
        <Flex flexDir="column" gap={[2, 2, 4]} alignItems="center">
          <Text fontSize={[20, 20, 28]}>로그인 후 이용해 주세요!</Text>
          <Button
            w="fit-content"
            textColor="blue.500"
            onClick={() => useMetamaskLogin(setSigner)}
          >
            Login
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default My;
