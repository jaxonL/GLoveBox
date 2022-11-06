import './Nav.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

export function Nav() {
  const { isConnected } = useAccount();
  const activeStyle = {
    textDecoration: 'underline',
  };

  return (
    <nav className="navbar">
      {/* TODO: active? */}
      <NavLink to="/" className="logo">
        GLove Box
      </NavLink>
      <ul>
        <li>
          <NavLink
            to="/faq"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            faq
          </NavLink>
        </li>
        {isConnected && (
          <li>
            <NavLink
              to="/my-glovebox"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              my glovebox
            </NavLink>
          </li>
        )}
        <li>
          <ConnectButton label="Connect" showBalance={false} />
        </li>
      </ul>
    </nav>
  );
}
