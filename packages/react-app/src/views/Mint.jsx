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

        return (
            <div>
                <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
                    <h2>Mint <span style={{ color: "orange" }}>&#11044;</span> (0.01 ETH each):</h2>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ numberToMint: e });
                            }}
                        />
                        <Button
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimInitialCoin(this.state.numberToMint, { value: utils.parseEther(0.01 * this.state.numberToMint + "") }), update => {
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
                            Mint {this.state.numberToMint ? this.state.numberToMint.toString() : 0}!
                        </Button>
                    </div>
                    <Divider />
                    Your Balance: {this.state.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span>

                    <Divider />
                    Total Num Minted: {this.props.numMinted ? this.props.numMinted.toString() : 0} / 78,125
                </div>
            </div>
        );
    }
}

export default Mint;