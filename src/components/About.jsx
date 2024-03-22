import { RiInformationFill } from 'react-icons/ri';
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="About" fontSize="md">
        <span>
          <IconButton
            bg="#222"
            color="white"
            colorScheme="black"
            size="sm"
            aria-label="Feedback"
            as={RiInformationFill}
            onClick={() => {
              onOpen();
            }}
          />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <HStack as="header" justifyContent="center" m="8" spacing="5">
            <Icon as={RiInformationFill} boxSize="36px"></Icon>
            <Text as="h1" fontSize="24px">
              About
            </Text>
          </HStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <ModalBody>
              <Stack>
                <FormControl mb="10px">
                  <FormLabel size="sm">About this data:</FormLabel>
                  <Text borderColor="#d8dee4" size="sm" borderRadius="6px">
                    A OnlyMaps Package is a ZIP file containing a collection of
                    GEBCO datasets to ease the download of large amounts of high
                    resolution data. The OnlyMaps products are for
                    non-navigational use only. For more information regarding
                    these products, please refer to the GEBCO Data Portal. Click
                    here to access:
                    <Text>
                      <Link
                        href="https://www.gebco.net/data_and_products/gridded_bathymetry_data/"
                        isExternal
                      >
                        https://www.gebco.net/data_and_products/gridded_bathymetry_data/
                      </Link>
                    </Text>
                    <Text>
                      OnlyMaps database was last updated: March 5th, 2024
                    </Text>
                  </Text>
                </FormControl>
              </Stack>
            </ModalBody>
          </Card>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default About;
