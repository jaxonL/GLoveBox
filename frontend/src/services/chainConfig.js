import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, chains } = configureChains(
  [chain.goerli],
  [publicProvider()],
);

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
