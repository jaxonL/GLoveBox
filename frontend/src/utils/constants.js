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
  [Network.GOERLI]: '0x713412112EA469a7BcB07125183B40c953069A28',
  [Network.SKALE]: kSkaleGlbAddress,
};
