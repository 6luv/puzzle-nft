import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { JsonRpcSigner, ethers } from "ethers";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

  const onClickMetamaskLogin = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickMetamaskLogout = () => {
    setSigner(null);
  };

  return (
    <Flex
      h={16}
      borderBottom="2px"
      borderColor="gray.200"
      alignItems="center"
      justifyContent="space-between"
      rounded="lg"
    >
      <Flex
        w={36}
        fontWeight="bold"
        fontSize={20}
        ml={4}
        borderRight="2px"
        borderColor="gray.200"
      >
        Save the SEA
      </Flex>
      <Flex gap={24} display={["none", "none", "flex"]}>
        <Button variant="link" colorScheme="blue" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => navigate("/mint")}
        >
          Mint
        </Button>
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => navigate("/sale")}
        >
          Sale
        </Button>
      </Flex>
      <Flex w={40} justifyContent="end" display={["none", "none", "flex"]}>
        {signer ? (
          <Menu>
            <MenuButton
              textColor="gray.500"
              bgColor="white"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {signer
                ? `${signer.address.substring(
                    0,
                    5
                  )}...${signer.address.substring(signer.address.length - 4)}`
                : "Menu"}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickMetamaskLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button variant="link" mr={4} onClick={onClickMetamaskLogin}>
            Login
          </Button>
        )}
      </Flex>
      <Flex display={["flex", "flex", "none"]} mr={4}>
        <Menu>
          <MenuButton
            textColor="blue.500"
            bgColor="white"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {signer
              ? `${signer.address.substring(0, 5)}...${signer.address.substring(
                  signer.address.length - 4
                )}`
              : "Menu"}
          </MenuButton>
          <MenuList>
            {signer ? (
              <MenuItem onClick={onClickMetamaskLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={onClickMetamaskLogin}>Login</MenuItem>
            )}
            <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
            <MenuItem onClick={() => navigate("/mint")}>Mint</MenuItem>
            <MenuItem onClick={() => navigate("/sale")}>Sale</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
