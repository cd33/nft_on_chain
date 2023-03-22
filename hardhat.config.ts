import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"

const INFURA_GOERLI = process.env.INFURA_GOERLI || "";
const INFURA_SEPOLIA = process.env.INFURA_SEPOLIA || "";
const PRIVATE_KEY_TEST = process.env.PRIVATE_KEY_TEST || "";
const ETHERSCAN = process.env.ETHERSCAN || "";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: INFURA_GOERLI,
      accounts: [PRIVATE_KEY_TEST],
      chainId: 5
    },
    sepolia: {
      url: INFURA_SEPOLIA,
      accounts: [PRIVATE_KEY_TEST],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: ETHERSCAN
  },
  gasReporter: {
    enabled: true
  }
};

export default config;
