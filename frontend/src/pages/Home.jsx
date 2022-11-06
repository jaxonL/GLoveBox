import React, { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { Button, CircularProgress, TextField } from '@mui/material';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { kGloveBoxAddress } from '../utils/constants';
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { kGloveboxAbi } from '../utils/gloveboxAbi';

export function Home() {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 500);
  const { address, isDisconnected } = useAccount();
  const [uploadingFile, setUploadingFile] = useState(false);

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const { data: isRegisteredData, refetch: refetchIsRegistered } =
    useContractRead({
      address: kGloveBoxAddress,
      abi: kGloveboxAbi,
      functionName: 'isRegistered',
      args: [address],
      onSettled(data, error) {
        console.log('Settled', { data, error });
      },
    });
  const [registered, setRegistered] = useState(isRegisteredData || false);

  useEffect(() => {
    console.log('registered?', isRegisteredData);
    if (isRegisteredData) {
      setRegistered(true);
    }
  }, [isRegisteredData]);

  const { config: sendMessageConfig } = usePrepareContractWrite({
    address: kGloveBoxAddress,
    abi: kGloveboxAbi,
    functionName: 'sendMessage',
    args: [debouncedMessage],
    enabled: !!debouncedMessage,
  });

  const { config: registerConfig } = usePrepareContractWrite({
    address: kGloveBoxAddress,
    abi: kGloveboxAbi,
    functionName: 'register',
  });

  const { data: sendMessageData, writeAsync: sendMessage } =
    useContractWrite(sendMessageConfig);
  const { data: registerData, writeAsync: register } =
    useContractWrite(registerConfig);

  const { isSuccess: sendMessageSuccess } = useWaitForTransaction({
    hash: sendMessageData?.hash,
  });
  const { isSuccess: registerSuccess } = useWaitForTransaction({
    hash: registerData?.hash,
  });

  useEffect(() => {
    if (sendMessageSuccess) {
      console.log('tx suceeded', sendMessageData?.hash);
    }
  }, [sendMessageSuccess, sendMessageData]);

  const sendButtonClicked = async (e) => {
    e.preventDefault();
    setUploadingFile(true);
    console.log('send button clicked', message, 'address:', address);
    if (!registered) {
      try {
        await register();
        refetchIsRegistered();
      } catch (e) {
        console.warn('register errored', e);
      }
    }
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
        {!registered && (
          <p>By sending a message, you also opt into receiving good vibes.</p>
        )}
      </div>
    </>
  );
}
