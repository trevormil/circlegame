import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function Home({ yourLocalBalance, readContracts }) {
    // you can also use hooks locally in your component of choice
    // in this case, let's keep track of 'purpose' variable from our contract
    const purpose = useContractReader(readContracts, "YourContract", "purpose");

    return (
        <div style={{ textAlign: "left" }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                <b>Welcome! Circle Game is an NFT social experiment built to test how its players will act when faced with deadlines, peer pressure, and financial rewards.</b>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤓</span>
                <b>How The Game is Played:</b> <br />
                1) An infinite amount of Orange Circles <span style={{ color: "orange" }}>&#11044;</span> are available to mint. Mint price starts at 0.001 ETH each. Every circle minted increases the mint price by 0.00001 ETH.<br />
                2) There are six tiers of circles:
                {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} (common -> rare). Five circles of one tier can be upgraded to one circle of the next tier. Each tier correlates to a claimable percentage of the pot.<br />
                3) All the ETH revenue from minting and OpenSea royalties go into "the pot".<br />
                4) Players, at any time, can choose to burn their tokens and cash out a percentage of "the pot". The rarer the token, the more one is able to cash out. (see below).<br />
                5) The game is designed so that your token value will increase over time when other players mint/burn/sell.<br />
                6) At each tier, a player has four choices:<br />
                &emsp;&emsp;a) accumulate five tokens and upgrade to the next tier token<br />
                &emsp;&emsp;b) sell their tokens to another player via OpenSea.<br />
                &emsp;&emsp;c) claim their reward and cash out their percentage of "the pot".<br></br>
                &emsp;&emsp;d) hold their tokens and watch the value increase naturally as everything gets scarcer/more expensive.<br></br>
                7) The game will end exactly 69 days :) after the contract deployment. The player with the rarest set of tokens at this point will be crowned the winner.<br />
                8) Everyone will be able to cash out their respective portions of the pot until exactly a week after the deadline, but upgrading and minting will be locked.<br />
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
                Yes. Upon minting, your &#11044;'s claim value will not be as much as you initially paid, but that is the point of the game.<br></br>
                By holding, other players will continue to make your tokens more valuable, and you will soon be in the profit (see below).
                <br /><br />

                All actions of other players (mint, burn, sell) are designed to increase the value of your existing &#11044;: <br />
                <br />
                &#11044; Value = Current Pot Balance * Your Pot % * Tier Multiplier (constant)<br /><br />

                <b>Minting: </b>Because the mint price increases each time, the pot balance will grow at a faster rate than your pot % decreases.<br />
                <br />
                <b>Burning: </b>If claiming at Tiers 1-4 (see section above), only 60-90% of the pot is eligible, so that extra 10-40% of the pot means one's pot % increases faster than the pot balance decreases.<br /><br />

                <b>Selling: </b>When a player sells to another player, the pot balance will increase due to OpenSea royalties.<br /><br />

                <br />
                <br />
            </div>
        </div>
    );
}

export default Home;
