pragma solidity ^0.8.20;

contract Voting {

    uint256 public votesFor;
    uint256 public votesAgainst;

    mapping(address => bool) public hasVoted;

    event Voted(address voter, bool choice);

    modifier notVoted() {
        require(!hasVoted[msg.sender], "You already voted");
        _;
    }

    function voteFor() public notVoted {
        votesFor++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, true);
    }

    function voteAgainst() public notVoted {
        votesAgainst++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, false);
    }

    function getResults()
        public
        view
        returns(uint256, uint256)
    {
        return (votesFor, votesAgainst);
    }

    function totalVotes()
        public
        view
        returns(uint256)
    {
        return votesFor + votesAgainst;
    }
}