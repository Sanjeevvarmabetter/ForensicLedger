const { ethers } = require("hardhat");

async function main() {

        const evidence = await ethers.getContractFactory("ChainOfCustody");



        console.log("deploying evidence");

        const deployment = await evidence.deploy();

    console.log("deployed contract at: ",deployment.target);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
});

// 0x559a29b6dB634C2f402f1d1a9945CE553aee584B

// 0xa36cCb08f076577Fa5794B47f14435c48366B3f2