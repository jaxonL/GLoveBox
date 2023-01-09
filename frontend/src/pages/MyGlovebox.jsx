import { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { useAccount, useContractRead } from 'wagmi';
import { kGloveboxAbi } from '../utils/gloveboxAbi';
import { kGloveBoxAddress, Network } from '../utils/constants';
import { CircularProgress } from '@mui/material';
import { Message } from '../components/message/Message';
import { useNavigate } from 'react-router-dom';
import { Message as MessageObject } from '../api/Message';

const gloveboxContract = {
  address: kGloveBoxAddress[Network.GOERLI],
  abi: kGloveboxAbi,
};

export function MyGlovebox() {
  const navigate = useNavigate();
  const { address } = useAccount({
    /** force navigate to homepage on disconnect */
    onDisconnect() {
      return navigate('/');
    },
  });

  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  const { data: balanceOf, isLoading: loadingBalanceOf } = useContractRead({
    ...gloveboxContract,
    functionName: 'balanceOf',
    args: [address],
    onSettled(data, error) {
      setMessageCount(data.toNumber());
    },
  });

  const { data: receivedMessages, isLoading: loadingReceivedMessages } =
    useContractRead({
      ...gloveboxContract,
      functionName: 'getReceivedMessages',
      onSettled(data, error) {
        const messages = [];
        for (let i = 0; i < data.length; i++) {
          const message = new MessageObject(...data[i]);
          messages.push(message);
        }
        setMessages(messages);
      },
      overrides: {
        from: address,
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
          ) : messages.length ? (
            messages.map((message) => (
              <Message data={message} key={message.tokenId} />
            ))
          ) : (
            'No messages'
          )}
        </div>
        <div className="messagecount">
          you have a total of {messageCount} message{messageCount !== 1 && 's'}
        </div>
      </div>
    </>
  );
}
