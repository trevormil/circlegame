import { utils } from "ethers";
import { Alert, Button, Divider, InputNumber, Table } from "antd";
import React from "react";
import Address from "../components/Address"

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}



class Leaderboard extends React.Component {

    constructor(props) {
        super(props);
    }


    leaders = [
        ["0xed7d5ee1e6da0d22daf50ac38f3a355b36f066c1", [0, 0, 6, 0, 0, 0]],
        ["0x1b336b29adb20121409eb2e6ffc21754408e67d5", [0, 2, 4, 0, 0, 0]],
        ["0x60cd6f29ac6e86e12dfc680e0031e13678b17b4d", [0, 4, 2, 0, 0, 0]],
        ["0x5c38f37710b4b110facab521a9ad6d230f1ecb35", [0, 1, 2, 0, 0, 0]],
        ["0xcb114805b901f7a9c38d5675272ef26459a7d805", [0, 0, 2, 0, 0, 0]],
    ]

    lastUpdated = "1/24/2022";


    dataSource = [
        {
            key: '1',
            tier: 1,
            address: <Address address={this.leaders[0][0]} ensProvider={this.props.mainnetProvider} blockExplorer={this.props.blockExplorer} />,
            balances: <>
                {this.leaders[0][1][0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                {this.leaders[0][1][1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                {this.leaders[0][1][2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                {this.leaders[0][1][3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                {this.leaders[0][1][4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                {this.leaders[0][1][5]} <span style={{ color: "pink" }}>&#11044;</span>
            </>,
        },
        {
            key: '2',
            tier: 2,
            address: <Address address={this.leaders[1][0]} ensProvider={this.props.mainnetProvider} blockExplorer={this.props.blockExplorer} />,
            balances: <>
                {this.leaders[1][1][0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                {this.leaders[1][1][1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                {this.leaders[1][1][2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                {this.leaders[1][1][3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                {this.leaders[1][1][4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                {this.leaders[1][1][5]} <span style={{ color: "pink" }}>&#11044;</span>
            </>,
        },
        {
            key: '3',
            tier: 3,
            address: <Address address={this.leaders[2][0]} ensProvider={this.props.mainnetProvider} blockExplorer={this.props.blockExplorer} />,
            balances: <>
                {this.leaders[2][1][0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                {this.leaders[2][1][1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                {this.leaders[2][1][2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                {this.leaders[2][1][3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                {this.leaders[2][1][4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                {this.leaders[2][1][5]} <span style={{ color: "pink" }}>&#11044;</span>
            </>,
        },
        {
            key: '4',
            tier: 4,
            address: <Address address={this.leaders[3][0]} ensProvider={this.props.mainnetProvider} blockExplorer={this.props.blockExplorer} />,
            balances: <>
                {this.leaders[3][1][0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                {this.leaders[3][1][1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                {this.leaders[3][1][2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                {this.leaders[3][1][3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                {this.leaders[3][1][4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                {this.leaders[3][1][5]} <span style={{ color: "pink" }}>&#11044;</span>
            </>,
        },
        {
            key: '5',
            tier: 5,
            address: <Address address={this.leaders[4][0]} ensProvider={this.props.mainnetProvider} blockExplorer={this.props.blockExplorer} />,
            balances: <>
                {this.leaders[4][1][0]} <span style={{ color: "orange" }}>&#11044;</span>{"  "}
                {this.leaders[4][1][1]} <span style={{ color: "green" }}>&#11044;</span>{"  "}
                {this.leaders[4][1][2]} <span style={{ color: "red" }}>&#11044;</span>{"  "}
                {this.leaders[4][1][3]} <span style={{ color: "blue" }}>&#11044;</span>{"  "}
                {this.leaders[4][1][4]} <span style={{ color: "purple" }}>&#11044;</span>{"  "}
                {this.leaders[4][1][5]} <span style={{ color: "pink" }}>&#11044;</span>
            </>,
        },

    ];

    columns = [
        {
            title: 'Rank',
            dataIndex: 'tier',
            key: 'tier',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },

        {
            title: 'Balances',
            dataIndex: 'balances',
            key: 'balances',
        }
    ];


    render() {
        return (
            <div>
                <div style={{ border: "3px solid #cccccc", borderRadius: 4, padding: 16, width: 800, margin: "auto", marginTop: 32, fontSize: 16 }}>
                    <h2>Leaderboard {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}
                    </h2>
                    <Divider />
                    <h4>Top 5 Current Leaders (Last Updated: {this.lastUpdated})
                    </h4>

                    <Table pagination={false} dataSource={this.dataSource} columns={this.columns} />

                </div>
            </div>
        );
    }
}

export default Leaderboard;