import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import fs from 'fs';
import Map from './pages/Map';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import axios from 'axios';

function App() {
  const toast = useToast();
  const API_URL = 'http://localhost:5050/api';

  // const createTiles = async ({ name, location, imgUrl }) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/grid`, {
  //       name,
  //       location,
  //       imgUrl,
  //     });
  //     console.log('Grid created:', response.data);
  //   } catch (error) {
  //     console.error('Error creating grid:', error.response.data);
  //   }
  // };

  // useEffect(() => {
  //   const folderPath =
  //     '../../GEBCO_21_Feb_2024_010d7f6d95d1/tiles/1_degree/one_by_one/geojson';
  //   try {
  //     const files = fs.readdir(folderPath);
  //     files.forEach(file => {
  //       if (file.endsWith('.geojson')) {
  //         // Check if it's a GeoJSON file
  //         const fileName = file.replace('.geojson', '');
  //         const geojsonData = JSON.parse(
  //           fs.readFileSync(`${folderPath}/${file}`, 'utf-8')
  //         );
  //         const location = geojsonData;
  //         createTiles({ name: fileName, location, imgUrl: 'test' });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error reading GeoJSON files:', error);
  //   }
  // }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
              <Map />
            </Flex>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
