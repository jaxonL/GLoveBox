import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { wagmiClient, rainbowChains } from './services/chainConfig';
import { MyGlovebox } from './pages/MyGlovebox';
import { createTheme, ThemeProvider } from '@mui/material';
import { Faq } from './pages/Faq';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/my-glovebox',
    element: <MyGlovebox />,
  },
  {
    path: '/faq',
    element: <Faq />,
  },
]);

const theme = createTheme({
  palette: {
    primary: { main: '#D84A26' },
    secondary: { main: '#A79C6F' },
  },
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={rainbowChains}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
