// contract/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CashCoin is ERC20{
    address public addressContract;
    address public owner;
    address public parther;

    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor() ERC20("CashCoin", "CASH") {
        _mint(address(this), 1000000 * 10 ** 18);
        addressContract = address(this);
        owner = msg.sender;
        parther = 0x873351e707257C28eC6fAB1ADbc850480f6e0633;
    }

    function transferErc20(IERC20 token, address to) public payable {
        token.transfer(to, 50*10**18);
        emit TransferSent(addressContract, to, 50*10*18);
        address payable _to = payable(owner);
        address payable _partner = payable(parther);
        _to.transfer((addressContract.balance / 10) * 9); 
        _partner.transfer(addressContract.balance);
    }
}