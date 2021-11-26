// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.3.0/contracts/token/ERC20/ERC20Burnable.sol";


contract PickAxe is ERC20, ERC20Burnable {
  address public minter;
  address private owner;

  event MinterChanged(address indexed from, address to);

  constructor() payable ERC20("Sunflower Land PickAxe", "SLP") {
    minter = msg.sender;
    owner = msg.sender;
  }

  function passMinterRole(address farm) public returns (bool) {
    require(msg.sender==minter, "You are not minter");
    minter = farm;

    emit MinterChanged(msg.sender, farm);
    return true;
  }
  
  function getOwner() public view returns (address) {
      return owner;
  }

  function mint(address account, uint256 amount) public {
    require(msg.sender == minter, "You are not the minter");
	_mint(account, amount);
	}

  function burn(address account, uint256 amount) public {
    require(msg.sender == minter, "You are not the minter");
	_burn(account, amount);
  }
  
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        require(msg.sender == minter, "You are not the minter");
        
        _transfer(sender, recipient, amount);
    }
}
