import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";


function Home() {
    return (
        <div style={{ textAlign: "left", fontSize: 16 }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                <b>Welcome! Circle Game is an NFT social experiment built to test how its players will act when faced with deadlines, peer pressure, and financial rewards.</b>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤓</span>
                <b>Rules of the Game:</b> <br />
                1) An infinite amount of Orange Circles <span style={{ color: "orange" }}>&#11044;</span> are available to mint. Mint price starts at 0.001 ETH each. Every circle minted increases the next mint price by 0.00001 ETH.<br />
                2) There are six tiers of circles:
                {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} (common -> rare). Five circles of one tier can be upgraded to one circle of the next tier (5 <span style={{ color: "orange" }}>&#11044;</span> = 1 <span style={{ color: "green" }}>&#11044;</span>, 5 <span style={{ color: "green" }}>&#11044;</span> = 1 <span style={{ color: "red" }}>&#11044;</span>, and so on).<br />
                3) All the ETH revenue from minting and OpenSea royalties go into "the pot".<br />
                4) Players, at any time, can choose to burn their circles and cash out a percentage of "the pot". Higher tier circles can cash out more than lower tier ones (see below).<br />
                5) The game is designed so that a token value will increase over time when other players mint/burn/sell.<br />
                6) At each tier, a player has four choices:<br />
                &emsp;&emsp;a) accumulate five tokens and upgrade to the next tier token<br />
                &emsp;&emsp;b) sell tokens to another player via OpenSea.<br />
                &emsp;&emsp;c) claim reward and cash out a percentage of "the pot".<br></br>
                &emsp;&emsp;d) hold the tokens and watch their value increase naturally.<br></br>
                7) The game will end exactly 69 days :) after the contract deployment. The player with the rarest set of tokens at this point will be crowned the winner.<br />
                8) Players will be able to cash out their respective portions until exactly a week after the deadline, but upgrading and minting will be locked.<br />
                9) Whatever is left in "the pot" a week after Season 1 concludes will be allocated to the following places: <br />
                &emsp;&emsp;a) 50% will be donated to a web3 cause (DAO, grants, etc) chosen by the winner.<br />
                &emsp;&emsp;b) 30% will go towards funding the Circle Game DAO.<br />
                &emsp;&emsp;b) 10% will be the starting pot for Season 2 of Circle Game.<br />
                &emsp;&emsp;c) 10% will go to developer payments and bug bounties.<br />
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🛠</span>
                <b>How Much Each Tier &#11044; Can Claim:</b><br />

                Pot <span style={{ color: "orange" }}>&#11044;</span> Count = Total <span style={{ color: "orange" }}>&#11044;</span> Minted - Total Adjusted <span style={{ color: "orange" }}>&#11044;</span> Burned
                (1 <span style={{ color: "green" }}>&#11044;</span> = 5 <span style={{ color: "orange" }}>&#11044;</span>, 1 <span style={{ color: "red" }}>&#11044;</span> = 25 <span style={{ color: "orange" }}>&#11044;</span>, etc.)
                <br /> <br />
                <div style={{ color: "orange" }}>Tier 0: 1 &#11044; = 0% of Pot (Must upgrade at least one tier before you can claim)</div>
                <div style={{ color: "green" }}>Tier 1: 1 &#11044; = 5 * 60% of Current Pot Balance / Pot <span style={{ color: "orange" }}>&#11044;</span> Count<br /></div>
                <div style={{ color: "red" }}>Tier 2: 1 &#11044; =  25 * 70% of Current Pot Balance / Pot <span style={{ color: "orange" }}>&#11044;</span> Count (or 16.66 % more than 5 <span style={{ color: "green" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "blue" }}>Tier 3: 1 &#11044; =  125 * 80% of Current Pot Balance / Pot <span style={{ color: "orange" }}>&#11044;</span> Count  (or 14.29 % more than 5 <span style={{ color: "red" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "purple" }}>Tier 4: 1 &#11044; =  625 * 90% of Current Pot Balance / Pot <span style={{ color: "orange" }}>&#11044;</span> Count  (or 12.5 % more than 5 <span style={{ color: "blue" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "pink" }}>Tier 5: 1 &#11044; =  3125 * 100% of Current Pot Balance / Pot <span style={{ color: "orange" }}>&#11044;</span> Count  (or 11.11 % more than 5 <span style={{ color: "purple" }}>&#11044;</span>)<br /></div>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                <b>How The Math Works:</b><br />
                All actions of other players (mint, burn, sell) are designed to increase the value of all existing &#11044;: <br />
                <br />
                <b>Formula</b>: &#11044; Value = Current Pot Balance * Player's Pot % * Constant Tier Multiplier<br /><br />

                <b>Minting: </b>Because the mint price increases each time, the pot balance will grow at a faster rate than one's pot % decreases.<br />
                <br />
                <b>Burning: </b>If claiming at Tiers 1-4 (see section above), only 60-90% of the pot is eligible, so this means one's pot % increases faster than the pot balance decreases.<br /><br />

                <b>Selling: </b>When a player sells to another player, the pot balance will increase due to OpenSea royalties.<br /><br />
            </div>
        </div>
    );
}

export default Home;
