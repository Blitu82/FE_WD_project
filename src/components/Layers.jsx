import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Input,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { IoLayers } from 'react-icons/io5';

function Layers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="blue"
        onClick={onOpen}
        position="absolute"
        icon={<ArrowRightIcon />}
      ></IconButton>
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
            <Icon as={IoLayers} />
            Layers
          </DrawerHeader>

          <DrawerBody>
            <Card
              bg="#f6f8fa"
              variant="outline"
              borderColor="#d8dee4"
              mx="10px"
            >
              <CardBody>
                <Stack>
                  <Text>SomeText</Text>
                  <Text>Some more text</Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Layers;
