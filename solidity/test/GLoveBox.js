const {
  loadFixture,
  impersonateAccount,
  setBalance,
} = require('@nomicfoundation/hardhat-network-helpers');
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

  // TODO: test send message
  // TODO: test get messages
});
