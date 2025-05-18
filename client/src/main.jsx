import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import theme from './theme/theme.js';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';

let Analytics = () => null;
try {
  const { Analytics: VercelAnalytics } = require('@vercel/analytics/react');
  Analytics = VercelAnalytics;
} catch (error) {
  console.warn("Vercel Analytics not available:", error.message);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
    {/* <Analytics /> */}
  </>
);