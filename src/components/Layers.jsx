import React from 'react';
import { useEffect, useContext } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ArrowRightIcon, Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { IoLayers } from 'react-icons/io5';
import { MapContext } from '../context/map.context';
import { AuthContext } from '../context/auth.context';

function Layers() {
  const { isLoggedIn } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const {
    map,
    mapContainer,
    lng,
    setLng,
    lat,
    setLat,
    zoom,
    setZoom,
    tiles,
    setTiles,
    selectedTileId,
    setSelectedTileId,
    selectedTileName,
    setSelectedTileName,
    selectedTileBoundingBox,
    setSelectedTileBoundingBox,
    downloadLink,
    setDownloadLink,
    isDrawerOpen,
    setIsDrawerOpen,
    getBoundingBox,
    getTiles,
    getDownloadLink,
  } = useContext(MapContext);

  //Helper function that allows zooming to the tile selected by the user
  const zoomToFeature = () => {
    if (selectedTileBoundingBox && map.current) {
      const { minLng, minLat, maxLng, maxLat } = selectedTileBoundingBox;
      map.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 200 }
      );
    }
  };

  //Helper function that
  const removeFromList = () => {
    setSelectedTileId(null);
    setSelectedTileName(null);
    setSelectedTileBoundingBox(null);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedTileName, isDrawerOpen, onOpen, onClose]);

  return (
    <>
      <Tooltip label="Layers" fontSize="md" placement="right">
        <IconButton
          ref={btnRef}
          colorScheme="blue"
          onClick={onOpen}
          position="absolute"
          top="95px"
          left="20px"
          icon={<ArrowRightIcon />}
        ></IconButton>
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
        // zIndex={0}
      >
        <DrawerOverlay h="auto" />
        <DrawerContent
          containerProps={{
            top: '95px',
            left: '20px',
            h: '300px',
          }}
          style={{ position: 'absolute' }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={IoLayers} />
              <Text fontSize="xxl">Layers</Text>
            </HStack>
          </DrawerHeader>
          <Divider color="red" />

          <DrawerBody>
            <VStack align="stretch">
              {!isLoggedIn && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Log in to download data</AlertTitle>
                </Alert>
              )}
              {isLoggedIn && !selectedTileName && (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>No features selected</AlertTitle>
                </Alert>
              )}
              {isLoggedIn && selectedTileName && (
                <>
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
                              onClick={zoomToFeature}
                            ></IconButton>
                          </Tooltip>
                          <Tooltip label="Remove from list" fontSize="md">
                            <IconButton
                              colorScheme="blue"
                              icon={<CloseIcon />}
                              onClick={removeFromList}
                            ></IconButton>
                          </Tooltip>
                        </HStack>
                      </Stack>
                    </CardBody>
                    <CardFooter></CardFooter>
                  </Card>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Layers;
