const { expect } = require('chai');

describe('GLoveBox contract', function () {
  it('should populate the participants list with the owner', async function () {
    const [owner] = await ethers.getSigners();
    const GLoveBox = await ethers.getContractFactory('GLoveBox');

    const hardhatGlb = await GLoveBox.deploy();

    const isOwnerRegistered = await hardhatGlb.isRegistered(owner.address);
    expect(isOwnerRegistered).to.be.true;
  });
});
