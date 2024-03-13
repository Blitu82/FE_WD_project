import React from 'react';
import { useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Icon,
  Input,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ArrowRightIcon, Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { IoLayers } from 'react-icons/io5';

function Layers({ downloadLink, selectedTileName, drawerIsOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  useEffect(() => {
    if (drawerIsOpen) {
      onOpen(); // Open the drawer
    } else {
      onClose(); // Close the drawer
    }
  }, [selectedTileName]);

  return (
    <>
      <Tooltip label="Layers" fontSize="md" placement="right">
        <IconButton
          ref={btnRef}
          colorScheme="blue"
          onClick={onOpen}
          position="absolute"
          top="90px"
          left="20px"
          icon={<ArrowRightIcon />}
        ></IconButton>
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={IoLayers} />
              <Text fontSize="xxl">Layers</Text>
            </HStack>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            <VStack align="stretch">
              <Button colorScheme="blue">
                <Icon as={IoLayers} />
                Add to cart
              </Button>
              <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4">
                <CardBody width="100%">
                  <Stack>
                    <HStack>
                      <Checkbox defaultChecked>
                        <Text>{selectedTileName}</Text>
                      </Checkbox>
                      <Spacer />
                      <Tooltip label="Zoom to feature" fontSize="md">
                        <IconButton
                          colorScheme="blue"
                          icon={<Search2Icon />}
                        ></IconButton>
                      </Tooltip>
                      <Tooltip label="Remove from list" fontSize="md">
                        <IconButton
                          colorScheme="blue"
                          icon={<CloseIcon />}
                        ></IconButton>
                      </Tooltip>
                    </HStack>

                    {/* <Link href={downloadLink}>Download</Link> */}
                  </Stack>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Layers;
