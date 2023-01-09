import {
  kSkaleGlbAddress,
  kSkaleChainId,
  kSkaleExplorer,
} from '../services/skaleConfig';

// networks
export var Network;
(function (Network) {
  Network[(Network['MAINNET'] = 1)] = 'MAINNET';
  Network[(Network['GOERLI'] = 5)] = 'GOERLI';
  Network[(Network['SKALE'] = kSkaleChainId)] = 'SKALE';
})(Network || (Network = {}));

// TODO: have the current chain be provided throughout the app. for now, default to goerli

// block explorers
export const kBlockExplorer = {
  [Network.MAINNET]: 'https://etherscan.io',
  [Network.GOERLI]: 'https://goerli.etherscan.io',
  [Network.SKALE]: kSkaleExplorer,
};

// contract values
export const kGloveBoxAddress = {
  [Network.GOERLI]: '0x09B616e0c56b0d2290834A9c77e1AEcc089C4740',
  [Network.SKALE]: kSkaleGlbAddress,
};
