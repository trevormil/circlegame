import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}



class Claim extends React.Component {
    constructor(props) {
        super(props);

    }

    getTotalAdjustedTokens = () => {
        let total = 0;
        total += this.props.totalOrangeBalance * (1 + 0.1 * 0) * (5 ** 0);
        total += this.props.totalGreenBalance * (1 + 0.1 * 1) * (5 ** 1);
        total += this.props.totalRedBalance * (1 + 0.1 * 2) * (5 ** 2);
        total += this.props.totalBlueBalance * (1 + 0.1 * 3) * (5 ** 3);
        total += this.props.totalPurpleBalance * (1 + 0.1 * 4) * (5 ** 4);
        total += this.props.totalPinkBalance * (1 + 0.1 * 5) * (5 ** 5);

        return total;
    }

    render() {
        return (
            <div>
                <div style={{ border: "3px solid #cccccc", borderRadius: 4, padding: 16, width: 400, margin: "auto", marginTop: 32, fontSize: 16 }}>
                    <h2>Claim
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}</h2>
                    <br />
                    Claim Values (if game ended now):<br />
                    1 <span style={{ color: "orange" }}>&#11044;</span> = {this.props.numMinted >= 1 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((1 * 1) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />
                    1 <span style={{ color: "green" }}>&#11044;</span> = {this.props.numMinted >= 5 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((5 * 1.1) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />
                    1 <span style={{ color: "red" }}>&#11044;</span> = {this.props.numMinted >= 25 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((25 * 1.2) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />
                    1 <span style={{ color: "blue" }}>&#11044;</span> = {this.props.numMinted >= 125 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((125 * 1.3) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />
                    1 <span style={{ color: "purple" }}>&#11044;</span> = {this.props.numMinted >= 625 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((625 * 1.4) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />
                    1 <span style={{ color: "pink" }}>&#11044;</span> = {this.props.numMinted >= 3125 && this.getTotalAdjustedTokens() > 0 ? truncate("" + ((3125 * 1.5) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)), 6) + " ETH" : "N/A"}<br />

                    <Divider />
                    <div style={{ margin: 8 }}>
                        <div style={{ margin: 8 }}>
                            Your Balances: <br />
                            {this.props.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                            {this.props.greenBalance} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                            {this.props.redBalance} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                            {this.props.blueBalance} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                            {this.props.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                            {this.props.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span>
                            <br />
                            <br />
                            Claimable Amount: <br />
                            <b>{
                                this.props.numMinted >= 1 && this.getTotalAdjustedTokens() > 0 ?
                                    truncate(
                                        "" +
                                        (
                                            this.props.orangeBalance * ((1 * 1) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)) +
                                            this.props.greenBalance * ((5 * 1.1) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)) +
                                            this.props.redBalance * ((25 * 1.2) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)) +
                                            this.props.blueBalance * ((125 * 1.3) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)) +
                                            this.props.purpleBalance * ((625 * 1.4) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9)) +
                                            this.props.pinkBalance * ((3125 * 1.5) / (this.getTotalAdjustedTokens()) * (utils.formatEther(this.props.potBalance) * 0.9))
                                        )
                                        , 6
                                    )
                                    :
                                    0
                            } ETH
                            </b>
                            {/*
                            <Button
                                style={{ marginTop: 8, marginLeft: 8 }}
                                onClick={async () => {
                                    const result = this.props.tx(this.props.writeContracts.CircleGame.endGame(), update => {
                                        console.log("📡 Transaction Update:", update);
                                        if (update && (update.status === "confirmed" || update.status === 1)) {
                                            console.log(" 🍾 Transaction " + update.hash + " finished!");
                                            console.log(
                                                " ⛽️ " +
                                                update.gasUsed +
                                                "/" +
                                                (update.gasLimit || update.gas) +
                                                " @ " +
                                                parseFloat(update.gasPrice) / 1000000000 +
                                                " gwei",
                                            );
                                        }
                                    });
                                    console.log("awaiting metamask/web3 confirm result.", result);
                                    console.log(await result);
                                }}
                            >
                                End Game!
                            </Button>
                            <Button
                                style={{ marginTop: 8, marginLeft: 8 }}
                                onClick={async () => {
                                    const result = this.props.tx(this.props.writeContracts.CircleGame.withdraw(), update => {
                                        console.log("📡 Transaction Update:", update);
                                        if (update && (update.status === "confirmed" || update.status === 1)) {
                                            console.log(" 🍾 Transaction " + update.hash + " finished!");
                                            console.log(
                                                " ⛽️ " +
                                                update.gasUsed +
                                                "/" +
                                                (update.gasLimit || update.gas) +
                                                " @ " +
                                                parseFloat(update.gasPrice) / 1000000000 +
                                                " gwei",
                                            );
                                        }
                                    });
                                    console.log("awaiting metamask/web3 confirm result.", result);
                                    console.log(await result);
                                }}
                            >
                                Withdraw!
                            </Button> */}
                            <br /><br />*Claiming is not available until the game ends, and these values are subject to change.
                        </div>
                        <br />
                        <Button
                            disabled={true}
                            style={{ marginTop: 8, marginLeft: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake([this.props.orangeBalance, this.props.greenBalance, this.props.redBalance, this.props.blueBalance, this.props.purpleBalance, this.props.pinkBalance]), update => {
                                    console.log("📡 Transaction Update:", update);
                                    if (update && (update.status === "confirmed" || update.status === 1)) {
                                        console.log(" 🍾 Transaction " + update.hash + " finished!");
                                        console.log(
                                            " ⛽️ " +
                                            update.gasUsed +
                                            "/" +
                                            (update.gasLimit || update.gas) +
                                            " @ " +
                                            parseFloat(update.gasPrice) / 1000000000 +
                                            " gwei",
                                        );
                                    }
                                });
                                console.log("awaiting metamask/web3 confirm result.", result);
                                console.log(await result);
                            }}
                        >
                            Claim!
                        </Button>

                    </div>

                </div>
                <br />
                <br />
                <br />
            </div >
        );
    }
}

export default Claim;