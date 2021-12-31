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
                <b>Potential &#11044; Rewards:</b><br />


                <div style={{ color: "orange" }}>Tier 0: &#11044; = 0% of Pot (Must upgrade at least one tier before you can claim)</div>
                <div style={{ color: "green" }}>Tier 1: &#11044; = Pot Balance * Pot Percentage * 60 % <br /></div>
                <div style={{ color: "red" }}>Tier 2: &#11044; = Pot Balance * Pot Percentage * 70 %  (or 16.66 % more than 5 <span style={{ color: "green" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "blue" }}>Tier 3: &#11044; = Pot Balance * Pot Percentage * 80 %  (or 14.29 % more than 5 <span style={{ color: "red" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "purple" }}>Tier 4: &#11044; = Pot Balance * Pot Percentage * 90 %  (or 12.5 % more than 5 <span style={{ color: "blue" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "pink" }}>Tier 5: &#11044; = Pot Balance * Pot Percentage * 100 %  (or 11.11 % more than 5 <span style={{ color: "purple" }}>&#11044;</span>)<br /></div>
                <br />


                The way you make profit in this game is to hold your tokens until the pot grows.<br />
                For example, let's say you have 1 <span style={{ color: "green" }}>&#11044;</span>, your pot balance is 10%, and the pot is 10 ETH. You can cash out now at 0.6 ETH, but if you wait until the pot grows to 100 ETH, you will have 6 ETH.<br />
                * Also note rule 5) from above, your tokens are designed to only increase in value if you hold.
                <br />
                <br />

                Pot Percentage = Adjusted Balance of <span style={{ color: "orange" }}>&#11044;</span> / (Total <span style={{ color: "orange" }}>&#11044;</span> Minted - Total Adjusted <span style={{ color: "orange" }}>&#11044;</span> Burned) <br />
                * Adjusted means if all converted back to <span style={{ color: "orange" }}>&#11044;</span>, so 1 <span style={{ color: "green" }}>&#11044;</span> = 5 <span style={{ color: "orange" }}>&#11044;</span>, 1 <span style={{ color: "red" }}>&#11044;</span> = 25 <span style={{ color: "orange" }}>&#11044;</span>, etc.
                <br />
                <br />

                Formula: % Claimable = Current Pot Balance * (0.5 + Tier #) * ((# Tokens * 5^Tier #) / (# Minted - # Burned))<br />
                * Tier 0 is not eligible to claim.
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default Home;
