import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MapContext = createContext();

const MapProviderWrapper = props => {
  const API_URL = 'http://localhost:5005';
  const storedToken = localStorage.getItem('authToken');
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-17.57813);
  const [lat, setLat] = useState(34.727);
  const [zoom, setZoom] = useState(4.5);
  const [tiles, setTiles] = useState(null);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [selectedTileName, setSelectedTileName] = useState(null);
  const [selectedTileBoundingBox, setSelectedTileBoundingBox] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  console.log(cartItems);

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
    setSelectedTileBoundingBox({
      minLat: minLat,
      minLng: minLng,
      maxLat: maxLat,
      maxLng: maxLng,
    });
  }

  // Async function to get all tiles from the backend API
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

  // Async function to get the coverage download link from GeoServer
  async function getDownloadLink(selectedTileBoundingBox) {
    try {
      if (Object.keys(selectedTileBoundingBox).length > 0) {
        const response = await axios.get(`${API_URL}/api/download`, {
          params: selectedTileBoundingBox,
        });
        const downloadLink = response.data.downloadLink;
        setDownloadLink(downloadLink);
      } else {
        console.error('Selected tile bounding box is empty.');
      }
    } catch (error) {
      console.error('An error occurred downloading the coverage:', error);
    }
  }

  useEffect(() => {
    if (selectedTileBoundingBox) {
      getDownloadLink(selectedTileBoundingBox);
    }
  }, [selectedTileBoundingBox]);

  // example code from https://dev.to/anne46/cart-functionality-in-react-with-context-api-2k2f
  // const addToCart = item => {
  //   const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

  //   if (isItemInCart) {
  //     setCartItems(
  //       cartItems.map(cartItem =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...item, quantity: 1 }]);
  //   }
  // };

  // const removeFromCart = item => {
  //   const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

  //   if (isItemInCart.quantity === 1) {
  //     setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  //   } else {
  //     setCartItems(
  //       cartItems.map(cartItem =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //           : cartItem
  //       )
  //     );
  //   }
  // };

  // const clearCart = () => {
  //   setCartItems([]);
  // };

  // Helper function to add items to the Shopping Cart
  function addToCart(item) {
    const isItemInCart = cartItems.find(cartItem => cartItem.item === item);
    if (isItemInCart) {
      console.log('entering found branch');
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.item === item
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      console.log('entering not found branch');
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
  }

  // Helper function to remove items from the Shopping Cart
  function removeFromCart(item) {}

  // Helper function to clear the Shopping Cart
  function clearCart() {
    console.log('cleared Cart!');
    setCartItems([]);
  }

  // Helper function to get the total number of items in the Shopping Cart
  function getCartTotal() {}

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
