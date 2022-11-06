import React, { useState } from 'react';
import { Nav } from '../components/nav/Nav';
import { Button, TextField } from '@mui/material';
import './Home.css';

export function Home() {
  const [message, setMessage] = useState('');

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendButtonClicked = (e) => {
    e.preventDefault();
    console.log('send button clicked', message);
    // get connected address
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
        <Button id="sendButton" type="submit" onClick={sendButtonClicked}>
          send &lt;3
        </Button>
      </div>
    </>
  );
}
