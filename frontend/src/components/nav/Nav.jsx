import './Nav.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

export function Nav() {
  const { isConnected } = useAccount();
  return (
    <nav className="navbar">
      {/* TODO: active? */}
      <NavLink to="/" className="logo">
        GLove Box
      </NavLink>
      <ul>
        {isConnected && (
          <li>
            <NavLink to="/my-glovebox">my glovebox</NavLink>
          </li>
        )}
        <li>
          <ConnectButton label="Connect" showBalance={false} />
        </li>
      </ul>
    </nav>
  );
}
