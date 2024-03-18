import { useEffect, useRef, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box } from '@chakra-ui/react';
// import axios from 'axios';
import Layers from '../components/Layers';
import { MapContext } from '../context/map.context';

// Code based on https://medium.com/@gisjohnecs/part-1-web-mapping-with-mapbox-gl-react-js-7d11b50d86ec

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function Map() {
  // const storedToken = localStorage.getItem('authToken');
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

  // Effect to handle opening the Drawer in the Layer component when a tile is selected
  useEffect(() => {
    if (selectedTileId) {
      setIsDrawerOpen(true);
    }
  }, [selectedTileId]);

  // This effect initializes and displays the MapBox map
  // including adding controls, layers and handling user interactions.
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name: 'mercator',
      },
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
          'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&transparent=true&width=512&height=512&layers=geotiffs', //works
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
        'tile-fill-layer' // place WMS layer under the tiles.
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
