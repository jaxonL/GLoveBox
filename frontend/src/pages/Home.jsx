import { Nav } from '../components/nav/Nav';
import './Home.css';

export function Home() {
  const sendButtonClicked = (e) => {
    e.preventDefault();
    console.log('send button clicked');
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="tagline title">
          send and receive messages to strangers that live forever
        </div>
        <p>write a nice message to a stranger:</p>
        <textarea id="messageInput"></textarea>
        <button id="sendButton" type="submit" onClick={sendButtonClicked}>
          send &lt;3
        </button>
      </div>
    </>
  );
}
