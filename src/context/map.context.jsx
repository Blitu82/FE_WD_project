import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const MapContext = createContext();

const MapProviderWrapper = props => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const storedToken = localStorage.getItem('authToken');
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-17.57813);
  const [lat, setLat] = useState(34.727);
  const [zoom, setZoom] = useState(4.5);
  const [tiles, setTiles] = useState(null);
  const [selectedTileBoundingBox, setSelectedTileBoundingBox] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();

  const cartSucessToast = () => {
    toast({
      title: 'Added to cart.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const cartErrorToast = () => {
    toast({
      title: 'This feature is already in the cart.',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  // Helper function to add items to the Shopping Cart
  const addToCart = () => {
    const selectedItems = selectedTiles.filter(tile => tile.selected);
    setCartItems(selectedItems);
    cartSucessToast();
  };

  // Helper function to remove items from the Shopping Cart
  function removeFromCart(item) {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item);
    setCartItems(updatedCartItems);
  }

  // Helper function to get the total number of items in the Shopping Cart
  function getCartTotal() {
    return cartItems.length;
  }

  // Helper function to clear the Shopping Cart
  function clearCart() {
    setCartItems([]);
    setDownloadLink(null);
  }

  // Helper function used to get the bounding box coordinates of the tiles selected by the user.

  function getBoundingBox(geometryArray) {
    let minLat = 90;
    let minLng = 180;
    let maxLat = -90;
    let maxLng = -180;
    for (let i = 0; i < geometryArray.length; i++) {
      const point = geometryArray[i];
      minLat = Math.min(minLat, point[1]);
      minLng = Math.min(minLng, point[0]);
      maxLat = Math.max(maxLat, point[1]);
      maxLng = Math.max(maxLng, point[0]);
    }
    return {
      minLat: minLat,
      minLng: minLng,
      maxLat: maxLat,
      maxLng: maxLng,
    };
  }

  // Async function to get all tiles from the backend API.
  async function getTiles() {
    try {
      const response = await axios.get(`${API_URL}/api/grid`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = response.data;
      const polygons = data.map(item => ({
        type: 'Feature',
        geometry: item.location,
        properties: {
          id: item._id,
          name: item.tile,
        },
      }));
      const geoJson = {
        type: 'FeatureCollection',
        features: polygons,
      };
      setTiles(geoJson);
    } catch (error) {
      console.error('Error getting tiles:', error);
    }
  }

  useEffect(() => {
    getTiles();
  }, []);

  // Helper function to automatically trigger the download of the products.
  const triggerDownloadLink = downloadLink => {
    const anchor = document.createElement('a');
    anchor.href = downloadLink;
    anchor.download = '';
    anchor.click();
  };

  // Async function to get the coverage download link from GeoServer
  async function getDownloadLink(bbox) {
    try {
      if (bbox && Object.keys(bbox).length > 0) {
        const response = await axios.get(`${API_URL}/api/download`, {
          params: bbox,
        });
        const downloadLink = response.data.downloadLink;
        setDownloadLink(downloadLink);
        triggerDownloadLink(downloadLink);
      } else {
        console.error('Selected tile bounding box is empty.');
      }
    } catch (error) {
      console.error('An error occurred downloading the coverage:', error);
    }
  }

  // useEffect(() => {
  //   if (selectedTileBoundingBox) {
  //     getDownloadLink(selectedTileBoundingBox);
  //   }
  // }, [selectedTileBoundingBox]);

  return (
    <MapContext.Provider
      value={{
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
        downloadLink,
        setDownloadLink,
        isDrawerOpen,
        setIsDrawerOpen,
        getBoundingBox,
        getTiles,
        getDownloadLink,
        selectedTiles,
        setSelectedTiles,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export { MapContext, MapProviderWrapper };
