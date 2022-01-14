import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { utils } from "ethers";

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

function Advanced({ mintPrice, numMinted, numBurned, potBalance }) {
    return (
        <div style={{ textAlign: "left", fontSize: 16 }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🛠</span>
                <b>Claim Value Formulas for Each Tier &#11044;:</b><br />
                Below, we show the formulas used to obtain the claim value of each tier. See Stats tab for current calculations.
                <br />

                <div style={{ color: "orange" }}>1 &#11044; = 0 (Must upgrade at least one tier before you can claim)</div>
                <div style={{ color: "green" }}>1 &#11044; = 60% * Pot Balance * (5 / Weighted Supply)<br /></div>
                <div style={{ color: "red" }}>1 &#11044; = 70% * Pot Balance  * (25 / Weighted Supply) = 16.66 % more than 5 <span style={{ color: "green" }}>&#11044;</span><br /></div>
                <div style={{ color: "blue" }}>1 &#11044; = 80% * Pot Balance * (125 / Weighted Supply) = 14.29 % more than 5 <span style={{ color: "red" }}>&#11044;</span><br /></div>
                <div style={{ color: "purple" }}>1 &#11044; = 90% * Pot Balance * (625 / Weighted Supply) = 12.5 % more than 5 <span style={{ color: "blue" }}>&#11044;</span><br /></div>
                <div style={{ color: "pink" }}>1 &#11044; = 100% * Pot Balance * (3125 / Weighted Supply) = 11.11 % more than 5 <span style={{ color: "purple" }}>&#11044;</span><br /></div>

                <br />
                Weighted Supply = (1 * Supply of <span style={{ color: "orange" }}>&#11044;</span>) +
                (5 * Supply of <span style={{ color: "green" }}>&#11044;</span>) +
                (25 * Supply of <span style={{ color: "red" }}>&#11044;</span>) +
                (125 * Supply of <span style={{ color: "blue" }}>&#11044;</span>) +
                (625 * Supply of <span style={{ color: "purple" }}>&#11044;</span>) +
                (3125 * Supply of <span style={{ color: "pink" }}>&#11044;</span>)<br />*Supply of &#11044; = &#11044; Minted - &#11044; Burned.
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                <b>How The Math Works:</b><br />
                As mentioned in the rules, all actions that other players take (mint/claim/sell) are designed to make existing &#11044; more valuable. Let's explore how below.<br /><br />

                &#11044; Claim Value = Constant &#11044; Multiplier (60%-100%) *  Pot Balance / Weighted Supply.<br />
                Observe how in all three scenarios below, the claim value increases according to the formula.<br /><br />

                1) Mint: Because the mint price increases each time, the pot balance will grow at a faster rate than the weighted supply increases.<br />
                <br />
                2) Claiming: Due to the tier multipliers, 60%-100% of the pot is claimable. If less than 100%, the weighted supply will decrease faster than the pot balance decreases.<br /><br />

                3) Selling: When a player sells to another player, the pot balance will increase due to OpenSea royalties.<br /><br />
            </div>
        </div>
    );
}

export default Advanced;
