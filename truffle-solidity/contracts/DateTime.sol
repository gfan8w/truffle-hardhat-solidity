// SPDX-License-Identifier: MIT
//参考 https://soliditytips.com/articles/solidity-dates-time-operations/
pragma solidity >=0.4.22 <0.9.0;
contract DateTime {
    uint public a = 3 hours; //  10800 or 3*60*60
    uint public b = 5 minutes; // 300 or 5*60
    uint public d = 2 weeks; // 1209600 or 2*7*24*60*60

    uint public startDate = 1638352800; // 2012-12-01 10:00:00
    uint public endDate = 1638871200; // 2012-12-07 10:00:00

    uint public daysDiff = (endDate - startDate) / 60 / 60 / 24; // 6 days

    uint public later = startDate + 1 days;

    uint public nextYear = startDate + 365 days;

    uint public before = startDate - 3 days;

    uint public prevWeek = startDate - 1 weeks;

    uint deployDate;

    constructor(uint v) {
        deployDate =block.timestamp;
    }

    function isBefore(uint _date1, uint _date2) public returns (bool){

        if(_date1 < _date2) return true;
        return false;
    }

    // Will return `true` if 10 minutes have passed since `the contract was deployed
    function tenMinutesHavePassed() public view returns (bool) {
        //Console.log("block now",block.timestamp);
        return (block.timestamp >= (deployDate + 10 minutes));
    }
}


