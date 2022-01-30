
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { utils } from "ethers";
import { Button, Card, Divider, InputNumber, Table } from "antd";

import { Layout, Menu, PageHeader, Row, Col, List, Typography } from 'antd';
import Meta from "antd/lib/card/Meta";

const { Header, Content, Footer, Sider } = Layout;


const dataSource = [
    {
        key: '1',
        tier: <span style={{ color: "orange" }}>&#11044;</span>,
        weight: 1,
        multiplier: 1,
        adjusted: 1,
    },
    {
        key: '2',
        tier: <span style={{ color: "green" }}>&#11044;</span>,
        weight: 5,
        multiplier: 1.1,
        adjusted: 5.5,
    },
    {
        key: '3',
        tier: <span style={{ color: "red" }}>&#11044;</span>,
        weight: 25,
        multiplier: 1.2,
        adjusted: 30
    },
    {
        key: '4',
        tier: <span style={{ color: "blue" }}>&#11044;</span>,
        weight: 125,
        multiplier: 1.3,
        adjusted: 162.5
    },
    {
        key: '5',
        tier: <span style={{ color: "purple" }}>&#11044;</span>,
        weight: 625,
        multiplier: 1.4,
        adjusted: 875
    },
    {
        key: '6',
        tier: <span style={{ color: "pink" }}>&#11044;</span>,
        weight: 3125,
        multiplier: 1.5,
        adjusted: 4687.5
    },
];

const columns = [
    {
        title: 'Tier',
        dataIndex: 'tier',
        key: 'tier',
    },
    {
        title: 'Multiplier',
        dataIndex: 'multiplier',
        key: 'multipler',
    },
    {
        title: <>Equivalent <span style={{ color: "orange" }}>&#11044;</span></>,
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: <>Adjusted Multiplier</>,
        dataIndex: 'adjusted',
        key: 'adjusted',
    },
];


function Home() {

    return (
        <div>
            <Layout>
                <Content style={{ margin: '36px 16px 0' }} >
                    <Row>
                        <Col span={8}>
                            <div style={{ fontSize: 72 }}>

                                {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                                {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                                {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ fontSize: 72 }}>
                                <b>Circle Game</b>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{ fontSize: 72 }}>
                                {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                                {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                                {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div style={{ fontSize: 18 }}>
                                Mint, collect, and upgrade circles to receive Circle Game DAO tokens and ETH once the game concludes on 2/13/2022.
                            </div>
                        </Col>
                    </Row>
                </Content>

                <Content style={{ margin: '32px 16px 0' }}>
                    <Row>
                        <Col span={8} >
                            <Card
                                style={{ border: "3px solid orange", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Mint</div>}
                            >
                                <List
                                    style={{ textAlign: "left" }}
                                    bordered
                                    dataSource={[
                                        "An infinite amount of circles can be minted, starting at 0.001 ETH.",
                                        "Every mint increases the next mint price by 0.00001 ETH for everyone.",
                                        "All ETH revenue from minting and OpenSea royalties go into the pot.",
                                        "Minting closes on 2/13/2022.",
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Typography.Text><span style={{ color: "orange" }}>&#11044;</span></Typography.Text> {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ border: "3px solid green", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Upgrade</div>}
                            >
                                <List
                                    style={{ textAlign: "left" }}
                                    bordered
                                    dataSource={[
                                        <>There are six tiers of circles:{" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                                            {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                                            {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                                            {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                                            {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                                            {" "}<span style={{ color: "pink" }}>&#11044;</span>. Five circles of one tier can be upgraded to one circle of the next tier (5 <span style={{ color: "orange" }}>&#11044;</span> → 1 <span style={{ color: "green" }}>&#11044;</span>, 5 <span style={{ color: "green" }}>&#11044;</span> → 1 <span style={{ color: "red" }}>&#11044;</span>, and so on).
                                        </>,
                                        <>Upgrading enables players to claim more ETH from the pot and be allocated more DAO tokens once the game concludes, as determined by tier multipliers below.</>,
                                        "Upgrading closes on 2/13/2022."
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Typography.Text><span style={{ color: "green" }}>&#11044;</span></Typography.Text> {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                style={{ border: "3px solid red", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Claim</div>}
                            >
                                <List
                                    style={{ textAlign: "left" }}
                                    bordered
                                    dataSource={[
                                        "Once the game ends on 2/13/2022, 90% of the ETH in the pot will be redistributed back to players, along with 50,000,000 Circle Game DAO tokens upon launch (50% of total supply).",
                                        "Players will be able to burn their circles to claim the ETH via the Claim tab. DAO tokens will only be allocated to players who claim.",
                                        "The claim amounts and DAO token allocations will be calculated using the tier multipliers below.",
                                        "5% of the pot will go to the winner (the player with the rarest set of circles). 5% will go to maintenance costs and bug bounties.",
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Typography.Text><span style={{ color: "red" }}>&#11044;</span></Typography.Text> {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Content style={{ margin: '32px 16px 0' }}>
                    <Row>
                        <Col span={12} >
                            <Card
                                style={{ border: "3px solid blue", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Tier Multipliers</div>}
                            >
                                <Table pagination={false} dataSource={dataSource} columns={columns} />
                            </Card>
                        </Col>
                        <Col span={12} >
                            <Card
                                style={{ border: "3px solid purple", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Strategies</div>}
                            >
                                <List
                                    style={{ textAlign: "left" }}
                                    bordered
                                    dataSource={[
                                        "The game is all about getting in early. Your circles' claim amounts are designed to increase over time as the pot grows.",
                                        "By upgrading five circles to the next tier, one can claim 7-10% more than the previous tier. So, players have incentives to collect and upgrade circles.",
                                        "Minting is a bet that the pot will grow over time. You will be paying more for minting than previous players because the mint price increases each time. So initially, the minted circles' claim amounts will not be as much as you spent on minting them. However, their claim amounts will grow over time as other players mint and more royalties are collected.",
                                        "See Simulator for simulating potential claim amounts and token allocations."
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Typography.Text><span style={{ color: "purple" }}>&#11044;</span></Typography.Text> {item}
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <Content style={{ margin: '32px 16px 0' }}>
                    <Row>
                        <Col span={24} >
                            <Card
                                style={{ border: "3px solid pink", borderRadius: 25, marginRight: 5, marginLeft: 5, height: "100%" }}

                                title={<div style={{ fontSize: 48 }}>Meet the Team</div>}
                            >
                                <Row>

                                    <Col span={12} >
                                        <Card

                                            style={{ margin: 36 }}
                                            size="small"

                                            cover={<img alt="example" src="https://lh3.googleusercontent.com/W4iaE4uzdFlaxk1PkYg_Y4MvLdwknqGtlH3UwXPtUgvutoniwsktIxZLNM7dBxrCU8eXM8VFD-lM-eCMrD7PTSmcadOQKw3BkwENNgw=w600" />}
                                        >
                                            <Meta title={<a href="https://twitter.com/trevormil23" target="_blank">trevormil.eth</a>} description="Founder. Developer." />
                                        </Card>
                                    </Col>
                                    <Col span={12} >
                                        <Card
                                            style={{ margin: 36 }}
                                            size="small"

                                            cover={<img alt="example" src="https://lh3.googleusercontent.com/husqX7ZYI-ucBv8IFarLstlSE8aRN52xOurEy6poo811Xlw28AQaF1tUdsAGTDTN-CDjDLpNcDRKBkE0wOFH54M86f_5QNS58uu4UCs=w600" />}
                                        >
                                            <Meta title={<a href="https://twitter.com/beegwizard" target="_blank">beegwizard.eth</a>} description="Community Manager. Marketer." />
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div >
    );
}

export default Home;
