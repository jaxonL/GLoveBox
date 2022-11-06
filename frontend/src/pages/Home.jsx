import React, { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { Button, TextField } from '@mui/material';
import {
  useAccount,
  // useContractWrite,
  // usePrepareContractWrite,
  // useWaitForTransaction,
} from 'wagmi';
import { kGloveBoxAddress } from '../utils/constants';
import './Home.css';

export function Home() {
  const [message, setMessage] = useState('');
  const { address, isDisconnected } = useAccount();
  const [uploadingFile, setUploadingFile] = useState(false);

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // const { config } = usePrepareContractWrite({
  //   address: kGloveBoxAddress,
  //   abi: [
  //     {
  //       name: 'sendMessage',
  //       type: 'function',
  //       stateMutability: 'nonpayable',
  //       inputs: [
  //         {
  //           name: 'message',
  //           type: 'string',
  //         },
  //       ],
  //       outputs: [],
  //     },
  //   ],
  //   functionName: 'sendMessage',
  // });

  // const { data, write: sendMessage } = useContractWrite(config);
  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // });

  const sendButtonClicked = async (e) => {
    e.preventDefault();
    setUploadingFile(true);
    console.log('send button clicked', message, 'address:', address);
    // sendMessage(message);
    setUploadingFile(false);
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="tagline title">
          send and receive messages to strangers that live forever
        </div>
        <p>write a nice message to a stranger:</p>
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
          disabled={isDisconnected}
          // disabled={isDisconnected || !sendMessage || uploadingFile}
        >
          {/* TODO: loading spinner if !sendMessage */}
          {isDisconnected ? 'Connect' : 'send <3'}
        </Button>
      </div>
    </>
  );
}
