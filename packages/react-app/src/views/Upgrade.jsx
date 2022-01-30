import { Alert, Button, Divider, InputNumber } from "antd";
import React from "react";
import { utils } from "ethers";

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

class Upgrade extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let balances = [this.props.orangeBalance, this.props.greenBalance, this.props.redBalance, this.props.blueBalance, this.props.purpleBalance, this.props.pinkBalance];
        let origBalances = [this.props.orangeBalance, this.props.greenBalance, this.props.redBalance, this.props.blueBalance, this.props.purpleBalance, this.props.pinkBalance];
        let diff = false;
        for (let i = 0; i < 6; i++) {
            if (i < 5 && balances[i] >= 5) {
                let numNextTier = Math.floor(balances[i] / 5);
                balances[i + 1] += numNextTier;
                balances[i] = balances[i] - numNextTier * 5;
            }

            if (balances[i] != origBalances[i]) {
                diff = true;
            }
        }


        return (
            <div>
                {!this.props.address &&

                    <Alert
                        message="Wallet Not Connected"
                        description="To interact with this page, you must connect your wallet via the Connect button in the top right."
                        type="warning"
                        closable
                    />
                }
                <div style={{ border: "3px solid #cccccc", borderRadius: 4, padding: 16, width: 400, margin: "auto", marginTop: 32, fontSize: 16 }}>
                    <h2>Upgrade
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}</h2>
                    <br />5 &#11044; of one tier = 1 &#11044; of next tier
                    <Divider />
                    <div style={{ margin: 8 }}>
                        <div style={{ margin: 8 }}>
                            Current Balances: <br />
                            {this.props.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                            {this.props.greenBalance} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                            {this.props.redBalance} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                            {this.props.blueBalance} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                            {this.props.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                            {this.props.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span>
                            <br />

                        </div>
                        <br />
                        <div style={{ margin: 8 }}>
                            Balances After Upgrading: <br />
                            {balances[0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                            {balances[1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                            {balances[2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                            {balances[3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                            {balances[4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                            {balances[5]} <span style={{ color: "pink" }}>&#11044;</span>
                            <br />

                        </div>
                        <br />
                        <Button
                            disabled={!diff}
                            style={{ marginTop: 8, marginLeft: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgrade(), update => {
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
                            Upgrade!
                        </Button>
                        <Divider />

                        <p>*We recommend upgrading once when you are done accumulating &#11044; to save gas.</p>
                    </div>


                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default Upgrade;