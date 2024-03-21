import imgUrl from '../assets/logo_example.png';
import { RiInformationFill } from 'react-icons/ri';
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Tooltip,
  useDisclosure,
  VStack,
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
          <VStack as="header" spacing="0.1" mt="8">
            <Image boxSize="40px" src={imgUrl} alt="logo"></Image>
            <ModalHeader
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5px"
            >
              About
            </ModalHeader>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <ModalBody>
              <Stack>
                <FormControl mb="10px">
                  <FormLabel size="sm">About this data:</FormLabel>
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
