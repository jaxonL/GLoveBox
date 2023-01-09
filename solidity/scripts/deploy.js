async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const GLoveBox = await ethers.getContractFactory(
    'contracts/GLoveBox.sol:GLoveBox',
  );
  const glb = await GLoveBox.deploy();

  console.log('GLoveBox address:', glb.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
