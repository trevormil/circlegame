import { utils } from "ethers";
import { Divider, InputNumber } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { themesList } from "web3modal";

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}
class Stats extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            additionalMinted: 0,
            additionalRoyalties: 0
        }
    }




    render() {
        return (
            <div>
                <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 32, fontSize: 16 }}>
                    <h2>Stats
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}</h2>
                    <br />
                    Current Pot: {this.props.potBalance ? truncate("" + utils.formatEther(this.props.potBalance), 6) : "..."} ETH<br />

                    Current <span style={{ color: "orange" }}>&#11044;</span> Mint Price: {this.props.mintPrice ? truncate("" + utils.formatEther(this.props.mintPrice), 6) : "..."} ETH<br />

                    Total <span style={{ color: "orange" }}>&#11044;</span> Minted: {this.props.numMinted ? this.props.numMinted.toString() : 0}<br />

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
                </div>
                {!this.props.address && <><br /><br /><br /><br /></>}
            </div >
        );
    }
}

export default Stats;