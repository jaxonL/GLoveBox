// export const kSkaleGlbAddress = '0x966314C1D418bf65D7647B52f29A5b2a684644E1';
export const kSkaleGlbAddress = '0x288aB731bBAe151C544a11c82839243AB44d6fb9';
export const kSkaleChainId = 647_426_021;
export const kSkaleEndpoint =
  'https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos';
export const kSkaleExplorer =
  'https://hackathon-complex-easy-naos.explorer.eth-sf.skalenodes.com';

export const skaleChain = {
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
    default: { name: 'SkaleExplorer', url: kSkaleExplorer },
  },
  testnet: true,
};
