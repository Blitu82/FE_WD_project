import { useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box } from '@chakra-ui/react';
import Layers from '../components/Layers';
import QuickTips from '../components/QuickTips';
import { MapContext } from '../context/map.context';

// Code based on https://medium.com/@gisjohnecs/part-1-web-mapping-with-mapbox-gl-react-js-7d11b50d86ec
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

function Map() {
  // const storedToken = localStorage.getItem('authToken');
  const {
    map,
    mapContainer,
    lng,
    lat,
    zoom,
    tiles,
    setIsDrawerOpen,
    getBoundingBox,
    selectedTiles,
    setSelectedTiles,
  } = useContext(MapContext);

  // Effect to handle opening the Drawer in the Layer component when a tile is selected
  useEffect(() => {
    if (selectedTiles.length !== 0) {
      setIsDrawerOpen(true);
    }
  }, [selectedTiles]);

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

    ///Deselect items by clicking anywhere on the map.

    ////TEST

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

      // Handle click event on tiles - multiple selection
      map.current.on('click', 'tile-fill-layer', e => {
        const clickedTileId = e.features[0].properties.id; // Get the id of the clicked tile
        const clickedTileName = e.features[0].properties.name; // Get the name of the clicked tile
        const geometryArray = e.features[0].geometry.coordinates[0]; // Get the geometry of the clicked tile

        // Check if the Ctrl (Windows) or Command (Mac) keys are pressed
        const isCtrlPressed =
          e.originalEvent.ctrlKey || e.originalEvent.metaKey;

        if (isCtrlPressed) {
          const existingTileIndex = selectedTiles.findIndex(
            tile => tile.id === clickedTileId
          );
          if (existingTileIndex === -1) {
            // Add tile to selectedTiles array with Bounding Box attribute
            const bbox = getBoundingBox(geometryArray);
            setSelectedTiles(prevSelectedTiles => [
              ...prevSelectedTiles,
              {
                id: clickedTileId,
                name: clickedTileName,
                geom: geometryArray,
                bbox: bbox,
                selected: true,
              },
            ]);
          } else {
            // Remove tile from selectedTiles array
            const updatedSelectedTiles = selectedTiles.filter(
              tile => tile.id !== clickedTileId
            );
            setSelectedTiles(updatedSelectedTiles);
          }
        } else {
          // If Ctrl key is not pressed, select only the clicked tile
          const bbox = getBoundingBox(geometryArray);
          setSelectedTiles([
            {
              id: clickedTileId,
              name: clickedTileName,
              geom: geometryArray,
              bbox: bbox,
              selected: true,
            },
          ]);
        }
      });

      // Add WMS data from Geoserver (running in AWS) to the map
      map.current.addSource('wms-layer', {
        type: 'raster',
        tiles: [
          // 'http://localhost:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&transparent=true&width=512&height=512&layers=geotiffs', // local works
          'http://ec2-13-53-199-118.eu-north-1.compute.amazonaws.com:8080/geoserver/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&crs=EPSG:3857&transparent=true&width=512&height=512&layers=ironhack:geotiffs', // AWS works
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
      // console.log(coordinates);
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
      const selectedTileIds = selectedTiles.map(tile => tile.id);

      map.current.setPaintProperty('tile-fill-layer', 'fill-opacity', [
        'case',
        ['in', ['get', 'id'], ['literal', selectedTileIds]],
        0.5,
        0.2,
      ]);
      map.current.setPaintProperty('tile-line-layer', 'line-width', [
        'case',
        ['in', ['get', 'id'], ['literal', selectedTileIds]],
        6,
        2,
      ]);
    }
  }, [selectedTiles]);

  // Allow the user to click outside the tiles area to reset the selected tiles
  useEffect(() => {
    const handleMapClick = e => {
      // Check if it's a left click (button 0) and if the click is outside the tiles area
      if (e.originalEvent.button === 0 && !isClickInsideTilesArea(e)) {
        setSelectedTiles([]);
      }
    };

    const isClickInsideTilesArea = e => {
      const tilesLayer = map.current.getLayer('tile-fill-layer');
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: [tilesLayer.id],
      });
      return features.length > 0;
    };

    map.current.on('mousedown', handleMapClick);

    return () => {
      map.current.off('mousedown', handleMapClick);
    };
  }, [map, selectedTiles, setSelectedTiles]);

  return (
    <>
      <Box
        ref={mapContainer}
        w="100%"
        h="100%"
        style={{ overflow: 'auto', zIndex: 0 }}
        // style={{ overflow: 'auto', position: 'relative', zIndex: 1 }}
      ></Box>
      <Layers />
      <QuickTips />
    </>
  );
}

export default Map;
