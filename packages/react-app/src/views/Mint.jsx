import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

function truncate(str, maxDecimalDigits) {
    return "" +  parseFloat(Number(str).toFixed(maxDecimalDigits));
}

class Mint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberToMint: 0
        }
    }


    render() {
        let mintTotal = (((this.state.numberToMint - 1) * 0.00001) / 2);

        if (this.state.numberToMint == 0 || !this.props.mintPrice) {
            mintTotal = 0;
        }
        else {
            mintTotal += Number(utils.formatEther(this.props.mintPrice));
            mintTotal *= this.state.numberToMint;
        }

        const balances = [this.state.numberToMint, 0, 0, 0, 0, 0];
        for (let i = 0; i < 6; i++) {
            if (i < 5 && balances[i] >= 5) {
                let numNextTier = Math.floor(balances[i] / 5);
                balances[i + 1] += numNextTier;
                balances[i] = balances[i] - numNextTier * 5;
            }
        }

        return (
            <div>
                <div style={{ border: "3px solid #cccccc", borderRadius: 4, padding: 16, width: 400, margin: "auto", marginTop: 32, fontSize: 16 }}>
                    <h2>Mint <span style={{ color: "orange" }}>&#11044;</span></h2>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Starting Mint Price: {this.props.mintPrice ? utils.formatEther(this.props.mintPrice) : "..."} ETH<br />

                        Total <span style={{ color: "orange" }}>&#11044;</span> Minted: {this.props.numMinted ? this.props.numMinted.toString() : 0}<br />


                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            value={this.state.numberToMint}
                            onChange={e => {
                                this.setState({ numberToMint: e });
                            }}
                        />
                        <Button
                            disabled={this.state.numberToMint == 0}
                            style={{ marginTop: 8, marginLeft: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.mint(this.props.address, 0, this.state.numberToMint, { value: utils.parseEther(truncate(mintTotal + "", 8)) }), update => {
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

                                console.log("awaiting metamask/web3 confirm result...", result);
                                console.log(await result);
                                this.setState({ numberToMint: 0 })
                            }}
                        >
                            Mint {this.state.numberToMint ? this.state.numberToMint.toString() : 0} for {mintTotal.toFixed(5)} ETH!
                        </Button>
                        <br />
                        <br />
                        You Will Receive: <br />
                        {balances[0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                        {balances[1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                        {balances[2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                        {balances[3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                        {balances[4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                        {balances[5]} <span style={{ color: "pink" }}>&#11044;</span>
                        <br />
                        <br />
                        *Each mint adds 0.00001 ETH to the next mint price.
                    </div>

                    {this.props.address && <>

                        <Divider />
                        <div style={{ margin: 8 }}>
                            Your Balances: <br />
                            {this.props.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                            {this.props.greenBalance} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                            {this.props.redBalance} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                            {this.props.blueBalance} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                            {this.props.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                            {this.props.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span>
                            <br />
                        </div>
                    </>}
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Total Pot Balances: <br />
                        {this.props.totalOrangeBalance} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                        {this.props.totalGreenBalance} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                        {this.props.totalRedBalance} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                        {this.props.totalBlueBalance} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                        {this.props.totalPurpleBalance} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                        {this.props.totalPinkBalance} <span style={{ color: "pink" }}>&#11044;</span>
                        <br />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>
        );
    }
}

export default Mint;