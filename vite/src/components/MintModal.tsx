import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  stsNftMetadata: IStsNftMetadata | undefined;
}

const MintModal: FC<MintModalProps> = ({ isOpen, onClose, stsNftMetadata }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save the SEA</ModalHeader>
        <ModalBody display="flex" flexDir="column" alignItems="center">
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
              x{stsNftMetadata?.amount}
            </Text>
            <Image
              w={[60, 60, 72]}
              border="2px"
              borderColor="gray.200"
              boxShadow="xl"
              rounded="lg"
              src={`/images/puzzle/${stsNftMetadata?.tokenId}.png`}
              alt={stsNftMetadata?.name}
            />
          </Box>
          <Text fontSize={[20, 24, 24]} fontWeight="semibold" mt={8}>
            {stsNftMetadata?.name}
          </Text>
          <Text fontSize={[16, 20, 20]}>{stsNftMetadata?.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button textColor="blue.500" bgColor="white" mr={3} onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
