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
import { kGloveBoxAddress, kSkaleExplorer } from '../utils/constants';
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { kGloveboxAbi } from '../utils/gloveboxAbi';
import { Link } from 'react-router-dom';

export function Home() {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 500);
  const { address, isDisconnected } = useAccount();
  const [uploadingFile, setUploadingFile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const { data: isRegisteredData, refetch: refetchIsRegistered } =
    useContractRead({
      address: kGloveBoxAddress,
      abi: kGloveboxAbi,
      functionName: 'isRegistered',
      args: [address],
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

  const { isLoading: sendMessageLoading, isSuccess: sendMessageSuccess } =
    useWaitForTransaction({
      hash: sendMessageData?.hash,
    });
  const { isSuccess: registerSuccess } = useWaitForTransaction({
    hash: registerData?.hash,
  });

  useEffect(() => {
    if (sendMessageSuccess) {
      setShowSuccess(true);
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
    } catch (e) {
      console.error('caught e', e);
    } finally {
      setUploadingFile(false);
    }
  };

  const sendAnotherClicked = () => {
    setShowSuccess(false);
    setMessage('');
  };

  const renderSubmitContent = () => {
    if (isDisconnected) {
      return 'connect';
    }
    if ((message && !sendMessage) || uploadingFile || sendMessageLoading) {
      return <CircularProgress size={20} />;
    }
    return 'send <3';
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="tagline title">
          send and receive a nice note that will live forever
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
          disabled={uploadingFile || sendMessageLoading || showSuccess}
        />
        {showSuccess && (
          <>
            <img
              src={require('../assets/images/heart_animation.gif')}
              alt="animated hearts"
              className="heart-animation"
            />
            <div className="successMessage">
              <p>success! your message has been sent</p>
              <p>
                view your transaction{' '}
                <a
                  href={kSkaleExplorer + '/tx/' + sendMessageData?.hash}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </p>
              <Button component={Link} to="/my-glovebox" variant="contained">
                see your messages
              </Button>
              <Button
                type="button"
                onClick={sendAnotherClicked}
                variant="contained"
              >
                send another
              </Button>
            </div>
          </>
        )}
        <Button
          id="sendButton"
          type="submit"
          onClick={sendButtonClicked}
          disabled={
            isDisconnected ||
            !sendMessage ||
            uploadingFile ||
            sendMessageLoading
          }
          variant="contained"
        >
          {renderSubmitContent()}
        </Button>
        {!registered && !registerSuccess && (
          <p style={{ marginTop: 0 }}>
            by sending a message, you also opt into receiving good vibes.
          </p>
        )}
      </div>
    </>
  );
}
