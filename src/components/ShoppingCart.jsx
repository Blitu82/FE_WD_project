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
  HStack,
  IconButton,
  Image,
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
    cartItems,
    setCartItems,
    clearCart,
    getCartTotal,
    removeFromCart,
    getBoundingBox,
    getDownloadLink,
  } = useContext(MapContext);
  const [error, setError] = useState(null);
  const toast = useToast();

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

  const handleDownload = async e => {
    e.preventDefault();
    try {
      for (const item of cartItems) {
        if (item.geom) {
          await getBoundingBox(item.geom);
          await getDownloadLink(selectedTileBoundingBox);
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

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <>
      <Tooltip label="Shopping cart" fontSize="md">
        <span>
          <Box>
            <VStack>
              <Badge
                color="white"
                variant="solid"
                bgColor="#222"
                borderRadius="full"
                fontSize="xs"
                marginBottom="-3"
                zIndex={1}
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
          <ModalBody>
            {cartItems.length > 0 && (
              <>
                <Text marginBottom="10px">
                  Review the products selected for download:
                </Text>
                <Card
                  bg="#f6f8fa"
                  variant="outline"
                  borderColor="#d8dee4"
                  mx="10px"
                >
                  <CardBody width="100%">
                    {/* <ModalBody> */}
                    {cartItems.map(tile => (
                      <Box key={tile.id} h="auto">
                        <VStack alignItems="left">
                          <HStack marginBottom="10px">
                            <Checkbox defaultChecked isChecked={tile.selected}>
                              <Text>{tile.name}</Text>
                            </Checkbox>
                            <Spacer />
                            <Tooltip label="Remove from cart" fontSize="md">
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
