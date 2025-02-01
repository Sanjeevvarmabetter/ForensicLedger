require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // base_sepolia: {
    //   url: 'https://sepolia.base.org',
    //   accounts: [process.env.METAMASK_PRIVATE_KEY],
    // }
    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 100000000000, // 100 Gwei in Wei
      gas: 8000000, // Set gas limit
    }
  },
};