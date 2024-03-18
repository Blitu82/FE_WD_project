import { useState, useContext } from 'react';
import { MapContext } from '../context/map.context';
import imgUrl from '../assets/logo_example.png';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import {
  Button,
  Card,
  Checkbox,
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
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

function ShoppingCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedTileName,
    setSelectedTileName,
    selectedTileBoundingBox,
    setSelectedTileBoundingBox,
    downloadLink,
    setDownloadLink,
    isDrawerOpen,
    setIsDrawerOpen,
    getDownloadLink,
    cartItems,
    setCartItems,
    clearCart,
  } = useContext(MapContext);

  const toast = useToast();

  const cartSucessToast = () => {
    toast({
      title: 'You are successfully downloaded your data.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const cartErrorToast = errorMessage => {
    toast({
      title: 'Feedback Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const user = { email, password };
  //   try {
  //     // login responds with the jwt token
  //     const response = await login(user);
  //     // console.log(response.data.authToken);
  //     storeToken(response.data.authToken);
  //     authenticateUser();
  //     cartSucessToast();
  //     navigate('/');
  //   } catch (error) {
  //     setError(error.response.data.message);
  //     // console.log('Error login', error);
  //     cartErrorToast(error.response.data.message); // this error message is coming from the backend
  //     setEmail('');
  //     setPassword('');
  //   }
  // };

  const handleCloseModal = () => {
    onClose();
  };

  // From https://chakra-ui.com/docs/components/editable
  return (
    <>
      <Tooltip label="Shopping cart" fontSize="md">
        <span>
          <IconButton
            bg="#222"
            colorScheme="black"
            size="sm"
            aria-label="Shopping Cart"
            as={PiShoppingCartSimpleFill}
            onClick={() => {
              onOpen();
            }}
          />
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
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
              Shopping Cart
            </ModalHeader>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" mx="10px">
            <ModalBody>
              <Stack>
                <Checkbox defaultChecked>
                  <Text>selectedTileName1</Text>
                </Checkbox>
                <Checkbox defaultChecked>
                  <Text>selectedTileName2</Text>
                </Checkbox>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  _hover={{ bg: '#2c974b' }}
                  _active={{ bg: '#298e46' }}
                  // onClick={handleSubmit}
                >
                  Download
                </Button>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  _hover={{ bg: '#2c974b' }}
                  _active={{ bg: '#298e46' }}
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
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

export default ShoppingCart;
