import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
import { kSkaleChainId, kSkaleEndpoint } from '../utils/constants';

const skaleChain = {
  id: kSkaleChainId,
  name: 'SKALE',
  network: 'skale',
  iconBackground: '#e49df9',
  nativeCurrency: {
    decimals: 18,
    name: 'sFUEL',
    symbol: 'SFUEL',
  },
  rpcUrls: {
    default: kSkaleEndpoint,
    public: kSkaleEndpoint,
  },
  blockExplorers: {
    default: { name: 'SkaleExplorer', url: 'https://hackathon-complex-easy-naos.explorer.eth-sf.skalenodes.com' },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [
    skaleChain
  ],
  [publicProvider()]
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
