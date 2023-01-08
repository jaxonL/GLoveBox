import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { provider, chains } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'GLoveBox',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const rainbowChains = chains;
