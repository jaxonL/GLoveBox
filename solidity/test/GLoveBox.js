const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GLoveBox contract', function () {
  async function deployFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const GLoveBox = await ethers.getContractFactory('GLoveBox');
    const glb = await GLoveBox.deploy();
    await glb.deployed();
    return { GLoveBox, glb, owner, addr1, addr2 };
  }
  it('should populate the participants list with the owner', async function () {
    const { owner, glb } = await loadFixture(deployFixture);

    const isOwnerRegistered = await glb.isRegistered(owner.address);
    expect(isOwnerRegistered).to.be.true;
  });

  it('should register a new participant', async function () {
    const { addr1, glb } = await loadFixture(deployFixture);

    await glb.connect(addr1).register();
    const isAddr1Registered = await glb.isRegistered(addr1.address);
    expect(isAddr1Registered).to.be.true;
  });

  it('should revert when owner tries to register', async function () {
    const { owner, glb } = await loadFixture(deployFixture);

    await expect(glb.connect(owner).register()).to.be.revertedWith(
      'GLoveBox :: Owner is already registered',
    );
  });

  it('should not register a participant twice', async function () {
    const { addr1, glb } = await loadFixture(deployFixture);

    await glb.connect(addr1).register();
    await expect(glb.connect(addr1).register()).to.be.revertedWith(
      'GLoveBox :: Already registered',
    );
  });

  // it('should reject registration from a contract', async function () {
  //   const { GLoveBox, glb } = await loadFixture(deployFixture);

  //   const glb2 = await GLoveBox.deploy();
  //   await glb2.deployed();
  //   await impersonateAccount(glb2.address);
  //   await setBalance(glb2.address, 100n ** 18n);
  //   const contractAddress = await ethers.getSigner(glb2.address);

  //   await glb.connect(contractAddress).register();

  //   expect(await glb.isRegistered(contractAddress.address)).to.be.false;
  // });

  it('should send a message', async function () {
    const { owner, addr1, glb } = await loadFixture(deployFixture);
    const message = 'Hello World!';

    await glb.connect(addr1).register();
    await glb.connect(owner).sendMessage(message);

    const sentMessage = await glb.tokenIdToMessage(0);
    expect(sentMessage).to.equal(message);
  });

  it('should be able to get received messages', async function () {
    const { owner, addr1, addr2, glb } = await loadFixture(deployFixture);
    const participants = [owner, addr1, addr2];
    const message1 = 'have a great day today!';
    const message2 = 'spreading the 💙💜🧡💛 on chain';
    const message3 =
      'some message that is longer than 150 characters and will be still be accepted by the contract. maybe later put this in a constant so we can test texts of varying lengths.';
    const sentMessages = [message1, message2, message3];

    await glb.connect(addr1).register();
    await glb.connect(addr2).register();
    await glb.connect(addr2).sendMessage(message1);
    await glb.connect(addr1).sendMessage(message2);
    await glb.connect(owner).sendMessage(message3);

    const ownerToMessage = {};

    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      const messages = await glb.connect(participant).getReceivedMessages();
      for (let j = 0; j < messages.length; j++) {
        const message = messages[j];
        expect(message.tokenURI).to.be.a('string');
        expect(sentMessages).to.include(message.tokenURI);
      }
      ownerToMessage[participant.address] = messages;
    }

    const totalMessageCount = Object.values(ownerToMessage).reduce(
      (acc, messageList) => {
        return acc + messageList.length;
      },
      0,
    );

    expect(totalMessageCount).to.equal(sentMessages.length);
  });
});
