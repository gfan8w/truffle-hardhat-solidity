// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
Commit-Reveal Schemes
提交-公示 模式
区块链是一个开放市场，它要保有私有数据是很困难的。有些应用例如石头剪子布(rock-paper-scissors) 双方需要一个隐私数据，然后同时展示出来 来决定谁输赢。
区块链的问题是无法同时展示出来，如果一个人首先公布出他的内容，就会在网上广播，对方也能看到，对✋🏻方看到后，立刻更改自己数据，使得自己赢的比赛。
commitment schemes 可以解决这种问题。
这个模式包含2阶段：1）提交阶段，选择数据，指定数据，2）公示阶段，揭开数据，检查数据
这个模式运用了一些密码学算法。

简单来说，就是第一次提交一个 根据你出的数字的hash，等双方都出完数字后，进入公示阶段，公示阶段，把数字 和 hash拿出来，重新计算hash，对比hash值是否一样。
来证明你之前出的对不对，从而判定输赢。


参考： https://medium.com/swlh/exploring-commit-reveal-schemes-on-ethereum-c4ff5a777db8
https://github.com/yahgwai/rps
https://go.gitcoin.co/blog/commit-reveal-scheme-on-ethereum


*/


contract RockPaperScissors {
    enum Choice {
        None,
        Rock,
        Paper,
        Scissors
    }

    enum Stage {
        FirstCommit,
        SecondCommit,
        FirstReveal,
        SecondReveal,
        Distribute
    }

    struct CommitChoice {
        address playerAddress;
        bytes32 commitment;
        Choice choice;
    }

    event Commit(address player);
    event Reveal(address player, Choice choice);
    event Payout(address player, uint amount);

    // Initialisation args
    uint public bet;
    uint public deposit;
    uint public revealSpan;

    // State vars
    CommitChoice[2] public players;
    uint public revealDeadline;
    Stage public stage = Stage.FirstCommit;

    constructor(uint _bet, uint _deposit, uint _revealSpan) public {
        bet = _bet;
        deposit = _deposit;
        revealSpan = _revealSpan;
    }


    function commit(bytes32 commitment) public payable {
        // Only run during commit stages
        uint playerIndex;
        if(stage == Stage.FirstCommit) playerIndex = 0;
        else if(stage == Stage.SecondCommit) playerIndex = 1;
        else revert("both players have already played");

        uint commitAmount = bet + deposit;
        require(commitAmount >= bet, "overflow error");
        require(msg.value >= commitAmount, "value must be greater than commit amount");

        // Return additional funds transferred
        if(msg.value > commitAmount) {
            (bool success, ) = msg.sender.call.value(msg.value - commitAmount)("");
            require(success, "call failed");
        }

        // Store the commitment
        players[playerIndex] = CommitChoice(msg.sender, commitment, Choice.None);

        // Emit the commit event
        emit Commit(msg.sender);

        // If we're on the first commit, then move to the second
        if(stage == Stage.FirstCommit) stage = Stage.SecondCommit;
        // Otherwise we must already be on the second, move to first reveal
        else stage = Stage.FirstReveal;
    }

    function reveal(Choice choice, bytes32 blindingFactor) public {
        // Only run during reveal stages
        require(stage == Stage.FirstReveal || stage == Stage.SecondReveal, "not at reveal stage");
        // Only accept valid choices
        require(choice == Choice.Rock || choice == Choice.Paper || choice == Choice.Scissors, "invalid choice");

        // Find the player index
        uint playerIndex;
        if(players[0].playerAddress == msg.sender) playerIndex = 0;
        else if (players[1].playerAddress == msg.sender) playerIndex = 1;
        // Revert if unknown player
        else revert("unknown player");

        // Find player data
        CommitChoice storage commitChoice = players[playerIndex];

        // Check the hash to ensure the commitment is correct
        require(keccak256(abi.encodePacked(msg.sender, choice, blindingFactor)) == commitChoice.commitment, "invalid hash");

        // Update choice if correct
        commitChoice.choice = choice;

        // Emit reveal event
        emit Reveal(msg.sender, commitChoice.choice);

        if(stage == Stage.FirstReveal) {
            // If this is the first reveal, set the deadline for the second one
            revealDeadline = block.number + revealSpan;
            require(revealDeadline >= block.number, "overflow error");
            // Move to second reveal
            stage = Stage.SecondReveal;
        }
        // If we're on second reveal, move to distribute stage
        else stage = Stage.Distribute;
    }


    function distribute() public {
        // To distribute we need:
        // a) To be in the distribute stage OR
        // b) Still in the second reveal stage but past the deadline
        require(stage == Stage.Distribute || (stage == Stage.SecondReveal && revealDeadline <= block.number), "cannot yet distribute");

        // Calculate value of payouts for players
        uint player0Payout;
        uint player1Payout;
        uint winningAmount = deposit + 2 * bet;
        require(winningAmount / deposit == 2 * bet, "overflow error");

        // If both players picked the same choice, return their deposits and bets
        if(players[0].choice == players[1].choice) {
            player0Payout = deposit + bet;
            player1Payout = deposit + bet;
        }
        // If only one player made a choice, they win
        else if(players[0].choice == Choice.None) {
            player1Payout = winningAmount;
        }
        else if(players[1].choice == Choice.None) {
            player0Payout = winningAmount;
        }
        else if(players[0].choice == Choice.Rock) {
            assert(players[1].choice == Choice.Paper || players[1].choice == Choice.Scissors);
            if(players[1].choice == Choice.Paper) {
                // Rock loses to paper
                player0Payout = deposit;
                player1Payout = winningAmount;
            }
            else if(players[1].choice == Choice.Scissors) {
                // Rock beats scissors
                player0Payout = winningAmount;
                player1Payout = deposit;
            }

        }
        else if(players[0].choice == Choice.Paper) {
            assert(players[1].choice == Choice.Rock || players[1].choice == Choice.Scissors);
            if(players[1].choice == Choice.Rock) {
                // Paper beats rock
                player0Payout = winningAmount;
                player1Payout = deposit;
            }
            else if(players[1].choice == Choice.Scissors) {
                // Paper loses to scissors
                player0Payout = deposit;
                player1Payout = winningAmount;
            }
        }
        else if(players[0].choice == Choice.Scissors) {
            assert(players[1].choice == Choice.Paper || players[1].choice == Choice.Rock);
            if(players[1].choice == Choice.Rock) {
                // Scissors lose to rock
                player0Payout = deposit;
                player1Payout = winningAmount;
            }
            else if(players[1].choice == Choice.Paper) {
                // Scissors beats paper
                player0Payout = winningAmount;
                player1Payout = deposit;
            }
        }
        else revert("invalid choice");

        // Send the payouts
        if(player0Payout > 0) {
            (bool success, ) = players[0].playerAddress.call.value(player0Payout)("");
            require(success, 'call failed');
            emit Payout(players[0].playerAddress, player0Payout);
        } else if (player1Payout > 0) {
            (bool success, ) = players[1].playerAddress.call.value(player1Payout)("");
            require(success, 'call failed');
            emit Payout(players[1].playerAddress, player1Payout);
        }

        // Reset the state to play again
        delete players;
        revealDeadline = 0;
        stage = Stage.FirstCommit;
    }

}
