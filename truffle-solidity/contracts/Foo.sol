// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Foo is ERC721, ERC721Enumerable, ERC721URIStorage {
    constructor() ERC721("Foo", "foo") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://foo.com/token/";
    }

    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner;
        if (!_exists(tokenId)) {
            owner = address(uint160(tokenId >> 96));
        } else {
            owner = super.ownerOf(tokenId);
        }
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

}
