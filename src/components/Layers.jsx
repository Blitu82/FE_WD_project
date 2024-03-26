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
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ArrowRightIcon, Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { IoLayers } from 'react-icons/io5';
import { MapContext } from '../context/map.context';
import { AuthContext } from '../context/auth.context';

function Layers() {
  const { isLoggedIn } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { map, isDrawerOpen, addToCart, selectedTiles, setSelectedTiles } =
    useContext(MapContext);

  // Determine the placement of the Drawer base on screen size
  const drawerPlacement = useBreakpointValue({ base: 'bottom', lg: 'left' });

  //Helper function that allows zooming to the tile selected by the user.
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

  //Helper function that removes a selected tile from the list.
  const removeFromList = tileId => {
    const updatedSelectedTiles = selectedTiles.filter(
      tile => tile.id !== tileId
    );
    setSelectedTiles(updatedSelectedTiles);
  };

  // Helper function to toggle the selected state of a tile.
  const toggleTileSelection = tileId => {
    setSelectedTiles(prevSelectedTiles => {
      return prevSelectedTiles.map(tile => {
        if (tile.id === tileId) {
          return {
            ...tile,
            selected: !tile.selected,
          };
        }
        return tile;
      });
    });
  };

  // Helper function to select all / none tiles.
  const selectAllNone = () => {
    setSelectedTiles(prevSelectedTiles => {
      return prevSelectedTiles.map(tile => {
        return {
          ...tile,
          selected: !tile.selected,
        };
      });
    });
  };

  // Variables used to change the size of the Layers drawer dynamically and enable scrolling.
  const drawerContentHeight = selectedTiles.length * 40 + 250;
  const viewportHeight = window.innerHeight - 500;

  useEffect(() => {
    if (isDrawerOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [selectedTiles, isDrawerOpen, onOpen, onClose]);

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
        placement={drawerPlacement}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay h="auto" />
        <DrawerContent
          containerProps={{
            top: useBreakpointValue({ base: 'auto', lg: '95px' }),
            left: useBreakpointValue({ base: 'auto', lg: '20px' }),
            height: `${drawerContentHeight}px`,
            width: useBreakpointValue({ base: '100%', lg: '400px' }), // bug fix: otherwise it affects the map clicks
            overflowY: useBreakpointValue({
              base: 'scroll',
              lg: `${
                drawerContentHeight > viewportHeight ? 'visible' : 'hidden'
              }`,
            }),
          }}
          style={{
            position: useBreakpointValue({ base: 'fixed', lg: 'absolute' }),
            height: useBreakpointValue({ base: 'auto', lg: '100%' }),
            bottom: useBreakpointValue({ base: '0', lg: 'auto' }),
          }}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <Icon as={IoLayers} />
              <Text fontSize="xxl">Layers</Text>
            </HStack>
          </DrawerHeader>
          <Divider />

          <DrawerBody maxHeight={`${drawerContentHeight}px`}>
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
                  <Button
                    colorScheme="blue"
                    onClick={addToCart}
                    leftIcon={<Icon as={PiShoppingCartSimpleFill} />}
                    rounded="none"
                  >
                    Add to cart
                  </Button>
                  <Checkbox
                    defaultChecked
                    onChange={selectAllNone}
                    colorScheme="blue"
                  >
                    Select all / none
                  </Checkbox>
                  <Card
                    bg="#f6f8fa"
                    variant="outline"
                    borderColor="#d8dee4"
                    rounded="none"
                  >
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
                              <Tooltip label="Zoom to feature" fontSize="sm">
                                <IconButton
                                  colorScheme="blue"
                                  icon={<Search2Icon />}
                                  onClick={() => zoomToFeature(tile.id)}
                                  size="sm"
                                ></IconButton>
                              </Tooltip>
                              <Tooltip label="Remove from list" fontSize="sm">
                                <IconButton
                                  colorScheme="blue"
                                  icon={<CloseIcon />}
                                  onClick={() => removeFromList(tile.id)}
                                  size="sm"
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Layers;
