import { Nav } from '../components/nav/Nav';
import { kGloveBoxAddress, kSkaleExplorer } from '../utils/constants';

export function Faq() {
  return (
    <>
      <Nav />
      <div className="body faq">
        <div className="tagline title">about & faq</div>
        <h3>what is GLoveBox?</h3>
        <p>
          {
            '"give and receive love on-chain ( ˘⌣˘)♡(˘⌣˘ ) send unconditional good vibes amongst fellow humans"'
          }
        </p>
        <p>GLoveBox is a dApp built on the SKALE network.</p>
        <p>
          <a href={kSkaleExplorer + '/address/' + kGloveBoxAddress}>
            GLoveBox smart contract
          </a>
        </p>
        <h3>how do i use GLoveBox?</h3>
        <p>
          get some SFUEL from{' '}
          <a
            href="https://hackathon.skale.network/"
            target="_blank"
            rel="noopener noreferrer"
          >
            the SKALE faucet
          </a>{' '}
          and start by sending a message.
        </p>
        <p>
          we use the{' '}
          <a
            href="https://eth-sf.skalenodes.com/v1/hackathon-complex-easy-naos"
            target="_blank"
            rel="noopener noreferrer"
          >
            hacakthon-complex-easy-naos
          </a>{' '}
          endpoint.
        </p>
        <h3>who is the team behind GLoveBox?</h3>
        <p>
          <a
            href="https://www.linkedin.com/in/vanessa-johnson-a95885182/"
            target="_blank"
            rel="noopener noreferrer"
          >
            vanessa
          </a>
          ,{' '}
          <a
            href="https://www.linkedin.com/in/ashherr"
            target="_blank"
            rel="noopener noreferrer"
          >
            ash
          </a>
          ,{' '}
          <a
            href="https://www.linkedin.com/in/yiranshu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            yiran
          </a>
          , and{' '}
          <a
            href="https://ca.linkedin.com/in/jaxonl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            jaxon
          </a>
          .
        </p>
        <p>
          special thanks to{' '}
          <a
            href="https://ca.linkedin.com/in/don-dang-311606a2"
            target="_blank"
            rel="noopener noreferrer"
          >
            don
          </a>{' '}
          for helping us out big time with the smart contract.
        </p>
      </div>
    </>
  );
}
