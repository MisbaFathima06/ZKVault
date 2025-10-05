// deploy.js
const contract = require('./artifacts/AnonymousIncidentReporting.json'); // Make sure to compile your smart contract first
const kit = require('@celo/contractkit');

// Function to deploy the smart contract
async function deployContract() {
    // Initialize Celo ContractKit
    const kitInstance = await kit.newKit('https://alfajores-forno.celo-testnet.org');
    kitInstance.addAccount(process.env.PRIVATE_KEY);

    // Get the deployer's account
    const accounts = await kitInstance.web3.eth.getAccounts();
    const deployer = accounts[0];

    // Create a new instance of the smart contract
    const instance = new kitInstance.web3.eth.Contract(contract.abi);
    const deploy = instance.deploy({ data: contract.bytecode });

    // Deploy the contract to the Celo blockchain
    const newContract = await deploy.send({
        from: deployer,
        gas: 5000000,
    });

    console.log('Contract deployed at:', newContract.options.address);
}

deployContract();
