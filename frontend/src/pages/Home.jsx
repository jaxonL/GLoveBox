import React, { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { Button, CircularProgress, TextField } from '@mui/material';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { kGloveBoxAddress } from '../utils/constants';
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export function Home() {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 500);
  const { address, isDisconnected } = useAccount();
  const [uploadingFile, setUploadingFile] = useState(false);

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const { config } = usePrepareContractWrite({
    address: kGloveBoxAddress,
    abi: [
      {
        type: 'function',
        stateMutability: 'nonpayable',
        outputs: [],
        name: 'sendMessage',
        inputs: [{ type: 'string', name: 'message', internalType: 'string' }],
      },
    ],
    functionName: 'sendMessage',
    args: [debouncedMessage],
    enabled: !!debouncedMessage,
  });

  const { data, writeAsync: sendMessage } = useContractWrite(config);
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('tx suceeded', data?.hash);
    }
  }, [isSuccess, data]);

  const sendButtonClicked = async (e) => {
    e.preventDefault();
    setUploadingFile(true);
    console.log('send button clicked', message, 'address:', address);
    try {
      await sendMessage({ message });
      setMessage('');
    } catch (e) {
      console.error('caught e', e);
    } finally {
      setUploadingFile(false);
    }
  };

  const renderSubmitContent = () => {
    if (isDisconnected) {
      return 'connect';
    }
    if ((message && !sendMessage) || uploadingFile) {
      return <CircularProgress size={20} />;
    }
    return 'send <3';
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="tagline title">
          send and receive a nice note that live will forever
        </div>
        <p>
          let someone know you’re thinking of them, share a joke, or just tell
          them how you’re feeling right now:
        </p>
        <TextField
          id="messageInput"
          multiline
          fullWidth
          rows={10}
          value={message}
          onChange={onMessageChange}
        />
        <Button
          id="sendButton"
          type="submit"
          onClick={sendButtonClicked}
          disabled={isDisconnected || !sendMessage || uploadingFile}
        >
          {renderSubmitContent()}
        </Button>
      </div>
    </>
  );
}
