import { ethers, network } from "hardhat";
import { verify } from "./verify";

async function main() {
  const NFTOnChain = await ethers.getContractFactory("NFTOnChain");
  const onChain = await NFTOnChain.deploy();
  await onChain.deployed();
  console.log(`NFTOnChain deployed to ${onChain.address}`);

  if (network.name === "goerli" || network.name === "sepolia") {
    console.log("Verifying NFTOnChain...");
    await onChain.deployTransaction.wait(6); // Attendre 6 block après le déploiment
    await verify(onChain.address, []);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
