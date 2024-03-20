import React from 'react';
import { useEffect, useContext } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
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
    selectedTileId,
    setSelectedTileId,
    selectedTileName,
    setSelectedTileName,
    selectedTileBoundingBox,
    setSelectedTileBoundingBox,
    isDrawerOpen,
    addToCart,
    selectedTiles,
    setSelectedTiles,
    cartItems,
    setCartItems,
  } = useContext(MapContext);

  //Helper function that allows zooming to the tile selected by the user
  const zoomToFeature = tileId => {
    const selectedTile = selectedTiles.find(tile => tile.id === tileId);
    if (selectedTile && selectedTile.geom && map.current) {
      let minLat = 90;
      let minLng = 180;
      let maxLat = -90;
      let maxLng = -180;
      selectedTile.geom.forEach(point => {
        const [lng, lat] = point;
        minLat = Math.min(minLat, lat);
        minLng = Math.min(minLng, lng);
        maxLat = Math.max(maxLat, lat);
        maxLng = Math.max(maxLng, lng);
      });
      map.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 200 }
      );
    }
  };

  //Helper function that removes a selected tile from the list
  const removeFromList = tileId => {
    // Filter out the selected tile from selectedTiles array
    const updatedSelectedTiles = selectedTiles.filter(
      tile => tile.id !== tileId
    );
    setSelectedTiles(updatedSelectedTiles);
  };

  const drawerContentHeight = selectedTiles.length * 50 + 250;

  useEffect(() => {
    if (isDrawerOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedTiles, isDrawerOpen, onOpen, onClose]);

  // Function to toggle the selected state of a tile
  const toggleTileSelection = tileId => {
    setSelectedTiles(prevSelectedTiles => {
      return prevSelectedTiles.map(tile => {
        if (tile.id === tileId) {
          return {
            ...tile,
            selected: !tile.selected, // Toggle the selected property
          };
        }
        return tile;
      });
    });
  };

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
      >
        <DrawerOverlay h="auto" />
        <DrawerContent
          containerProps={{
            top: '95px',
            left: '20px',
            height: `${drawerContentHeight}px`,
            maxHeight: '100vh',
            overflowY: 'auto',
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
              {isLoggedIn && selectedTiles.length === 0 && (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>No features selected</AlertTitle>
                </Alert>
              )}
              {isLoggedIn && selectedTiles.length > 0 && (
                <>
                  <Button colorScheme="blue" onClick={addToCart}>
                    <Icon as={IoLayers} />
                    Add to cart
                  </Button>
                  <Checkbox>Select all / none</Checkbox>
                  <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4">
                    <CardBody width="100%">
                      {selectedTiles.map(tile => (
                        <Box key={tile.id} h="auto">
                          <VStack alignItems="left">
                            <HStack marginBottom="10px">
                              <Checkbox
                                defaultChecked
                                isChecked={tile.selected}
                                onChange={() => toggleTileSelection(tile.id)}
                              >
                                <Text>{tile.name}</Text>
                              </Checkbox>
                              <Spacer />
                              <Tooltip label="Zoom to feature" fontSize="md">
                                <IconButton
                                  colorScheme="blue"
                                  icon={<Search2Icon />}
                                  onClick={() => zoomToFeature(tile.id)}
                                ></IconButton>
                              </Tooltip>
                              <Tooltip label="Remove from list" fontSize="md">
                                <IconButton
                                  colorScheme="blue"
                                  icon={<CloseIcon />}
                                  onClick={() => removeFromList(tile.id)}
                                ></IconButton>
                              </Tooltip>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                      {/* <Checkbox defaultChecked>
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
                          </Tooltip> */}
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
