import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useToast, Box, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

// Code based on https://medium.com/@gisjohnecs/part-1-web-mapping-with-mapbox-gl-react-js-7d11b50d86ec

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;
const API_URL = 'http://localhost:5005';

function Map() {
  // State variables:
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-16.9);
  const [lat, setLat] = useState(32.63333);
  const [zoom, setZoom] = useState(5);
  const [tiles, setTiles] = useState(null);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [selectedTileName, setSelectedTileName] = useState(null);
  console.log(selectedTileId);
  console.log(selectedTileName);

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

  // Async function to download coverage from GeoServer
  async function downloadGrid() {
    try {
      const response = await axios.get(`${API_URL}/api/download`);
      console.log(response);

      // Extract download link from response data
      const downloadLink = response.data.downloadLink;
      console.log(downloadLink);

      // Redirect to the download link
      // window.location.href = downloadLink;
    } catch (error) {
      console.error('An error occurred downloading the coverage:', error);
    }
  }

  useEffect(() => {
    downloadGrid();
  }, []);

  useEffect(() => {
    getTiles();
  }, []);

  // This effect initializes and displays the MapBox map, including adding controls, layers and handling user interactions.
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

      // Add tile data as a new layer ('tile-fill-layer')
      map.current.addLayer({
        id: 'tile-fill-layer',
        type: 'fill',
        source: 'tiles',
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.2,
        },
      });
      // Add tile data as a new layer ('tile-line-layer')
      map.current.addLayer({
        id: 'tile-line-layer',
        type: 'line',
        source: 'tiles',
        paint: {
          'line-color': 'red',
          'line-width': 2,
        },
      });

      // Handle click event on tiles. Store selected tile Id and name in state variables 'selectedTileId' and 'selectedTileName'.
      map.current.on('click', 'tile-fill-layer', e => {
        const clickedTileId = e.features[0].properties.id; // Get the id of the clicked tile
        const clickedTileName = e.features[0].properties.name; // Get the name of the clicked tile
        if (selectedTileId === clickedTileId) {
          setSelectedTileId(null);
          setSelectedTileName(null);
        } else {
          setSelectedTileId(clickedTileId);
          setSelectedTileName(clickedTileName);
        }
        setSelectedTileId(clickedTileId); // Set the selectedTileId state to the clicked tile id
        setSelectedTileName(clickedTileName); // Set the selectedTileId state to the clicked tile name
      });

      // Add WMS layer
      map.current.addSource('wms-layer', {
        type: 'raster',
        tiles: [
          // 'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
          // 'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=tile_1', //works!
          // 'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=512&height=512&layers=tile_1', //works!
          'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&transparent=true&width=512&height=512&layers=geotiffs', //works!
          // 'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&query_layers=gray_index&service=WMS&version=1.3.0&x=486&Y=165&request=GetFeatureInfo&crs=EPSG:3857&transparent=true&width=512&height=512&layers=geotiffs', //does not work
          // 'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=512&height=512&layers=tile_2',
          // 'https://wms.geo.admin.ch?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=ch.bafu.bundesinventare-bln',
          //'http://localhost:8080/geoserver/ironhack/tile_1/wms?service=WMS&version=1.3.0&request=GetMap&format=image/png&width=256&height=256&layers=ironhack:tile_1&',
        ],
        tileSize: 512,
      });

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
      console.log(e.features[0]);
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

  // Modify the paint properties based on selectedTile
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
    <Box
      ref={mapContainer}
      w="100%"
      h="100%"
      style={{ overflow: 'auto' }}
    ></Box>
  );
}

export default Map;
