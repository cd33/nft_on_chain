import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { NFTOnChain } from "../typechain-types";

describe("NFTOnChain", function () {
  let onChain: NFTOnChain;
  const price: BigNumber = ethers.utils.parseEther("0.0001")
  const receiver = "0xD9453F5E2696604703076835496F81c3753C3Bb3"

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

  describe("Mint", function () {
    it("Should work", async function () {
      const balanceReceiverBefore = await ethers.provider.getBalance(receiver)
      const balanceInvestorBefore = await ethers.provider.getBalance(this.investor.address)

      await onChain.connect(this.investor).mint(3, {value: price.mul(3)})
      const NFT1 = await onChain.tokenURI(1)
      const NFT2 = await onChain.tokenURI(2)
      const NFT3 = await onChain.tokenURI(3)
      console.log('NFT1 :>> ', NFT1);
      console.log('NFT2 :>> ', NFT2);
      console.log('NFT3 :>> ', NFT3);

      const balanceReceiverAfter = await ethers.provider.getBalance(receiver)
      const balanceInvestorAfter = await ethers.provider.getBalance(this.investor.address)
      expect(balanceReceiverAfter).to.equal(balanceReceiverBefore.add(price.mul(3)))
      expect(balanceInvestorAfter).to.be.lt(balanceInvestorBefore)
    });
  });
});
