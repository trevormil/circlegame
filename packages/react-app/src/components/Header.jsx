import { PageHeader } from "antd";
import React from "react";
import { utils } from "ethers";


function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

// displays a page header

export default function Header({ potBalance }) {
    return (
        <a href="https://circlegame.io" target="_blank" rel="noopener noreferrer">
            <PageHeader
                title={"Circle Game (Current Pot: " + truncate(utils.formatEther(potBalance), 5) + " ETH)"}
                subTitle={Math.floor((new Date("02/13/2022").getTime() - Date.now()) / (1000 * 3600 * 24)) + " days left until the game ends!"}
                style={{ cursor: "pointer" }}
                className="site-page-header"
                avatar={{ src: `${process.env.PUBLIC_URL}/circlegameorange.png` }}
            />
        </a>
    );
}
