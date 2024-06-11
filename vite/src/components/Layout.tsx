import { Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { JsonRpcSigner } from "ethers";

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  return (
    <Flex
      maxW={1280}
      mx="auto"
      minH="90vh"
      flexDir="column"
      border="2px"
      borderColor="gray.200"
      boxShadow="2xl"
      rounded="lg"
      my={8}
    >
      <Header signer={signer} setSigner={setSigner} />
      <Flex flexGrow={1}>
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
