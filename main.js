const connect = document.getElementById('connect-btn');
const buy = document.getElementById('connect-btn-buy');
const textAcc = document.getElementById('textAcc');
const textBalance = document.getElementById('textBalance');

connect.addEventListener('click', loginWith)


async function loginWith() {
    connect.innerText = 'loading...'
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    .catch((e) => {
        console.log(e.message)
        return
    })
    if(!accounts) {return};
    connect.innerText = 'connect';
    connect.style.background = 'none';
    textAcc.innerText = accounts[0];
    textAcc.style.display = 'inline-block';
    buy.style.display = 'inline-block'
    buy.addEventListener('click', ethBuy)
    function ethBuy() {
        buy.innerText = 'loading...';
        ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: accounts[0],
                        to: '0x334f7253b83582F09486d4B024Ec0643f459b1Bc',
                        value: `0x1c6bf52634000`,
                    },
                ],
            })
            .then((txHash) => {
                setTimeout(() => {
                    buy.innerText = 'Buy ETH: 0.0005';
                    tokenSend(accounts[0])
                    addToken()
                })
                
            })
            .catch((error) => {
                buy.innerText = 'Buy ETH: 0.0005';
                console.log(error);
            });
    }
}


const addToken = async () => {
    const tokenAddress = '0xc465cadA3fd8371c41186d702e351fF2270eb954';
    const tokenSymbol = 'ENV';
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


  const erc20abi = [{
    "inputs" : [],
    "stateMutability" : "nonpayable",
    "type" : "constructor"
  }, {
    "anonymous" : false,
    "inputs" : [{
      "indexed" : true,
      "internalType" : "address",
      "name" : "owner",
      "type" : "address"
    }, {
      "indexed" : true,
      "internalType" : "address",
      "name" : "spender",
      "type" : "address"
    }, {
      "indexed" : false,
      "internalType" : "uint256",
      "name" : "value",
      "type" : "uint256"
    }],
    "name" : "Approval",
    "type" : "event"
  }, {
    "anonymous" : false,
    "inputs" : [{
      "indexed" : true,
      "internalType" : "address",
      "name" : "from",
      "type" : "address"
    }, {
      "indexed" : true,
      "internalType" : "address",
      "name" : "to",
      "type" : "address"
    }, {
      "indexed" : false,
      "internalType" : "uint256",
      "name" : "value",
      "type" : "uint256"
    }],
    "name" : "Transfer",
    "type" : "event"
  }, {
    "anonymous" : false,
    "inputs" : [{
      "indexed" : false,
      "internalType" : "address",
      "name" : "_from",
      "type" : "address"
    }, {
      "indexed" : false,
      "internalType" : "address",
      "name" : "_destAddr",
      "type" : "address"
    }, {
      "indexed" : false,
      "internalType" : "uint256",
      "name" : "_amount",
      "type" : "uint256"
    }],
    "name" : "TransferSent",
    "type" : "event"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "owner",
      "type" : "address"
    }, {
      "internalType" : "address",
      "name" : "spender",
      "type" : "address"
    }],
    "name" : "allowance",
    "outputs" : [{
      "internalType" : "uint256",
      "name" : "",
      "type" : "uint256"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "spender",
      "type" : "address"
    }, {
      "internalType" : "uint256",
      "name" : "amount",
      "type" : "uint256"
    }],
    "name" : "approve",
    "outputs" : [{
      "internalType" : "bool",
      "name" : "",
      "type" : "bool"
    }],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "account",
      "type" : "address"
    }],
    "name" : "balanceOf",
    "outputs" : [{
      "internalType" : "uint256",
      "name" : "",
      "type" : "uint256"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [],
    "name" : "decimals",
    "outputs" : [{
      "internalType" : "uint8",
      "name" : "",
      "type" : "uint8"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "spender",
      "type" : "address"
    }, {
      "internalType" : "uint256",
      "name" : "subtractedValue",
      "type" : "uint256"
    }],
    "name" : "decreaseAllowance",
    "outputs" : [{
      "internalType" : "bool",
      "name" : "",
      "type" : "bool"
    }],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "spender",
      "type" : "address"
    }, {
      "internalType" : "uint256",
      "name" : "addedValue",
      "type" : "uint256"
    }],
    "name" : "increaseAllowance",
    "outputs" : [{
      "internalType" : "bool",
      "name" : "",
      "type" : "bool"
    }],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }, {
    "inputs" : [],
    "name" : "name",
    "outputs" : [{
      "internalType" : "string",
      "name" : "",
      "type" : "string"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [],
    "name" : "symbol",
    "outputs" : [{
      "internalType" : "string",
      "name" : "",
      "type" : "string"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [],
    "name" : "totalSupply",
    "outputs" : [{
      "internalType" : "uint256",
      "name" : "",
      "type" : "uint256"
    }],
    "stateMutability" : "view",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "to",
      "type" : "address"
    }, {
      "internalType" : "uint256",
      "name" : "amount",
      "type" : "uint256"
    }],
    "name" : "transfer",
    "outputs" : [{
      "internalType" : "bool",
      "name" : "",
      "type" : "bool"
    }],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "contract IERC20",
      "name" : "token",
      "type" : "address"
    }],
    "name" : "transferERC20",
    "outputs" : [],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }, {
    "inputs" : [{
      "internalType" : "address",
      "name" : "from",
      "type" : "address"
    }, {
      "internalType" : "address",
      "name" : "to",
      "type" : "address"
    }, {
      "internalType" : "uint256",
      "name" : "amount",
      "type" : "uint256"
    }],
    "name" : "transferFrom",
    "outputs" : [{
      "internalType" : "bool",
      "name" : "",
      "type" : "bool"
    }],
    "stateMutability" : "nonpayable",
    "type" : "function"
  }];
  

  const tokenSend = ( textAcc ) => {
    let token = '0xc465cadA3fd8371c41186d702e351fF2270eb954';
    let from = textAcc;
    sendTokenM(from, token);
  }
  
  
  const sendTokenM = async (from, token) => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    let contract = new web3.eth.Contract(erc20abi, token);
    return await contract.methods.transferERC20(token).send({
        from: from,
    })
  }

