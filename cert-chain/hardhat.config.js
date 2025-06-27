require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: "0.8.28",
  networks: {
    base: {
      url: process.env.BASE_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }

    // localhost: {
    //   url: "http://127.0.0.1:8545", // Ganache default RPC
    //   // url: "http://127.0.0.1:8545", // Ganache default RPC
    // },
    // ganache: {
    //   url: "http://127.0.0.1:8545",
    //   accounts: [
    //     // Replace with your actual private key (without the 0x prefix)
    //     // '21b40be1376c934ff0cbfbf893f1cd52c71539b4947d8d18288746257d7990f0'
    //     '25af9eb315134fea72a41b0aa6b35a07163e6aeddb7afdef98e19fe66fd8d508'
    //   ]
    // }

  }
};