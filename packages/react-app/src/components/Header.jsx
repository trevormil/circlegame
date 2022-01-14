import { PageHeader } from "antd";
import React from "react";
import { utils } from "ethers";


function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

// displays a page header

export default function Header({ potBalance }) {
    return (
        <a href="https://github.com/CircleGame" target="_blank" rel="noopener noreferrer">
            <PageHeader
                title={"Circle Game (Current Pot: " + truncate(utils.formatEther(potBalance), 5) + " ETH)"}
                subTitle="An NFT experiment on risk, scarcity, and game theory."
                style={{ cursor: "pointer" }}
                className="site-page-header"
                avatar={{ src: `${process.env.PUBLIC_URL}/circlegameorange.png` }}
            />
        </a>
    );
}
