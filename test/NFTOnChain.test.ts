import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTOnChain } from "../typechain-types";

describe("NFTOnChain", function () {
  let onChain: NFTOnChain;

  beforeEach(async function () {
    [this.owner, this.investor, this.user, this.toto, this.badguy] =
      await ethers.getSigners();
    // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
    // 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, 0x90F79bf6EB2c4f870365E785982E1f101E93b906
    // 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
    const NFTOnChain = await ethers.getContractFactory("NFTOnChain");
    onChain = await NFTOnChain.deploy();
    await onChain.deployed();
  });

  describe("Test", function () {
    it("Should work", async function () {
      // console.log('data :>> ', await onChain.buildImage());
    });
  });
});
