import {
  Button,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { useMetamaskLogin } from "../lib";
import axios from "axios";

const Mint: FC = () => {
  const [tokenId, setTokenId] = useState<number>(1);
  const [amount, setAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const onClickMintNft = async () => {
    try {
      setIsLoading(true);
      if (!mintContract || !tokenId || !amount) return;

      const response = await mintContract?.mintNft(tokenId, amount);
      await response.wait();

      const axiosResponse = await axios.get<INftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );
      console.log(axiosResponse);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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
        <Flex flexDir="column" alignItems="center" gap={4} px={4}>
          <Image
            w={[60, 60, 80]}
            mb={4}
            border="2px"
            borderColor="gray.200"
            boxShadow="xl"
            rounded="lg"
            src={`/images/puzzle/${tokenId}.png`}
            alt={`Save the SEA #${tokenId}`}
          />

          <Flex alignItems="center" gap={6}>
            <Text fontWeight="semibold" fontSize="lg">
              NFT ID
            </Text>
            <NumberInput
              size="lg"
              value={tokenId}
              onChange={(v) => setTokenId(Number(v))}
              defaultValue={1}
              min={1}
              max={16}
              w={[180, 180, 200]}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Text fontWeight="semibold" fontSize="lg">
              Amount
            </Text>
            <NumberInput
              size="lg"
              value={amount}
              onChange={(v) => setAmount(Number(v))}
              defaultValue={0}
              min={0}
              max={100}
              w={[180, 180, 200]}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button
            w="full"
            textColor="blue.500"
            bgColor="white"
            border="1px"
            onClick={onClickMintNft}
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Minting"
          >
            Minting
          </Button>
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

export default Mint;
