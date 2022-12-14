# GLoveBox

## Short description

Give and receive love on-chain.

## Long description

In a world filled with fleeting digital connections, negativity, and isolation, we’re craving connection that is unconditional, intentional, and persistent. Glove Box is an on-chain anonymous messenger to send and receive simple, positive messages that can brighten someone’s day and lift up their overall mental well-being. Messages are sent anonymously and received anonymously.

## How It's Made

The experience is built on Skale as we wanted the most seamless experience for users to receive and give love on-chain. Skale's gas-free actions enable and encourage users to share more positive vibes with others in greater frequency. In addition, Skale's interoperability allows GloveBox to scale and grow across networks to best accommodate users. It was the team’s first time using and deploying contracts on Skale and were excited and impressed at the ease to deploy the contract.

Messages sent on GloveBox only include text. Currently, all metadata is stored in smart contracts. We anticipate utilizing servers to support metadata storage as GloveBox scales.

The Front-End was designed in Figma, and implemented using React.

The smart contract was created using solidity which implemented the openzeppelin contracts. The contract was written on remix.ethereum.org and was connected to the skale chain endpoint of one of the networks. The smart contract is connected to a metamask wallet that has a specific private key and sends a message full of positivity to a random person when deployed onto the network.

## Developmemt

### Solidity

#### Deploying the contract

1. Duplicate and replace the values in `.env.example` with the correct values.
2. Save the file as `.env`. Do ***NOT*** check this file in.
3. Run the command `npx hardhat run scripts/deploy.js --network <network-name>` to deploy to a live network.
   1. To test the deployment, you can run `npx hardhat run scripts/deploy.js`.
