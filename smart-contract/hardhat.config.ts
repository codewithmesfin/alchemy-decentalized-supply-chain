import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const GOERLI_URL=process.env.GOERLI_URL;
const PRIVATE_KEY:any=process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url:GOERLI_URL,
      accounts:[PRIVATE_KEY]
    },
    hardhat: {
      chainId: 1337,
    },
  }
};

export default config;
