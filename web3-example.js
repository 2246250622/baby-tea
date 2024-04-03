// Import the required dependencies
const Web3 = require('web3');
const contractABI = require('./contractABI.json'); // Replace with your contract ABI
const contractAddress = '0x123456789'; // Replace with your contract address

// Set up Web3 connection
const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-api-key'); // Replace with your Infura API key or desired Ethereum node URL

// Create a new instance of the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example function to interact with the contract
async function interactWithContract() {
  try {
    // Get contract owner
    const owner = await contract.methods.owner().call();
    console.log('Contract Owner:', owner);

    // Get contract balance
    const contractBalance = await web3.eth.getBalance(contractAddress);
    console.log('Contract Balance:', web3.utils.fromWei(contractBalance, 'ether'), 'ETH');

    // Call a contract function with parameters
    const param1 = 123;
    const param2 = 'Hello, World!';
    const result = await contract.methods.myFunction(param1, param2).call();
    console.log('Result:', result);

    // Send a transaction to a contract function with value
    const accounts = await web3.eth.getAccounts();
    const valueToSend = web3.utils.toWei('1', 'ether');
    const tx = await contract.methods.myFunction(param1, param2).send({ from: accounts[0], value: valueToSend });
    console.log('Transaction:', tx);

    // Subscribe to an event
    contract.events.MyEvent({ filter: { param1: 456 } })
      .on('data', event => console.log('Event:', event))
      .on('error', error => console.error('Event Error:', error));

  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to interact with the contract
interactWithContract();
