// SPDX-License-Identifier: MIT
//参考 https://soliditytips.com/articles/compare-strings-solidity
pragma solidity >=0.4.22 <0.9.0;

// 字符串对比，要用keccak256 hash后再对比
contract StringCompare {
    function isSolidity(string memory _language) pure public {
        // Compare string keccak256 hashes to check equality
        if (keccak256(abi.encodePacked('Solidity')) == keccak256(abi.encodePacked(_language))) {
            // do something here...
        }
    }
}


