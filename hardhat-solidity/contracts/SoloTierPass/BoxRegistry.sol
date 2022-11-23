// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "hardhat/console.sol";

import "./CloneFactory.sol";
import "./IPassSolo.sol";


//solhint-disable avoid-low-level-calls

/**
 * Socol Tier Registry contract.
 */
contract BoxRegistry is
    CloneFactory,
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    uint32 public constant MAX_VARIATIONS = 0xFF;


    // The total supply of each token id
    mapping(uint64 => address) public contracts;

    address public baseContract;

    // =================== Events =====================
    // Event emitted when a new series of NFTs are created.
    event ContractDeployed(
        uint256 index,
        address contractAddress
    );

    function initialize(address _masterNFT)
        external
        initializer
    {
        baseContract = _masterNFT;

        console.log(
            "initialize %s",
                baseContract
        );
    }


    function createBox(
        uint64 idx,
        string calldata _name,
        uint256 _price
    ) external payable whenNotPaused returns (address newNFT) {
        console.log(
            "createBox index:%s, name: %s, price:%d ",
            idx, _name, _price
        );
        newNFT = createClone(baseContract);

        IPassSolo(newNFT).initialize(
            _name,
            _price
        );
        contracts[idx] = newNFT;

        console.log(
            "createBox done index:%s, name: %s, price:%d ",
            idx, _name, _price
        );

        emit ContractDeployed(idx, newNFT);
    }

    /**
     *  Used to control authorization of upgrade methods
     */
    function _authorizeUpgrade(address newImplementation)
        internal
        view
        override
        onlyOwner
    {
        newImplementation; // silence the warning
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }
}
