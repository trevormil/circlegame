import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

class Mint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orangeBalance: "..",
            numberToMint: 0
        }

        this.fetchOrangeBalance();
    }

    async fetchOrangeBalance() {
        if (this.state.orangeBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            console.log("FETCH BALANCE", this.props.address, this.props.readContracts);
            const orangeBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 0);
            this.setState({
                orangeBalance: orangeBalance.toString()
            })
        }
    }

    async componentDidUpdate(prevProps) {
        if (this.props.address !== prevProps.address) {
            console.log("COMPONENT UPDATE");
            this.fetchOrangeBalance();
        }
    }


    render() {
        if (this.state.orangeBalance == "..") {
            this.fetchOrangeBalance();
        }

        let mintTotal = (((this.state.numberToMint - 1) * 0.00001) / 2);

        if (this.state.numberToMint == 0 || !this.props.mintPrice) {
            mintTotal = 0;
        }
        else {
            mintTotal += Number(utils.formatEther(this.props.mintPrice));
            mintTotal *= this.state.numberToMint;
        }

        return (
            <div>
                <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
                    <h2>Mint <span style={{ color: "orange" }}>&#11044;</span>!</h2>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Current Starting Mint Price: ({this.props.mintPrice ? utils.formatEther(this.props.mintPrice) : "..."} ETH)<br />
                        Each token minted will add 0.0001 to the mint price. <br />

                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ numberToMint: e });
                            }}
                        />
                        <Button
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimInitialCoin(this.state.numberToMint, { value: utils.parseEther(mintTotal + "") }), update => {
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
                                this.setState({ orangeBalance: ".." });
                                this.fetchOrangeBalance();
                            }}
                        >
                            Mint {this.state.numberToMint ? this.state.numberToMint.toString() : 0} for {mintTotal.toFixed(5)} ETH!
                        </Button>
                    </div>
                    <Divider />
                    Your Balance: {this.state.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span>
                    <Divider />
                    Total <span style={{ color: "orange" }}>&#11044;</span> Minted: {this.props.numMinted ? this.props.numMinted.toString() : 0}<br />
                    Total <span style={{ color: "orange" }}>&#11044;</span> Burned (Adjusted): {this.props.numBurned ? this.props.numBurned.toString() : 0}<br />
                </div>
            </div>
        );
    }
}

export default Mint;