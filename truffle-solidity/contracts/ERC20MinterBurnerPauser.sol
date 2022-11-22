// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./ERC20PresetMinterPauser.sol";

/**
 * @dev {ERC20} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 *
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the minter and pauser
 * roles, as well as the default admin role, which will let it grant both minter
 * and pauser roles to aother accounts
 */



contract ERC20MinterBurnerPauser is ERC20PresetMinterPauser {

   uint8 private _decimals;

    function decimals() public view  override returns (uint8) {
        return _decimals;
    }

   function _setupDecimals(uint8 decimal) internal {
       _decimals=decimal;
   }

    

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    )  ERC20PresetMinterPauser(name, symbol) {
        _setupDecimals(decimals);
    }
}
