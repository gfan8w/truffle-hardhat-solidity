// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


/**
 * Tier pass NFT contract.
 */
interface IPassSolo {
    function initialize(
        string calldata _name,
        uint256 _price
    ) external;
}
