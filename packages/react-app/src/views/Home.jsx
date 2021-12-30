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
                1) 78,125 Orange Circles <span style={{ color: "orange" }}>&#11044;</span> are available to mint initially at 0.01 ETH each.<br />
                2) There are six tiers of circles:
                {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} (common -> rare). <b>Five circles of one tier can be exchanged for one circle of the next tier.</b><br />
                3) All the ETH from minting, upgrading, and OpenSea royalties go into "the pot".<br />
                4) At each tier, a player has four choices:<br />
                &emsp;&emsp;a) accumulate five tokens and upgrade to the next tier token<br />
                &emsp;&emsp;b) sell their tokens to another player via OpenSea<br />
                &emsp;&emsp;c) burn their tokens and cash out their percentage of "the pot". Each tier unlocks more % of the pot (see below).<br></br>
                &emsp;&emsp;d) hold their tokens, watch the pot grow, and watch everything get scarcer.<br></br>
                5) The game will end exactly 69 days :) after the contract deployment. The player with the rarest set of tokens at this point will be crowned the winner.<br />
                6) Everyone will be able to cash out their respective portions of the pot until exactly a week after the deadline, but upgrading and minting will be locked.<br />
                7) Whatever is left in "the pot" a week after Season 1 concludes will be allocated to the following places: <br />
                &emsp;&emsp;a) 50% will be donated to a web3 cause (DAO, grants, etc) chosen by the winner.<br />
                &emsp;&emsp;b) 30% will go towards funding the Circle Game DAO.<br />
                &emsp;&emsp;b) 10% will be the starting pot for Season 2 of Circle Game.<br />
                &emsp;&emsp;c) 10% will go to developer payments and bug bounties.<br />
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🛠</span>
                <b>Potential &#11044; Rewards:</b><br />

                <div style={{ color: "orange" }}>Tier 0 (Max Supply: 78,125 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 0% of Pot (Must upgrade at least one tier before you can claim)</div>
                <div style={{ color: "green" }}>Tier 1 (Max Supply: 15,625 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 0.00384% of Pot <br /></div>
                <div style={{ color: "red" }}>Tier 2 (Max Supply: 3,125 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 0.0224% of Pot (or 16.66 % more than 5 <span style={{ color: "green" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "blue" }}>Tier 3 (Max Supply: 625 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 0.128% of Pot (or 14.29 % more than 5 <span style={{ color: "red" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "purple" }}>Tier 4 (Max Supply: 125 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 0.72% of Pot (or 12.5 % more than 5 <span style={{ color: "blue" }}>&#11044;</span>)<br /></div>
                <div style={{ color: "pink" }}>Tier 5 (Max Supply: 25 Tokens):<br />&emsp;&emsp;Every 1 &#11044; = 4% of Pot (or 11.11 % more than 5 <span style={{ color: "purple" }}>&#11044;</span>)<br /></div>
                <br />
                The way the formula works is that by upgrading a tier, you get access to a higher potential % of the pot.<br /><br />
                Formula: % Claimable = Current Pot Balance * (0.5 + Tier #) * ((# Tokens * 5^Tier #) / 78,125)
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}

export default Home;
