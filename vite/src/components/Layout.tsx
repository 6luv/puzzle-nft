import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { JsonRpcSigner, Contract } from "ethers";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import mintContractAbi from "../lib/mintContractAbi.json";
import { mintContractAddress } from "../lib/contractAddress";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  mintContract: Contract | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>();

  useEffect(() => {
    if (!signer) return;
    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
  }, [signer]);

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
        <Outlet context={{ signer, setSigner, mintContract }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
