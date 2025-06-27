

// const hre = require("hardhat");

// async function main() {
//   const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
//   const contract = await CertificateRegistry.deploy();

//   await contract.deployed();

//   console.log(`Contract deployed at: ${contract.address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });










const hre = require("hardhat");

async function main() {
  const CertRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const certRegistry = await CertRegistry.deploy();  // deploy the contract

  await certRegistry.waitForDeployment();  // wait until it's deployed

  console.log("CertificateRegistry deployed to:", await certRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

