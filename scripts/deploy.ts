import { ethers } from "hardhat";

async function main() {
  const NFTOnChain = await ethers.getContractFactory("NFTOnChain");
  const onChain = await NFTOnChain.deploy();

  await onChain.deployed();

  console.log(
    `NFTOnChain deployed to ${onChain.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
