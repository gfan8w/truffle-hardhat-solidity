// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library  QuickSort {

        struct AddressWars {
            uint wars;
            address addr;
        }

    function sort(AddressWars[] memory data) public pure returns(AddressWars[] memory) {
        quickSort(data, int(0), int(data.length - 1));
        return data;
    }

    function quickSort(AddressWars[] memory arr, int left, int right) internal pure{
        int i = left;
        int j = right;
        if(i==j) return;
        uint pivot = arr[uint(left + (right - left) / 2)].wars;
        while (i <= j) {
            while (arr[uint(i)].wars < pivot) i++;
            while (pivot < arr[uint(j)].wars) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
}

