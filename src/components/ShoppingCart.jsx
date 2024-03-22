import { useContext, useState } from 'react';
import { MapContext } from '../context/map.context';
import imgUrl from '../assets/logo_example.png';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Icon,
} from '@chakra-ui/react';

function ShoppingCart() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cartItems,
    clearCart,
    getCartTotal,
    removeFromCart,
    getDownloadLink,
  } = useContext(MapContext);
  const [error, setError] = useState(null);

  // Helper functions to display sucess / error toasts after downloading the data.
  const downloadSucessToast = () => {
    toast({
      title: 'The products have been downloaded.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const downloadErrorToast = errorMessage => {
    toast({
      title: 'Download Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCloseModal = () => {
    onClose();
  };

  // Helper function used to download

  const handleDownload = async e => {
    e.preventDefault();
    try {
      for (const item of cartItems) {
        if (item.bbox) {
          await getDownloadLink(item.bbox);
        }
      }
      downloadSucessToast();
      handleCloseModal();
      clearCart();
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred while downloading.'
      );
      downloadErrorToast(
        error.response?.data?.message || 'An error occurred while downloading.'
      );
    }
  };

  return (
    <>
      <Tooltip label="Shopping cart" fontSize="md">
        <span>
          <Box position="relative">
            <VStack>
              <Badge
                color="white"
                variant="solid"
                bgColor="#222"
                borderRadius="full"
                fontSize="xs"
                marginBottom="-3"
                zIndex={1}
                position="absolute"
                top="-15px"
              >
                {getCartTotal()}
              </Badge>
              <IconButton
                bg="#222"
                colorScheme="black"
                size="sm"
                aria-label="Shopping Cart"
                marginTop="-1"
                zIndex={0}
                as={PiShoppingCartSimpleFill}
                onClick={() => {
                  onOpen();
                }}
              />
            </VStack>
          </Box>
        </span>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <HStack as="header" justifyContent="center" m="8" spacing="5">
            <Icon as={PiShoppingCartSimpleFill} boxSize="36px"></Icon>
            <Text as="h1" fontSize="24px">
              Shopping Cart
            </Text>
          </HStack>
          <Divider />
          <ModalBody>
            {cartItems.length > 0 && (
              <>
                <VStack align="left">
                  <Text marginBottom="10px">
                    Review the products selected for download:
                  </Text>
                  <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4">
                    <CardBody width="100%">
                      {cartItems.map(tile => (
                        <Box key={tile.id} h="auto">
                          <VStack alignItems="left">
                            <HStack marginBottom="10px">
                              <Checkbox
                                defaultChecked
                                isChecked={tile.selected}
                              >
                                <Text>{tile.name}</Text>
                              </Checkbox>
                              <Spacer />
                              <Tooltip label="Remove from cart" fontSize="sm">
                                <IconButton
                                  colorScheme="blue"
                                  icon={<DeleteIcon />}
                                  size="sm"
                                  onClick={() => removeFromCart(tile.id)}
                                ></IconButton>
                              </Tooltip>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                    </CardBody>
                  </Card>
                </VStack>
              </>
            )}
            {cartItems.length === 0 && (
              <Alert status="warning">
                <AlertIcon />
                <AlertTitle>No features selected</AlertTitle>
              </Alert>
            )}
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              {cartItems.length > 0 && (
                <>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button
                    bg="#2da44e"
                    color="white"
                    size="sm"
                    _hover={{ bg: '#2c974b' }}
                    _active={{ bg: '#298e46' }}
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShoppingCart;
