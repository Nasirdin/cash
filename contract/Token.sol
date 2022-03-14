// contract/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CashCoin is ERC20{
    address public addressContract;
    address public owner;
    mapping (address => uint) public payments;
    uint public smartContractBalance;

    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor() ERC20("CashCoin", "CASH") {
        _mint(address(this), 1000000 * 10 ** 18);
        addressContract = address(this);
        owner = msg.sender;
    }

    function transferErc20(IERC20 token, address to) public payable {
        payments[owner] = msg.value;
        token.transfer(to, 50*10**18);
        emit TransferSent(addressContract, to, 50*10*18);address payable _to = payable(owner);
        _to.transfer(addressContract.balance);
        
    }
}