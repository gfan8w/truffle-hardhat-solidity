// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

import "./IPassSolo.sol";


/**
 * Tier pass NFT contract.
 */
contract PassSolo is IPassSolo, ERC1155 {
    uint16 public constant FEE_DENOMINATOR = 10000;
    uint32 public constant MAX_TOTAL_SUPPLY = 0xFFFFFFFF;

    // The gacha box info struct
    struct GachaBox {
        uint256 price;
    }

    struct GachaBoxSale {
        uint32 totalSold;
    }


    // The name of the NFT series
    string public name;

    bool public initialized;

    GachaBox private box;
    GachaBoxSale private sale;

    // maintain the uri ourselves
    constructor() ERC1155("") {}

    function initialize(
        string calldata _name,
        uint256 _price
    ) external {
        require(!initialized, "Already Initialized");

        name = _name;

        setupBox(_price);

        initialized = true;
    }

    function setupBox(
        uint256 _price
    ) internal {
        GachaBox memory _box = GachaBox({
            price: _price
        });
        box = _box;
    }


    function batchMint(address _onBehalfOf, uint8 _quantity) public payable {
        require(_quantity <= 10, "SOCOL-10");

        uint32 curSeqNum = sale.totalSold;

        for (uint8 i = 0; i < _quantity; i++) {
            mintInner(_onBehalfOf, i);
            curSeqNum += 1;
        }

        sale.totalSold = curSeqNum;
    }

    function mintInner(address _onBehalfOf, uint8 seq)
        internal
        returns (uint8 pos)
    {
        pos = seq;
        _mint(_onBehalfOf, uint256(pos), 1, "");
    }

    function randVariation(uint32 _curSeqNum, uint32 _totalAvailable)
        internal
        view
        returns (uint32)
    {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    blockhash(block.number),
                    _curSeqNum,
                    msg.sender,
                    block.difficulty,
                    block.timestamp
                )
            )
        );
        return uint32(seed % _totalAvailable);
    }


    function tokenURI(uint256 _tokenId) public view returns (string memory) {
        return uri(_tokenId);
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory url)
    {
    }
}
