import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { wagmiClient, rainbowChains } from './services/chainConfig';
import { MyGlovebox } from './pages/MyGlovebox';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/my-glovebox',
    element: <MyGlovebox />,
  },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={rainbowChains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
