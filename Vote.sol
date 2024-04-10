pragma solidity ^0.8.0;

contract Voting {
    // 投票選項
    struct Option {
        string name;
        uint256 voteCount;
    }
    
    // 投票人
    struct Voter {
        bool hasVoted;
        uint256 votedOption;
    }
    
    // 投票選項數組
    Option[] public options;
    
    // 投票人映射
    mapping(address => Voter) public voters;
    
    // 添加投票選項
    function addOption(string memory _name) public {
        options.push(Option(_name, 0));
    }
    
    // 獲取投票選項數量
    function getOptionCount() public view returns (uint256) {
        return options.length;
    }
    
    // 投票
    function vote(uint256 _optionIndex) public {
        require(_optionIndex < options.length, "Invalid option index");
        require(!voters[msg.sender].hasVoted, "You have already voted");
        
        options[_optionIndex].voteCount++;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedOption = _optionIndex;
    }
    
    // 獲取指定選項的票數
    function getVoteCount(uint256 _optionIndex) public view returns (uint256) {
        require(_optionIndex < options.length, "Invalid option index");
        
        return options[_optionIndex].voteCount;
    }
}