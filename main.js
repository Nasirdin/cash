const connect = document.getElementById('connect-btn');
const buy = document.getElementById('connect-buy');
const textAcc = document.getElementById('textAcc');
const textBalance = document.getElementById('textBalance');

connect.addEventListener('click', loginWith)
let from;

async function loginWith() {
    connect.innerText = 'loading...'
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    .catch((e) => {
        console.log(e.message)
        return
    })
    if(!accounts) {return};
    from = accounts[0]
    connect.innerText = 'connect';
    connect.style.display = 'none';
    textAcc.innerText = accounts[0];
    textAcc.style.display = 'inline-block';
    buy.style.display = 'inline-block'
    buy.addEventListener('click', sendToken)

}

  const erc20abi = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "_from", "type": "address" },
            { "indexed": false, "internalType": "address", "name": "_destAddr", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256" }
        ],
        "name": "TransferSent",
        "type": "event"
    },
    { "inputs": [], "name": "addressContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }
        ],
        "name": "decreaseAllowance",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "addedValue", "type": "uint256" }
        ],
        "name": "increaseAllowance",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "parther", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "contract IERC20", "name": "token", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "transferErc20",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]




const sendToken = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const amountEth = `${(0.1 * 10 ** 18)}`;
    const token = '0x5cd29b17D1D4762f737E1D2Aaa1e0E5642563C06';
    try{
        const contract = new web3.eth.Contract(erc20abi, token);
        setTimeout(() => {
            addToken(token)
        },1000)
        return await contract.methods.transferErc20(token, from,).send({
            from,
            value: amountEth,
        })
    } catch(error) {
        console.log(error);
    }
    
}

const addToken = async (token) => {
    const tokenAddress = token;
    const tokenSymbol = 'CASH';
    const tokenDecimals = 18;
  
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: 'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-Transparent.png',
          },
        },
      });
  
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }