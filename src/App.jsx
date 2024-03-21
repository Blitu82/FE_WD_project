import { Routes, Route } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Map from './pages/Map';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Navbar />
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
