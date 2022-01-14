
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { utils } from "ethers";
import { Button, Divider, InputNumber, Table } from "antd";

const dataSource = [
    {
        key: '1',
        tier: <span style={{ color: "orange" }}>&#11044;</span>,
        weight: "N/A",
        multiplier: 1,
        adjusted: "N/A",
    },
    {
        key: '2',
        tier: <span style={{ color: "green" }}>&#11044;</span>,
        weight: <>1 <span style={{ color: "green" }}>&#11044;</span> will be worth 10% more than 5 <span style={{ color: "orange" }}>&#11044;</span></>,
        multiplier: 1.1,
        adjusted: <>1 <span style={{ color: "green" }}>&#11044;</span> will be worth 10% more than 5 <span style={{ color: "orange" }}>&#11044;</span></>,
    },
    {
        key: '3',
        tier: <span style={{ color: "red" }}>&#11044;</span>,
        weight: <>1 <span style={{ color: "red" }}>&#11044;</span> will be worth 20% more than 25 <span style={{ color: "orange" }}>&#11044;</span></>,
        multiplier: 1.2,
        adjusted: <>1 <span style={{ color: "red" }}>&#11044;</span> will be worth 9.09% more than 5 <span style={{ color: "green" }}>&#11044;</span></>,
    },
    {
        key: '4',
        tier: <span style={{ color: "blue" }}>&#11044;</span>,
        weight: <>1 <span style={{ color: "blue" }}>&#11044;</span> will be worth 30% more than 125 <span style={{ color: "orange" }}>&#11044;</span></>,
        multiplier: 1.3,
        adjusted: <>1 <span style={{ color: "blue" }}>&#11044;</span> will be worth 8.33% more than 5 <span style={{ color: "red" }}>&#11044;</span></>,
    },
    {
        key: '5',
        tier: <span style={{ color: "purple" }}>&#11044;</span>,
        weight: <>1 <span style={{ color: "purple" }}>&#11044;</span> will be worth 40% more than 625 <span style={{ color: "orange" }}>&#11044;</span></>,
        multiplier: 1.4,
        adjusted: <>1 <span style={{ color: "purple" }}>&#11044;</span> will be worth 7.69% more than 5 <span style={{ color: "blue" }}>&#11044;</span></>,
    },
    {
        key: '6',
        tier: <span style={{ color: "pink" }}>&#11044;</span>,
        weight: <>1 <span style={{ color: "pink" }}>&#11044;</span> will be worth 50% more than 3125 <span style={{ color: "orange" }}>&#11044;</span></>,
        multiplier: 1.5,
        adjusted: <>1 <span style={{ color: "pink" }}>&#11044;</span> will be worth 7.14% more than 5 <span style={{ color: "purple" }}>&#11044;</span></>
    },
];

const columns = [
    {
        title: 'Tier',
        dataIndex: 'tier',
        key: 'tier',
    },
    {
        title: 'Multiplier',
        dataIndex: 'multiplier',
        key: 'multipler',
    },
    {
        title: <>How Much More Valuable than the Equivalent <span style={{ color: "orange" }}>&#11044;</span>?</>,
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: <>How Much More Valuable After Upgrading a Tier?</>,
        dataIndex: 'adjusted',
        key: 'adjusted',
    },
];

function Home() {

    return (
        <div style={{ textAlign: "left", fontSize: 16 }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                <b>Welcome! Circle Game is an NFT social experiment built to test how its players will act when faced with deadlines, peer pressure, and financial rewards.</b>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤓</span>
                <b>Rules of the Game</b> <br />
                -There are six tiers of circles:
                {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} (in order). Five circles of one tier can be upgraded to one circle of the next tier (5 <span style={{ color: "orange" }}>&#11044;</span> -> 1 <span style={{ color: "green" }}>&#11044;</span>, 5 <span style={{ color: "green" }}>&#11044;</span> -> 1 <span style={{ color: "red" }}>&#11044;</span>, and so on).<br />
                -An infinite amount of <span style={{ color: "orange" }}>&#11044;</span> are available to mint, starting at 0.001 ETH. Every circle minted increases the next mint price by 0.00001 ETH.<br />
                -All the ETH revenue from minting and OpenSea royalties (2.5% per sale) will go into the pot.<br />
                -The game will last for 28 days after the contract deployment. Minting and upgrading are only available during this time period.<br />
                -Once the game ends, 90% of the pot will be redistributed back to the players.<br />
                &emsp;-Players will be able to burn their {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} to claim the ETH via the Claim tab.<br />
                &emsp;-Claim amounts will be calculated by the tier multipliers below. Higher tier circles are awarded more than lower tier ones.<br />
                &emsp;-Note that due to increasing mint prices and royalties over time, accumulating earlier in the game is more beneficial than later. <br />
                -The player with the rarest set of tokens at the end will get to donate 5% of the pot to a web3 cause (DAO, grants, etc.) of their choice.<br />
                -The final 5% will go towards developer payments, server costs, and bug bounties.<br />
                -The Circle Game DAO also plans to launch after the game concludes. 50% of tokens will be allocated to those who burned their {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}.<br />
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🛠</span>
                <b>Tier Multipliers</b> <br />
                <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
        </div >
    );
}

export default Home;
