import { useContractRead } from 'wagmi';
import { kGloveboxAbi } from '../../utils/gloveboxAbi';
import { kGloveBoxAddress } from '../../utils/constants';
import { BigNumber } from 'ethers';

import './Message.css';

export function Message({ index }) {
  console.log('index', index);
  const { data, isLoading } = useContractRead({
    address: kGloveBoxAddress,
    abi: kGloveboxAbi,
    functionName: 'getMessageData',
    args: [BigNumber.from(index)],
    onSettled(data, error) {
      console.log('message data:', data);
    },
  });

  // return <div>{isLoading ? 'Loading...' : data}</div>;
  return <div className="message">Loading message...</div>;
}
