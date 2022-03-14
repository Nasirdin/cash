// contract/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{
    mapping (address => uint) public payments;
    uint public smartContractBalance;

    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor() ERC20("Token", "ENV") {
        _mint(address(this), 1000000 * 10 ** 18);
    }

    function transferErc20(IERC20 token, address to, uint256 amount) public payable {
        payments[msg.sender] = amount;
        token.transfer(to, 50*10**18);
        emit TransferSent(address(this), to, 50*10*18);
        address payable _to = payable(to);
        _to.transfer(address(this).balance);
    }
}

// 0xe6F58D39756B6b5279D332426F8B63A51B54bF6D  address smartContract