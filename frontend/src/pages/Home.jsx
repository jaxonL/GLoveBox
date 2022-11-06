import { Nav } from '../components/nav/Nav';
import './Home.css';

export function Home() {
  return (
    <>
      <Nav />
      <div class="body">
        <div className="tagline">
          send and receive messages to strangers that live forever &lt;3
        </div>
        <p>write a nice message to a stranger:</p>
        <textarea id="messageInput"></textarea>
        <button id="sendButton" type="submit">
          send &lt;3
        </button>
      </div>
    </>
  );
}
