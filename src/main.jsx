import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { MapProviderWrapper } from './context/map.context.jsx';
import { AuthProviderWrapper } from './context/auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <MapProviderWrapper>
          <AuthProviderWrapper>
            <App />
          </AuthProviderWrapper>
        </MapProviderWrapper>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
