const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

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
});
