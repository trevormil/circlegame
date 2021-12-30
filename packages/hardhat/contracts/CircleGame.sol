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
    
    
    uint256 public constant initialClaimPrice = 10000000000000000; //0.01 ETH
    uint256 public constant upgradeClaimPrice = 10000000000000000; //0.01 ETH
    uint256 public numClaimed;
    uint256 public DEADLINE_TIMESTAMP;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        DEADLINE_TIMESTAMP = block.timestamp + 69 days;
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

    function withdraw() public onlyOwner {
        require(block.timestamp >= DEADLINE_TIMESTAMP + 7 days);
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function claimInitialCoin(uint numberOfTokens) public payable {
        require(block.timestamp <= DEADLINE_TIMESTAMP);
        require(numberOfTokens > 0, "Token amount must be positive");
        require(numClaimed.add(numberOfTokens) <= 5 ** 7, "Purchase would exceed max supply");
        require(initialClaimPrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");
        
        _mint(msg.sender, TIER_SIX_ORANGE, numberOfTokens, "");
        numClaimed = numClaimed.add(numberOfTokens);
    }

    function upgradeCoin(uint numberOfTokens, uint256 coinId) public payable {
        require(block.timestamp <= DEADLINE_TIMESTAMP);
        require(numberOfTokens > 0 && numberOfTokens % 5 == 0, "Token amount must be positive amount and divisible by 5");
        require(coinId >= 0 && coinId < 5, "Not a valid coin ID");
        require(upgradeClaimPrice <= msg.value, "Ether value sent is not correct");
        
        burn(msg.sender, coinId, numberOfTokens);
        _mint(msg.sender, coinId + 1, numberOfTokens / 5, "");
    }

    function claimStake(uint numberOfTokens, uint256 coinId) public {
        require(block.timestamp <= DEADLINE_TIMESTAMP + 7 days);
        require(numberOfTokens > 0, "Token amount must be positive");
        require(coinId > 0 && coinId <= 5, "Not a valid coin ID");
        
        uint256 totalPot = address(this).balance.div(10).mul(5 + coinId);
        uint256 adjustedNumberOfTokens = numberOfTokens * 5 ** coinId;

        uint256 reward = totalPot.div(5**7).mul(adjustedNumberOfTokens);

        burn(msg.sender, coinId, numberOfTokens);
        payable(msg.sender).transfer(reward);
    }
}
