import { Nav } from '../components/nav/Nav';
import { useAccount } from 'wagmi';

export function MyGlovebox() {
  const { address } = useAccount();

  return (
    <>
      <Nav />
      {/* TODO: grid of messages */}
      TODO: grid of messages here
    </>
  );
}
