import './Nav.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Nav() {
  return (
    <div className="navbar">
      {/* TODO: add react router links */}
      <ul>
        <li>My Glovebox</li>
        <li>
          <ConnectButton label="Connect" showBalance={false} />
        </li>
      </ul>
    </div>
  );
}
