import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import Layers from '../components/Layers';

// Code based on https://medium.com/@gisjohnecs/part-1-web-mapping-with-mapbox-gl-react-js-7d11b50d86ec

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
const API_URL = 'http://localhost:5005';

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-16.9);
  const [lat, setLat] = useState(32.63333);
  const [zoom, setZoom] = useState(5);
  const [tiles, setTiles] = useState(null);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [selectedTileName, setSelectedTileName] = useState(null);
  const [selectedTileBoundingBox, setSelectedTileBoundingBox] = useState(null);

  // console.log(selectedTileId);
  // console.log(selectedTileName);
  // console.log(selectedTileBoundingBox);

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
      const response = await axios.get(`${API_URL}/api/grid`);
      const data = response.data;
      const polygons = data.map(item => ({
        type: 'Feature',
        geometry: item.location,
        properties: {
          id: item._id,
          name: item.name,
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

  // This effect initializes and displays the MapBox map
  // including adding controls, layers and handling user interactions.
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Map onload event
    map.current.on('load', () => {
      map.current.resize();

      // Add tile data from the backend API to the map
      map.current.addSource('tiles', {
        type: 'geojson',
        data: tiles,
      });

      // Display tile data as a new layer (type: 'fill')
      map.current.addLayer({
        id: 'tile-fill-layer',
        type: 'fill',
        source: 'tiles',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.2,
        },
      });
      // Display tile data as a new layer (type: 'line')
      map.current.addLayer({
        id: 'tile-line-layer',
        type: 'line',
        source: 'tiles',
        paint: {
          'line-color': 'red',
          'line-width': 2,
        },
      });

      // Handle click event on tiles.
      // Store selected tile Id, name and bounding box in state variables 'selectedTileId', 'selectedTileName' and 'selectedTileBoundingBox'
      map.current.on('click', 'tile-fill-layer', e => {
        const clickedTileId = e.features[0].properties.id; // Get the id of the clicked tile
        const clickedTileName = e.features[0].properties.name; // Get the name of the clicked tile
        const geometryArray = e.features[0].geometry.coordinates[0];
        if (selectedTileId === clickedTileId) {
          setSelectedTileId(null);
          setSelectedTileName(null);
        } else {
          setSelectedTileId(clickedTileId); // Set the selectedTileId state to the clicked tile id
          setSelectedTileName(clickedTileName); // Set the selectedTileId state to the clicked tile name
          getBoundingBox(geometryArray);
        }
      });

      // Add WMS data from Geoserver to the map
      map.current.addSource('wms-layer', {
        type: 'raster',
        tiles: [
          'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&transparent=true&width=512&height=512&layers=geotiffs', //works!
        ],
        tileSize: 512,
      });
      // Display WMS data from Geoserver on the map
      map.current.addLayer(
        {
          id: 'wms-layer',
          type: 'raster',
          source: 'wms-layer',
          paint: {},
        },
        'tile-fill-layer' // place wms layer under the tiles.
      );
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
    });

    //Change the cursor to a pointer when the mouse is over the tiles
    map.current.on('mouseenter', 'tile-fill-layer', e => {
      map.current.getCanvas().style.cursor = 'pointer';
      // Copy coordinates array.
      // console.log(e.features[0]);
      // const coordinates = e.features[0].geometry.coordinates.slice();
      // const properties = e.features[0].properties;
      // const popupHtml = `<strong style="color: black;">Name:</strong><p style="color: black;">${properties.name}</p><br><strong style="color: black;">Address:</strong><p style="color: black;">${properties.address}</p>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      // }

      // Populate the popup and set its coordinates
      // based on the feature found.
      // popup.setLngLat(coordinates).setHTML(popupHtml).addTo(map.current);
    });

    // Change the cursor back to a pointer when the mouse leaves the tiles
    map.current.on('mouseleave', 'tile-fill-layer', () => {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, [tiles]);

  // Modify the display properties of the tile selected by the user.
  useEffect(() => {
    if (map.current && tiles) {
      map.current.setPaintProperty('tile-fill-layer', 'fill-opacity', [
        'case',
        ['==', ['get', 'id'], selectedTileId],
        0.5,
        0.2,
      ]);
      map.current.setPaintProperty('tile-line-layer', 'line-width', [
        'case',
        ['==', ['get', 'id'], selectedTileId],
        6,
        2,
      ]);
    }
  }, [selectedTileId]);

  return (
    <>
      <Box
        ref={mapContainer}
        w="100%"
        h="100%"
        style={{ overflow: 'auto' }}
      ></Box>
      <Layers />
    </>
  );
}

export default Map;
