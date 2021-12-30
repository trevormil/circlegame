import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 */
function About({ yourLocalBalance, readContracts }) {
    // you can also use hooks locally in your component of choice
    // in this case, let's keep track of 'purpose' variable from our contract
    const purpose = useContractReader(readContracts, "YourContract", "purpose");

    return (
        <div style={{ textAlign: "left" }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>📝</span>
                GitHub:
                <span
                    className="highlight"
                    style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
                >
                    packages/react-app/views/Home.jsx
                </span>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤓</span>
                Discord: {" "}
                <span
                    className="highlight"
                    style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
                >
                    {purpose}
                </span>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤖</span>
                OpenSea: {" "}
                <span
                    className="highlight"
                    style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
                >
                    {purpose}
                </span>
            </div>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🤖</span>
                Etherscan: {" "}
                <span
                    className="highlight"
                    style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
                >
                    {purpose}
                </span>
            </div>

        </div>
    );
}

export default About;