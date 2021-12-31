// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


/// @custom:security-contact trevormil@comcast.net
contract CircleGame is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    using SafeMath for uint256;

    uint256 public constant TIER_SIX_ORANGE = 0;
    uint256 public constant TIER_FIVE_GREEN = 1;
    uint256 public constant TIER_FOUR_RED = 2;
    uint256 public constant TIER_THREE_BLUE = 3;
    uint256 public constant TIER_TWO_BLACK = 4;
    uint256 public constant TIER_ONE_YELLOW = 5;
    
    
    uint256 public initialClaimPrice = 1000000000000000; //0.001 ETH
    uint256 public numClaimed;
    uint256 public numBurned;
    uint256 public DEADLINE_TIMESTAMP;

    constructor() ERC1155("https://circlegame.s3.us-east-2.amazonaws.com/{id}.json") {
        DEADLINE_TIMESTAMP = block.timestamp + 69 days; //set deadline to 69 days after deployment
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    //withdraw function for remaining funds; locked until deadline + 1 week
    function withdraw() public onlyOwner {
        require(block.timestamp >= DEADLINE_TIMESTAMP + 7 days, "Locked until week after deadline");
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    //mint original orange coin
    function claimInitialCoin(uint numberOfTokens) public payable {
        require(block.timestamp <= DEADLINE_TIMESTAMP, "Deadline to mint has passed");
        require(numberOfTokens > 0, "Token amt must be >0");
        uint256 currMintPrice = (numberOfTokens - 1).mul(10000000000000).div(2).add(initialClaimPrice);
        require(currMintPrice <= msg.value, "Ether value sent is not enough.");

        _mint(msg.sender, TIER_SIX_ORANGE, numberOfTokens, "");
        numClaimed = numClaimed.add(numberOfTokens);
        initialClaimPrice = initialClaimPrice.add((numberOfTokens).mul(10000000000000));
    }

    function upgradeCoin(uint numberOfTokens, uint256 coinId) public {
        require(block.timestamp <= DEADLINE_TIMESTAMP, "Deadline to upgrade has passed");
        require(numberOfTokens > 0 && numberOfTokens % 5 == 0, "Token amt must be >0 and divisible by 5");
        require(coinId >= 0 && coinId < 5, "Not a valid coin ID");
        
        //burn tokens and mint upgraded ones in a 1:5 ratio
        burn(msg.sender, coinId, numberOfTokens);
        _mint(msg.sender, coinId + 1, numberOfTokens / 5, "");
    }

    function claimStake(uint numberOfTokens, uint256 coinId) public {
        require(block.timestamp <= DEADLINE_TIMESTAMP + 7 days, "Deadline to claim has passed");
        require(numberOfTokens > 0, "Token amount must be positive");
        require(coinId > 0 && coinId <= 5, "Not a valid coin ID");
        require(balanceOf(msg.sender, coinId) >= numberOfTokens, "Token balance not enough");

        
        //set totalPot to max claimable %: 60% for Tier 1 up to 100% for Tier 5
        uint256 totalPot = address(this).balance.div(10).mul(5 + coinId);
        //adjust token weight as if it were converted back to Tier 0 tokens
        uint256 adjustedNumberOfTokens = numberOfTokens * 5 ** coinId;
        uint256 reward = totalPot.div(numClaimed - numBurned).mul(adjustedNumberOfTokens); //calculate reward

        //burn tokens and pay out reward
        burn(msg.sender, coinId, numberOfTokens);
        payable(msg.sender).transfer(reward);
        numBurned = numBurned.add(adjustedNumberOfTokens);
    }

    fallback() external payable {}
    receive() external payable {}   
}
