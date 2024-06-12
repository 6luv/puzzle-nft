import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useMetamaskLogin } from "../lib";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const Sale: FC = () => {
  const { signer, setSigner } = useOutletContext<OutletContext>();

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
        <Flex>Sale</Flex>
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

export default Sale;
