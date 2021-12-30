import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

class Claim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orangeBalance: "..",
            greenBalance: "..",
            redBalance: "..",
            blueBalance: "..",
            purpleBalance: "..",
            pinkBalance: "..",
            orangeNumberToClaim: 0,
            redNumberToClaim: 0,
            blueNumberToClaim: 0,
            greenNumberToClaim: 0,
            pinkNumberToClaim: 0,
            purpleNumberToClaim: 0
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
                    <h2>Claim
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}</h2>
                    <br />
                    Current Pot: {this.props.potBalance ? utils.formatEther(this.props.potBalance) : "..."} ETH
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Orange Balance: {" "}
                        {this.state.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span><br />
                        {<div><br />Note: Orange <span style={{ color: "orange" }}>&#11044;</span>'s cant claim anything. Upgrade to claim.</div>}
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Green Balance: {" "}
                        {this.state.greenBalance} <span style={{ color: "green" }}>&#11044;</span><br />
                        {this.state.greenBalance} <span style={{ color: "green" }}>&#11044;</span> = {this.state.greenBalance && this.props.potBalance ? (this.state.greenBalance / 15625) * 0.6 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ greenNumberToClaim: e });
                            }}
                        />
                        <Button
                            disabled={this.state.greenNumberToClaim == 0 || this.state.greenNumberToClaim > this.state.greenBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake(this.state.greenNumberToClaim, 1), update => {
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
                                this.setState({ greenBalance: ".." });
                                this.fetchGreenBalance();
                            }}
                        >
                            Claim Using {this.state.greenNumberToClaim} <span style={{ color: "green" }}>&#11044;</span>!
                        </Button>
                        {this.state.greenBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "red" }}>&#11044;</span> is worth 16.66% more than 5 <span style={{ color: "green" }}>&#11044;</span></div>}
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Red Balance: {" "}
                        {this.state.redBalance} <span style={{ color: "red" }}>&#11044;</span><br />
                        {this.state.redBalance} <span style={{ color: "red" }}>&#11044;</span> = {this.state.redBalance && this.props.potBalance ? (this.state.redBalance / 3125) * 0.7 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ redNumberToClaim: e });
                            }}
                        />
                        <Button
                            disabled={this.state.redNumberToClaim == 0 || this.state.redNumberToClaim > this.state.redBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake(this.state.redNumberToClaim, 2), update => {
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
                                this.fetchRedBalance();
                            }}
                        >
                            Claim Using {this.state.redNumberToClaim} <span style={{ color: "red" }}>&#11044;</span>!
                        </Button>
                        {this.state.redBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "blue" }}>&#11044;</span> is worth 14.29% more than 5 <span style={{ color: "red" }}>&#11044;</span></div>}
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Blue Balance: {" "}
                        {this.state.blueBalance} <span style={{ color: "blue" }}>&#11044;</span><br />
                        {this.state.blueBalance} <span style={{ color: "blue" }}>&#11044;</span> = {this.state.blueBalance && this.props.potBalance ? (this.state.blueBalance / 625) * 0.8 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ blueNumberToClaim: e });
                            }}
                        />
                        <Button
                            disabled={this.state.blueNumberToClaim == 0 || this.state.blueNumberToClaim > this.state.blueBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake(this.state.blueNumberToClaim, 3), update => {
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
                                this.fetchBlueBalance();
                            }}
                        >
                            Claim Using {this.state.blueNumberToClaim} <span style={{ color: "blue" }}>&#11044;</span>!
                        </Button>
                        {this.state.blueBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "purple" }}>&#11044;</span> is worth 12.5% more than 5 <span style={{ color: "blue" }}>&#11044;</span></div>}
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Purple Balance: {" "}
                        {this.state.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span><br />
                        {this.state.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span> = {this.state.purpleBalance && this.props.potBalance ? (this.state.purpleBalance / 125) * 0.9 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ purpleNumberToClaim: e });
                            }}
                        />
                        <Button
                            disabled={this.state.purpleNumberToClaim == 0 || this.state.purpleNumberToClaim > this.state.purpleBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake(this.state.purpleNumberToClaim, 4), update => {
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
                                this.fetchPurpleBalance();
                            }}
                        >
                            Claim Using {this.state.purpleNumberToClaim} <span style={{ color: "purple" }}>&#11044;</span>!
                        </Button>
                        {this.state.purpleBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "pink" }}>&#11044;</span> is worth 11.11% more than 5 <span style={{ color: "purple" }}>&#11044;</span></div>}
                    </div>
                    <Divider />
                    <div style={{ margin: 8 }}>
                        Pink Balance: {" "}
                        {this.state.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span><br />
                        {this.state.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span> = {this.state.pinkBalance && this.props.potBalance ? (this.state.pinkBalance / 25) * 1 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        <InputNumber
                            min={0} max={1000000} defaultValue={0}
                            onChange={e => {
                                this.setState({ pinkNumberToClaim: e });
                            }}
                        />
                        <Button
                            disabled={this.state.pinkNumberToClaim == 0 || this.state.pinkNumberToClaim > this.state.pinkBalance}
                            style={{ marginTop: 8 }}
                            onClick={async () => {
                                const result = this.props.tx(this.props.writeContracts.CircleGame.claimStake(this.state.pinkNumberToClaim, 5), update => {
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
                                this.fetchPinkBalance();
                            }}
                        >
                            Claim Using {this.state.pinkNumberToClaim} <span style={{ color: "pink" }}>&#11044;</span>!
                        </Button>
                        {this.state.pinkBalance >= 5 && <div><br />Note: You are eligible to upgrade</div>}
                    </div>
                    <Divider />
                </div>
            </div >
        );
    }
}

export default Claim;