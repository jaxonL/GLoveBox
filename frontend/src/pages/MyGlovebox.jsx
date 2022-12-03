import { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { useAccount, useContractRead } from 'wagmi';
import { kGloveboxAbi } from '../utils/gloveboxAbi';
import { kGloveBoxAddress, Network } from '../utils/constants';
import { CircularProgress } from '@mui/material';
import { Message } from '../components/message/Message';

const gloveboxContract = {
  address: kGloveBoxAddress[Network.GOERLI],
  abi: kGloveboxAbi,
};

export function MyGlovebox() {
  const { address } = useAccount();
  const [messageIndices, setMessageIndices] = useState([]);

  const { data: balanceOf, isLoading: loadingBalanceOf } = useContractRead({
    ...gloveboxContract,
    functionName: 'balanceOf',
    args: [address],
    onSettled(data, error) {
      console.log('balance:', data.toNumber());
      if (data.toNumber()) {
        const indices = [];
        for (let i = 0; i < data.toNumber(); i++) {
          indices.push(i);
        }
        setMessageIndices(indices);
      }
    },
  });

  return (
    <>
      <Nav />
      {/* TODO: grid of messages */}
      <div className="body">
        <div className="tagline title">your messages</div>
        <p>all of the messages you have received</p>
        <div className="messageGrid">
          {loadingBalanceOf ? (
            <CircularProgress />
          ) : messageIndices.length ? (
            messageIndices.map((index) => <Message index={index} key={index} />)
          ) : (
            'No messages'
          )}
        </div>
      </div>
    </>
  );
}
