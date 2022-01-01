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
        require(block.timestamp >= DEADLINE_TIMESTAMP + 7 days, "Locked");
        payable(msg.sender).transfer(address(this).balance);
    }

    /* Mint initial tier 0 coin. Mint price starts at 0.001 ETH and goes up by 0.00001 every time one is minted */
    function claimInitialCoin(uint numberOfTokens) public payable {
        require(block.timestamp <= DEADLINE_TIMESTAMP, "Deadline to mint has passed");
        require(numberOfTokens > 0, "numTokens <=0");

        //Calculate total fee for minting according to formula
        uint256 currMintPrice = (numberOfTokens - 1).mul(10000000000000).div(2).add(initialClaimPrice);
        require(currMintPrice <= msg.value, "ETH value sent is not enough.");

        //Update mint price and numClaimed counter
        numClaimed = numClaimed.add(numberOfTokens);
        initialClaimPrice = initialClaimPrice.add((numberOfTokens).mul(10000000000000));

        //Mint the tokens
        _mint(msg.sender, TIER_SIX_ORANGE, numberOfTokens, "");
    }

    /* Upgrade 5 coins from one tier to next. numTokens parameter must be divisible by 5. */
    function upgradeCoin(uint numberOfTokens, uint coinId) public {
        require(block.timestamp <= DEADLINE_TIMESTAMP, "Locked");
        require(numberOfTokens > 0 && numberOfTokens % 5 == 0, "numTokens <=0 or not divisible by 5");
        require(coinId >= 0 && coinId < 5, "Invalid coinId");
        
        /* Burn tokens and mint upgraded ones in a 1:5 ratio */
        burn(msg.sender, coinId, numberOfTokens);
        _mint(msg.sender, coinId + 1, numberOfTokens / 5, "");
    }

    /* Claim one's portion of the pot by burning their tokens. Higher the tier, more claimable %. */
    function claimStake(uint numberOfTokens, uint coinId) public {
        require(block.timestamp <= DEADLINE_TIMESTAMP + 7 days, "Locked");
        require(numberOfTokens > 0, "numTokens <= 0");
        require(coinId > 0 && coinId <= 5, "Invalid coinId");
        require(balanceOf(msg.sender, coinId) >= numberOfTokens, "Token balance not enough");
        
        /* Total possible pot is 60% for Tier 1, 70% for Tier 2, up to 100% for Tier 5*/
        uint256 totalPot = address(this).balance.div(10).mul(5 + coinId);

        /* Calculate payout according to numBurned, numClaimed, numberOfTokens, and coinId.  */
        uint256 adjustedNumberOfTokens = numberOfTokens * 5 ** coinId;
        uint256 reward = totalPot.div(numClaimed.sub(numBurned)).mul(adjustedNumberOfTokens);

        /* Burn tokens and payout reward */
        numBurned = numBurned.add(adjustedNumberOfTokens);
        burn(msg.sender, coinId, numberOfTokens);
        payable(msg.sender).transfer(reward);
    }

    fallback() external payable {}
    receive() external payable {}   
}
