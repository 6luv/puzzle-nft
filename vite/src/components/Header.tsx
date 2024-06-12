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
import { JsonRpcSigner } from "ethers";
import { Link, useNavigate } from "react-router-dom";
import { useMetamaskLogin } from "../lib";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Mint",
    path: "/mint",
  },
  {
    name: "Sale",
    path: "/sale",
  },
];

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const navigate = useNavigate();

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
      <Link to={"/"}>
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
      </Link>
      <Flex gap={24} display={["none", "none", "flex"]}>
        {navLinks.map((v, i) => (
          <Button
            key={i}
            variant="link"
            colorScheme="blue"
            onClick={() => navigate(v.path)}
          >
            {v.name}
          </Button>
        ))}
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
          <Button
            variant="link"
            mr={4}
            onClick={() => useMetamaskLogin(setSigner)}
          >
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
              <MenuItem onClick={() => useMetamaskLogin(setSigner)}>
                Login
              </MenuItem>
            )}
            {navLinks.map((v, i) => (
              <MenuItem key={i} onClick={() => navigate(v.path)}>
                {v.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
