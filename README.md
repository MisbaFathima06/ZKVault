

# Building a Decentralized Anonymous Incident Reporting App with Celo Blockchain

## Table of Contents

1. [Introduction](##Introduction)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Smart Contract (AnonymousIncidentReporting.sol)](#smart-contract-anonymousincidentreportingsol)
    - [Overview](#overview)
    - [Security Considerations](#security-considerations)
4. [Frontend Application (app.js)](#frontend-application-appjs)
    - [Overview](#overview-frontend)
    - [Testing Strategies](#testing-strategies-frontend)
5. [Contributing](#contributing)
    - [How to Contribute](#how-to-contribute)
    - [Local Development](#local-development)
6. [License](#license)

## Introduction

In an era where privacy and transparency are paramount, the development of a decentralized anonymous incident reporting application becomes crucial. This project leverages the innovative Celo blockchain to create a secure and transparent platform for reporting sensitive incidents without compromising the anonymity of the reporters.

### Purpose

This tutorial serves as a comprehensive guide for developers interested in building a decentralized anonymous incident reporting application using the Celo blockchain. The project's purpose is to showcase the potential of blockchain technology in providing a trustworthy, confidential, and transparent platform for reporting incidents.

### Celo Blockchain Technology:

Celo is an open-source blockchain platform that aims to make financial tools accessible to anyone with a mobile phone. Built on the Ethereum framework, Celo extends its capabilities by introducing features like a stablecoin pegged to the US Dollar, allowing for a more user-friendly and stable environment. The platform prioritizes ease of use, making it an ideal choice for projects seeking to integrate blockchain technology seamlessly.

### Applicability to the Topic:

Celo's blockchain technology is exceptionally well-suited for our decentralized anonymous incident reporting application. Its focus on usability ensures that individuals with basic technical knowledge can easily report incidents while maintaining their privacy. The stability features, including the stablecoin, contribute to a reliable ecosystem crucial for applications where accuracy and trust are paramount.

By integrating Celo into our project, we align with principles of transparency, security, and accessibility. As we proceed with this tutorial, we will explore how to harness Celo's capabilities to build a robust and user-friendly decentralized incident reporting system.

## Getting Started

### Prerequisites

- Basic understanding of [blockchain concepts](https://www.ibm.com/topics).
- Familiarity with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) and [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/).
- Celo Development Kit (Celo SDK) installed. Follow the tutorial on [Installing Celo Development Kit](https://docs.celo.org/developer-guide/start) to set up the necessary tools for Celo blockchain development.

### Installation

1. Clone the repository and enter into directory:
 ```bash
git clone https://github.com/YourUsername/Anonymous-Incident-Reporting.git

cd Anonymous-Incident-Reporting
```
2. Install dependencies:
```bash
npm install
```
3. Setup the Celo development kit. [Tutorial](https://docs.celo.org/developer-guide/start)
# Step 1: Setting Up the Project:

Begin by creating a new Node.js project and installing the necessary dependencies. Use the following commands in your terminal:

```bash
mkdir decentralized-incident-reporting
cd decentralized-incident-reporting
npm init -y
npm install celo-sdk
```

# Step 2: Smart Contract Development:

Create a smart contract, `AnonymousIncidentReporting.sol`, to handle the submission and retrieval of anonymous incident reports. The contract should ensure the confidentiality of the reporter's identity while providing transparency in the reporting process. Here's a basic example:

```Solidity
// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity >= 0.7.0 < 0.9.0;

contract AnonymousIncidentReporting {
    // Struct to represent an incident report
    struct Report {
        uint256 id;
        address reporter;
        string message;
        uint256 timestamp;
        bool isDecrypted;
    }

    // Array to store incident reports
    Report[] public incidentReports;

    // Mapping to track if a reporter has submitted a report
    mapping(address => bool) public hasReported;

    // Event to be emitted when a new incident report is submitted
    event IncidentReported(address indexed reporter, uint256 reportId);

    /**
     * @dev Allows users to submit anonymous incident reports.
     * @param _message The content of the incident report message.
     * Developers should ensure proper validation and security measures
     * to protect the anonymity of the reporter and the content of the report.
     */
    function submitIncidentReport(string memory _message) public {
        // Ensure the reporter has not already submitted a report
        require(!hasReported[msg.sender], "You have already submitted a report");

        // Create a new incident report
        uint256 reportId = incidentReports.length;
        incidentReports.push(Report(reportId, msg.sender, _message, block.timestamp, false));

        // Mark reporter as having submitted a report
        hasReported[msg.sender] = true;

        // Emit the IncidentReported event
        emit IncidentReported(msg.sender, reportId);
    }


```
The entire code can be found [Here](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/anonymous.sol)

## Security Considerations

During development and deployment of smart contracts it is vital to give prority security in mitigating vulnerabilities and protecting the user's assets. Consider the outlined security measures applied on anonymous.sol

Certainly, let's summarize each security consideration:

### 1. Ensure Secure Coding Practices:

Implementing secure coding practices minimizes vulnerabilities, reducing the risk of common security issues and ensuring the overall security of smart contracts.

- Use checks-effects-interactions pattern to prevent reentrancy attacks.
- Employ safe arithmetic functions or libraries to handle integer overflow and underflow securely.
- Validate and sanitize data received from external contracts or user inputs.
- Conduct thorough code reviews for vulnerability identification.

### 2. Handle Private Keys Responsibly:

Responsible management of private keys is crucial to prevent unauthorized access and manipulation of the smart contract, enhancing overall security.

- Avoid hardcoding private keys; use secure methods for retrieval during deployment.
- Encourage the use of hardware wallets for added security.
- Implement secure key management practices, such as encryption and regular key rotation.

### 3. Be Cautious with External Calls:

Cautious handling of external calls minimizes security risks associated with interactions with external contracts or actors.

- Follow the "Checks-Effects-Interactions" pattern to minimize vulnerabilities.
- Validate inputs and sanitize data before interacting with external entities.
- Thoroughly test and verify the behavior of external contracts before integration.

### 4. Validate Inputs and Permissions:

Validating inputs and permissions prevents unauthorized access and manipulation, ensuring the integrity of the smart contract.

- Use modifiers and require statements to enforce access controls and validate parameters.
- Implement Access Control Lists (ACL) or Role-Based Access Control (RBAC) to manage permissions.
- Regularly review and update access control mechanisms.

### 5. Be Mindful of Gas Limitations:

Optimizing code for gas efficiency enhances the usability and efficiency of the decentralized application, considering the gas limitations of the blockchain network.

- Optimize smart contract code to minimize gas consumption.
- Be aware of the gas limit imposed by the blockchain network.
- Strive for a balance between functionality and gas efficiency.

### Additional Considerations:

  - Conduct regular security audits of the smart contract code to identify and address vulnerabilities.

  - Stay informed about the latest developments in smart contract security and adopt security measures based on evolving standards.

Addressing these considerations collectively contributes to a robust security strategy for decentralized applications on the Celo blockchain. Regular testing, audits, and adherence to best practices are vital components of ensuring a secure and reliable system.
 Regular security audits, testing, and staying informed about smart contract security best practices are crucial.

# Step 3: Deploying the Smart Contract

Deploying your smart contract involves deploying it to the Celo blockchain, making it accessible to users. Here's a step-by-step guide on deploying your smart contract using the Celo Development Kit (Celo SDK).

## Prerequisites:

1. **Celo Account and Private Key:**
   - Ensure you have a Celo account with a sufficient balance for deploying and interacting with the smart contract.
   - Retrieve the private key associated with your Celo account.

2. **Celo Development Kit (Celo SDK):**
   - Make sure you have the Celo Development Kit installed. If not, follow the steps in the [Celo SDK installation guide](https://docs.celo.org/developer-guide/start) to set up the necessary tools.

3. **Compiled Smart Contract:**
   - Ensure your smart contract is compiled into bytecode. You can use tools like `solc` (Solidity Compiler) for this purpose.

4. **Celo Account**

Before deploying the smart contract, make sure you have a Celo account and its private key. If you're new to Celo or need assistance, follow these steps to create a Celo account and ensure the security of your private key:

1. **Create a Celo Account:**
   - Visit the [Celo Wallet](https://celowallet.app/) to create a new Celo account. Follow the on-screen instructions to set up your wallet.

2. **Secure Your Private Key:**
   - Your private key is a sensitive piece of information. Ensure you securely store and backup your private key. Consider using hardware wallets or secure key management practices.

3. **Tutorial: Creating a Celo Account and Securing Private Key:**
   - For a detailed walkthrough, check out the [tutorial](https://docs.celo.org/celo-owner-guide/overview) on creating a Celo account and securing your private key. This tutorial provides step-by-step guidance for a secure setup.



## Deployment Steps:

1. **Configure Celo Environment:**
   - Set up your Celo environment by specifying the network you want to deploy to. In this example, we'll use the Celo Alfajores testnet.

     ```bash
     export CELO_NETWORK=alfajores
     ```

2. **Deploy the Smart Contract:**
   - Use the `deploy` command of the Celo CLI to deploy your smart contract.

     ```bash
     celocli deploy AnonymousIncidentReporting.json --network $CELO_NETWORK
     ```

     This command will prompt you to enter the private key associated with your Celo account for deployment. Provide the private key when prompted.

3. **Verify the Deployment:**
   - After successful deployment, the CLI will provide information about the deployed contract, including its address. Take note of the contract address, as you'll need it to interact with the contract.

4. **Interact with the Smart Contract:**
   - Use the Celo CLI or a custom script to interact with the deployed smart contract. You can perform actions such as submitting incident reports or querying existing reports.

## Example Deployment Script:

Here's an example deployment script using the Celo SDK in JavaScript. Create a new file, e.g., `deploy.js`, and add the following content:

```javascript
const ContractKit = require('@celo/contractkit');
const fs = require('fs');
const path = require('path');

// Initialize connection to the Celo network
const kit = ContractKit.newKit('https://alfajores-forno.celo-testnet.org');

// Set the private key for the account deploying the contract
const privateKey = '<YOUR_PRIVATE_KEY>';
kit.addAccount(privateKey);

// Read the compiled contract data
const contractData = fs.readFileSync(path.resolve(__dirname, 'AnonymousIncidentReporting.json'));
const contractJSON = JSON.parse(contractData);

// Deploy the contract
async function deployContract() {
  const accounts = await kit.web3.eth.getAccounts();
  const from = accounts[0];

  const instance = new kit.web3.eth.Contract(contractJSON.abi);

  // Deploy the contract
  const newContract = await instance.deploy({
    data: contractJSON.bytecode,
  }).send({
    from,
    gas: 5000000, // adjust gas limit as needed
  });

  console.log('Contract deployed at:', newContract.options.address);
}

deployContract();
```
The Code can be found [here](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/deploy.js)

Replace `<YOUR_PRIVATE_KEY>` with the private key associated with your Celo account.

Run the deployment script:

```bash
node deploy.js
```

This script initializes the Celo connection, sets up the account for deployment, and deploys the smart contract. After deployment, it logs the contract address.

Note: Ensure the Celo account used for deployment has enough funds for gas and transaction fees.

Congratulations! Your smart contract is now deployed on the Celo blockchain, and you have the contract address for further interactions.

Make sure to update your frontend application with the deployed contract address in the `app.js` file where indicated. After updating the contract address, you can test the end-to-end functionality of your decentralized anonymous incident reporting application on the Celo testnet.

### Troubleshooting: "Cannot find module" Error

If you encounter an error similar to the one below:

![Error: Cannot find module ](![Alt text](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/Screenshot%20from%202024-01-08%2011-16-41.png))

**Solution:**

This error typically occurs when the specified module or file is not found. Follow these steps to resolve it:

1. **Check File Paths:**
   - Verify that the file specified in the error message (`./AnonymousIncidentReporting.json` in this case) exists in the correct location.

2. **Correct File Paths in Code:**
   - Double-check your code, specifically the paths where you are requiring or importing modules. Ensure that they match the actual file paths.

3. **Ensure File Existence:**
   - Confirm that the file `AnonymousIncidentReporting.json` is present in the expected directory.

If the issue persists, consider checking out [this tutorial](https://www.freecodecamp.org/news/error-cannot-find-module-node-npm-error-solved/) on resolving common Node.js module errors for further guidance.


After running the provided code, you can expect to see the contract address logged to the console. Here's an example result you might see after running deploy.js:
```bash
Contract deployed at: 0xd9145CCE52D386f254917e481eB44e9943F39138
```
The actual address will be different, but it will be similar in structure. This address is where your smart contract is deployed on the Celo blockchain. You can use this address to interact with your smart contract from your frontend application.


# Step 4: Building the Frontend - Developing a Simple Web Interface:

Create a simple web interface using HTML, CSS, and JavaScript to allow users to interact with the decentralized incident reporting application. Here's a basic example:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decentralized Incident Reporting</title>
</head>
<body>
    <h1>Decentralized Incident Reporting</h1>

    <label for="incidentDescription">Incident Description:</label>
    <textarea id="incidentDescription" rows="4" cols="50" placeholder="Enter incident description"></textarea>

    <button onclick="submitIncidentReport()">Submit Incident Report</button>

    <script src="app.js"></script>
</body>
</html>
```
Find the code [here](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/index.html)

## Create a Stylesheet (styles.css)
```css
/* styles.css */

body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    color: #009688;
}

button {
    background-color: #009688;
    color: #fff;
    padding: 10px 15px;
    margin: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

label {
    margin-right: 10px;
}

input {
    padding: 8px;
    margin: 5px;
}

#decryptedReport {
    margin-top: 20px;
    font-weight: bold;
}

```

Find link [here](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/styles.css)

## Create JavaScript file (app.js):

Create a frontend application, `app.js`, to facilitate the interaction with the smart contract. The application should allow users to submit incident reports and retrieve decrypted reports while maintaining the anonymity of the reporters. Here's a basic example:

```javascript
// app.js

const kit = require('@celo/contractkit');
const contract = require('./artifacts/AnonymousIncidentReporting.json'); // The path may deffer depending on where you have deployed from.

// Set up ContractKit
const kitInstance = kit.newKit('https://alfajores-forno.celo-testnet.org');
kitInstance.addAccount(process.env.PRIVATE_KEY);

// Get the deployed contract instance
const incidentReportingContract = new kitInstance.web3.eth.Contract(contract.abi, '0xd9145CCE52D386f254917e481eB44e9943F39138'); // Feel free to Replace with your contract address

// Function to submit an incident report
async function submitIncidentReport() {
    const incidentMessage = document.getElementById('incidentMessage').value;

    try {
        // Call the smart contract function to submit an incident report
        const transaction = await incidentReportingContract.methods.submitIncidentReport(incidentMessage).send({
            from: kitInstance.defaultAccount,
            gas: 500000,
        });

        console.log('Incident report submitted. Transaction Hash:', transaction.transactionHash);
    } catch (error) {
        console.error('Error submitting incident report:', error);
    }
}

// Function to get the decrypted report
async function getDecryptedReport() {
    const reportId = document.getElementById('reportId').value;

    try {
        // Call the smart contract function to get the decrypted report
        const decryptedReport = await incidentReportingContract.methods.getDecryptedReport(reportId).call();

        // Display the decrypted report on the webpage
        document.getElementById('decryptedReport').innerText = `Decrypted Report: ${decryptedReport}`;
    } catch (error) {
        console.error('Error getting decrypted report:', error);
    }
}

// Add event listeners for button clicks
document.getElementById('submitReportBtn').addEventListener('click', async () => {
    try {
        // Attempt to submit an incident report
        await submitIncidentReport();
    } catch (error) {
        // Handle errors by displaying meaningful messages to the user
        console.error("Failed to submit incident report:", error.message);
    }
});

document.getElementById('getReportBtn').addEventListener('click', async () => {
    try {
        // Attempt to get a decrypted report
        await getDecryptedReport();
    } catch (error) {
        // Handle errors by displaying meaningful messages to the user
        console.error("Failed to get decrypted report:", error.message);
    }
});
```
Find the code [here](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/app.js)

## Link to a Tutorial on Creating a Web Interface for a Smart Contract:

To learn more about creating a web interface for a smart contract, you can follow the tutorial [here](https://example-tutorial-link.com). This guide provides step-by-step guidance on building a simple decentralized application frontend using web technologies and Web3.js.

By integrating this frontend with your Celo smart contract, users can easily submit incident reports through a web browser, making the application more accessible and user-friendly.

Remember to replace placeholder values such as the contract address and private key with your actual values before testing your application.

# Step 5: Testing the Application - Hosting and Connecting the Frontend:

Now that we've built the frontend, it's time to host it on a web server and connect it to the deployed smart contract on the Celo blockchain. This step is crucial to allow users to interact with the incident reporting system through a user-friendly interface.

1. **Host the Frontend:**
    - There are various ways to host a simple web application. One common approach is to use GitHub Pages if your repository is hosted on GitHub.
    - Create a new branch in your repository named `gh-pages`.
    - Push your `index.html`, `styles.css` and `app.js` files to this branch.
    - After a few moments, you should be able to access your hosted application at `https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/`.

2. **Connect the Frontend to the Smart Contract:**
    - Open your `app.js` file and locate the line where the contract address is specified. Replace `'0xd9145CCE52D386f254917e481eB44e9943F39138'` with the actual address of your deployed smart contract.

3. **Test the Application:**
    - Open the hosted application in a web browser.
    - Use the provided textarea to enter an incident description and click the "Submit Incident Report" button.
    - Check the browser's console for transaction hashes and potential errors. The JavaScript console can be accessed in most browsers by right-clicking on the page, selecting "Inspect," and navigating to the "Console" tab.

4. **Enhancements (Optional):**
    - Depending on your project requirements, you can enhance the frontend further. For example, you may add user authentication, real-time incident updates, or a more visually appealing design.

5. **Demo and Share:**
    - Share the hosted application link with others to test the decentralized incident reporting system. Provide clear instructions on how users can submit incident reports and observe the transactions on the Celo blockchain.

## Testing Strategies - Frontend

Ensure reliable and secure functionality of the frontend application involves comprehensive testing. Here are strategies for testing the frontend application:

### Frontend Application Testing

#### 1. Unit Testing

- **Purpose:** Verify the functionality of individual components in the frontend application.
- **Tools:** Use testing libraries such as Jest or Mocha for writing and running unit tests.
- **Considerations:** Test user interface components, functions, and interactions with the smart contract.

#### 2. Integration Testing

- **Purpose:** Test the interactions between different components in the frontend application.
- **Tools:** Implement integration tests to validate the flow and communication between various parts of the application.
- **Considerations:** Verify that user actions trigger the expected changes and updates.

#### 3. User Experience Testing

- **Purpose:** Evaluate the overall user experience and usability of the frontend application.
- **Tools:** Conduct manual testing and consider using automated testing tools for UI/UX testing.
- **Considerations:** Test the application on various devices and browsers to ensure a consistent and user-friendly experience.

### Testing on Celo Testnet

Before deploying your decentralized application on the Celo mainnet, it's highly recommended to thoroughly test on the Celo testnet. Testing on the testnet allows you to identify and address potential issues before they impact real users and assets. Follow these steps:

1. Deploy your smart contract and frontend on the Celo testnet.
2. Execute a variety of test scenarios to ensure the correct behavior of your application.
3. Monitor gas costs and optimize your code for efficiency.
4. Perform security audits and address any vulnerabilities identified during testing.

By adopting a comprehensive testing strategy and thoroughly testing on the Celo testnet, you can significantly enhance

### Note

If either the `private key` is incorrect or the `contract address` is incorrect or not deployed, it may result in the buttons not functioning as expected, and error messages might not be displayed.

Make sure to verify that the `private key` is set correctly as an environment variable and that the contract is deployed to the `correct address`. If there are issues, correct them, and the buttons should work as intended.

# Conclusion:
Congratulations! You've accomplished the development of a robust decentralized anonymous incident reporting application on the Celo blockchain. This project showcases the capability of blockchain technology in providing a secure and anonymous platform for reporting sensitive incidents.

## Key Features:

- **Anonymity and Security:** Utilizing the Celo blockchain ensures the anonymity and security of incident reports, allowing users to share information without fear of exposure.

- **Transparency:** The decentralized nature of the application ensures transparency in the reporting process, fostering trust among users.

- **Smart Contract:** The smart contract, `anonymous.sol`, plays a crucial role in handling the submission and retrieval of incident reports while maintaining user confidentiality.

## Next Steps:

Feel free to enhance and extend the project by considering the following:

- **User Authentication:** Implement user authentication mechanisms to add an extra layer of security and accountability.

- **Real-Time Updates:** Integrate real-time updates to keep users informed about the status of their submitted reports and any relevant developments.

- **User-Friendly Interface:** Enhance the frontend (`app.js`) to provide a more intuitive and user-friendly experience, making it accessible to a broader audience.

- **Security Audits:** Conduct thorough security audits regularly to identify and address potential vulnerabilities in the smart contract code.

## Code Repository:

Explore the codebase in the [Anonymous-Incident-Reporting](https://github.com/wecbrams/Anonymous-Incident-Reporting) repository. Feel free to [contribute](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/CONTRIBUTING.md), suggest improvements, or report issues.

## License:

This project is licensed under the [MIT License](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/LICENSE). Refer to the [LICENSE](https://github.com/wecbrams/Anonymous-Incident-Reporting-Platform/blob/master/LICENSE) file for detailed information.
