import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

class Upgrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orangeBalance: "..",
            greenBalance: "..",
            redBalance: "..",
            blueBalance: "..",
            purpleBalance: "..",
            pinkBalance: "..",
            orangeNumberToUpgrade: 0,
            redNumberToUpgrade: 0,
            blueNumberToUpgrade: 0,
            greenNumberToUpgrade: 0,
            pinkNumberToUpgrade: 0,
            purpleNumberToUpgrade: 0,

        }

        this.fetchOrangeBalance();
        this.fetchRedBalance();
        this.fetchGreenBalance();
        this.fetchBlueBalance();
        this.fetchPinkBalance();
        this.fetchPurpleBalance();
    }

    async fetchGreenBalance() {
        if (this.state.greenBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const greenBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 1);
            this.setState({
                greenBalance: greenBalance.toString()
            })
        }
    }
    async fetchRedBalance() {
        if (this.state.redBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const redBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 2);
            this.setState({
                redBalance: redBalance.toString()
            })
        }
    } async fetchPurpleBalance() {
        if (this.state.purpleBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const purpleBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 4);
            this.setState({
                purpleBalance: purpleBalance.toString()
            })
        }
    }
    async fetchBlueBalance() {
        if (this.state.blueBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const blueBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 3);
            this.setState({
                blueBalance: blueBalance.toString()
            })
        }
    } async fetchPinkBalance() {
        if (this.state.pinkBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const pinkBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 5);
            this.setState({
                pinkBalance: pinkBalance.toString()
            })
        }
    }
    async fetchOrangeBalance() {
        if (this.state.orangeBalance == ".." && this.props.address && this.props.readContracts && this.props.readContracts.CircleGame) {
            const orangeBalance = await this.props.readContracts.CircleGame.balanceOf(this.props.address, 0);
            this.setState({
                orangeBalance: orangeBalance.toString()
            })
        }
    }

    render() {
        if (this.state.orangeBalance == "..") {
            this.fetchOrangeBalance();
        }
        if (this.state.greenBalance == "..") {
            this.fetchGreenBalance();
        }
        if (this.state.blueBalance == "..") {
            this.fetchBlueBalance();
        }
        if (this.state.purpleBalance == "..") {
            this.fetchPurpleBalance();
        }
        if (this.state.pinkBalance == "..") {
            this.fetchPinkBalance();
        }
        if (this.state.redBalance == "..") {
            this.fetchRedBalance();
        }

        return (
            <div>
                <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
                    <h2>Upgrade
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "} (0.01 ETH):</h2>
                        <br />Note: 5 &#11044; of one tier = 1 &#11044; of next tier
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Orange Balance: {" "}
                        {this.state.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span><br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ orangeNumberToUpgrade: e });
                            }}
                        />
                        <Button
                            disabled={this.state.orangeNumberToUpgrade == 0 || this.state.orangeNumberToUpgrade % 5 != 0 || this.state.orangeNumberToUpgrade > this.state.orangeBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgradeCoin(this.state.orangeNumberToUpgrade, 0, { value: utils.parseEther("0.01") }), update => {
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
                                this.setState({ greenBalance: ".." });
                                this.fetchOrangeBalance();
                                this.fetchGreenBalance();
                            }}
                        >
                            Exchange {this.state.orangeNumberToUpgrade} <span style={{ color: "orange" }}>&#11044;</span>->{Math.floor(this.state.orangeNumberToUpgrade / 5)} <span style={{ color: "green" }}>&#11044;</span>!
                        </Button>
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Green Balance: {" "}
                        {this.state.greenBalance} <span style={{ color: "green" }}>&#11044;</span><br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ greenNumberToUpgrade: e });
                            }}
                        />
                        <Button
                            disabled={this.state.greenNumberToUpgrade == 0 || this.state.greenNumberToUpgrade % 5 != 0 || this.state.greenNumberToUpgrade > this.state.greenBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgradeCoin(this.state.greenNumberToUpgrade, 1, { value: utils.parseEther("0.01") }), update => {
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
                                this.setState({ redBalance: ".." });
                                this.setState({ greenBalance: ".." });
                                this.fetchGreenBalance();
                                this.fetchRedBalance();
                            }}
                        >
                            Exchange {this.state.greenNumberToUpgrade} <span style={{ color: "green" }}>&#11044;</span>->{Math.floor(this.state.greenNumberToUpgrade / 5)} <span style={{ color: "red" }}>&#11044;</span>!
                        </Button>
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Red Balance: {" "}
                        {this.state.redBalance} <span style={{ color: "red" }}>&#11044;</span><br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ redNumberToUpgrade: e });
                            }}
                        />
                        <Button
                            disabled={this.state.redNumberToUpgrade == 0 || this.state.redNumberToUpgrade % 5 != 0 || this.state.redNumberToUpgrade > this.state.redBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgradeCoin(this.state.redNumberToUpgrade, 2, { value: utils.parseEther("0.01") }), update => {
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
                                this.setState({ blueBalance: ".." });
                                this.setState({ redBalance: ".." });
                                this.fetchBlueBalance();
                                this.fetchRedBalance();
                            }}
                        >
                            Exchange {this.state.redNumberToUpgrade} <span style={{ color: "red" }}>&#11044;</span>->{Math.floor(this.state.redNumberToUpgrade / 5)} <span style={{ color: "blue" }}>&#11044;</span>!
                        </Button>
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Blue Balance: {" "}
                        {this.state.blueBalance} <span style={{ color: "blue" }}>&#11044;</span><br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ blueNumberToUpgrade: e });
                            }}
                        />
                        <Button
                            disabled={this.state.blueNumberToUpgrade == 0 || this.state.blueNumberToUpgrade % 5 != 0 || this.state.blueNumberToUpgrade > this.state.blueBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgradeCoin(this.state.blueNumberToUpgrade, 3, { value: utils.parseEther("0.01") }), update => {
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
                                this.setState({ purpleBalance: ".." });
                                this.setState({ blueBalance: ".." });
                                this.fetchBlueBalance();
                                this.fetchPurpleBalance();
                            }}
                        >
                            Exchange {this.state.blueNumberToUpgrade} <span style={{ color: "blue" }}>&#11044;</span>->{Math.floor(this.state.blueNumberToUpgrade / 5)} <span style={{ color: "purple" }}>&#11044;</span>!
                        </Button>
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Purple Balance: {" "}
                        {this.state.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span><br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ purpleNumberToUpgrade: e });
                            }}
                        />
                        <Button
                            disabled={this.state.purpleNumberToUpgrade == 0 || this.state.purpleNumberToUpgrade % 5 != 0 || this.state.purpleNumberToUpgrade > this.state.purpleBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.upgradeCoin(this.state.purpleNumberToUpgrade, 4, { value: utils.parseEther("0.01") }), update => {
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
                                this.setState({ pinkBalance: ".." });
                                this.setState({ purpleBalance: ".." });
                                this.fetchPinkBalance();
                                this.fetchPurpleBalance();
                            }}
                        >
                            Exchange {this.state.purpleNumberToUpgrade} <span style={{ color: "purple" }}>&#11044;</span>->{Math.floor(this.state.purpleNumberToUpgrade / 5)} <span style={{ color: "pink" }}>&#11044;</span>!
                        </Button>
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Pink Balance: {" "}
                        {this.state.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span><br />
                    </div>
                    <Divider />
                </div>
            </div>
        );
    }
}

export default Upgrade;