import { PageHeader } from "antd";
import React from "react";
import { utils } from "ethers";


function truncate(str, maxDecimalDigits) {
    if (str.includes('.')) {
        const parts = str.split('.');
        return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
}

// displays a page header

export default function Header({ potBalance }) {
    return (
        <a href="https://github.com/CircleGame" target="_blank" rel="noopener noreferrer">
            <PageHeader
                title={"Circle Game NFT (Current Pot: " + truncate(utils.formatEther(potBalance), 5) + " ETH)"}
                subTitle="An NFT experiment on risk, scarcity, and game theory."
                style={{ cursor: "pointer" }}
                className="site-page-header"
                avatar={{ src: `${process.env.PUBLIC_URL}/circlegameorange.png` }}
            />
        </a>
    );
}
