import { utils } from "ethers";
import { Button, Divider, InputNumber } from "antd";
import React from "react";

class Stats extends React.Component {
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
                    <h2>Stats
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}</h2>
                    <br />
                    Current Pot: {this.props.potBalance ? utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    Total <span style={{ color: "orange" }}>&#11044;</span> Minted: {this.props.numMinted ? this.props.numMinted.toString() : 0}<br />
                    Total <span style={{ color: "orange" }}>&#11044;</span> Burned (Adjusted): {this.props.numBurned ? this.props.numBurned.toString() : 0}<br />
                    <Divider />
                    Current Mint Price:<br />
                    1 <span style={{ color: "orange" }}>&#11044;</span> = {this.props.mintPrice ? utils.formatEther(this.props.mintPrice) : "..."} ETH
                    <Divider />
                    Current Token Burn Values:<br />
                    1 <span style={{ color: "green" }}>&#11044;</span> = {(this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((5) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.6 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    1 <span style={{ color: "red" }}>&#11044;</span> = {(this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((25) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.7 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    1 <span style={{ color: "blue" }}>&#11044;</span> = {(this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((125) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.8 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    1 <span style={{ color: "purple" }}>&#11044;</span> = {(this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((625) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.9 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    1 <span style={{ color: "pink" }}>&#11044;</span> = {(this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((3125) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 1 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />

                    <Divider />
                    <div style={{ margin: 8 }}>
                        Your Balances and Current Claim Amounts:<br />
                        {this.state.orangeBalance} <span style={{ color: "orange" }}>&#11044;</span> = 0 ETH<br />

                        {this.state.greenBalance} <span style={{ color: "green" }}>&#11044;</span> = {(this.state.greenBalance && this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((this.state.greenBalance * 5) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.6 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                        {this.state.greenBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "red" }}>&#11044;</span> is worth 16.66% more than 5 <span style={{ color: "green" }}>&#11044;</span></div>}


                        {this.state.redBalance} <span style={{ color: "red" }}>&#11044;</span> = {(this.state.redBalance && this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((this.state.redBalance * 25) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.7 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />

                        {this.state.redBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "blue" }}>&#11044;</span> is worth 14.29% more than 5 <span style={{ color: "red" }}>&#11044;</span></div>}

                        {this.state.blueBalance} <span style={{ color: "blue" }}>&#11044;</span> = {(this.state.blueBalance && this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((this.state.blueBalance * 125) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.8 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />

                        {this.state.blueBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "purple" }}>&#11044;</span> is worth 12.5% more than 5 <span style={{ color: "blue" }}>&#11044;</span></div>}

                        {this.state.purpleBalance} <span style={{ color: "purple" }}>&#11044;</span> = {(this.state.purpleBalance && this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((this.state.purpleBalance * 625) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 0.9 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />

                        {this.state.purpleBalance >= 5 && <div><br />Note: You are eligible to upgrade<br />1 <span style={{ color: "pink" }}>&#11044;</span> is worth 11.11% more than 5 <span style={{ color: "purple" }}>&#11044;</span></div>}

                        {this.state.pinkBalance} <span style={{ color: "pink" }}>&#11044;</span> = {(this.state.pinkBalance && this.props.potBalance && this.props.numMinted && this.props.numBurned) ? ((this.state.pinkBalance * 3125) / (this.props.numMinted.toNumber() - this.props.numBurned.toNumber())) * 1 * utils.formatEther(this.props.potBalance) : "..."} ETH<br />
                    </div>
                    {<div>Note: Orange <span style={{ color: "orange" }}>&#11044;</span>'s cant claim anything.</div>}

                    <Divider />
                </div>
            </div >
        );
    }
}

export default Stats;