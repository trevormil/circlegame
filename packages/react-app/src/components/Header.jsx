import { PageHeader } from "antd";
import React from "react";
import { utils } from "ethers";

// displays a page header

export default function Header({ potBalance }) {
    return (
        <a href="https://github.com/trevormil/circlegame" target="_blank" rel="noopener noreferrer">
            <PageHeader
                title={"\u2b24 Circle Game \u2b24 (Current Pot: " + utils.formatEther(potBalance) + " ETH)"}
                subTitle="An NFT social experiment on risk, scarcity, and game theory."
                style={{ cursor: "pointer" }}
            />
        </a>
    );
}
