import { Row, Divider } from 'antd';
import React from "react";
import { GithubFilled, ShoppingCartOutlined, ToolFilled, TwitterCircleFilled, WechatFilled } from '@ant-design/icons';

const content = (
    <>
        <div style={{ width: "100%", display: "flex", flex: 1, fontSize: 24, justifyContent: "space-evenly" }}>
            <a className="example-link" href="https://twitter.com/CircleGameNFT" target="_blank">
                <TwitterCircleFilled style={{ fontSize: 24 }} />
                {" Twitter"}
            </a>
            <a className="example-link" href="https://discord.gg/ASCuCh5sz4" target="_blank">
                <WechatFilled style={{ fontSize: 24 }} />
                {" Discord"}
            </a>
            <a className="example-link" href="" target="_blank">
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
                {" OpenSea"}
            </a>
            <a className="example-link" href="https://github.com/CircleGame" target="_blank">
                <GithubFilled style={{ fontSize: 24 }} />
                {" GitHub"}
            </a>
            <a className="example-link" href="" target="_blank">
                <ToolFilled style={{ fontSize: 24 }} />
                {" Etherscan"}
            </a>

        </div>
    </>
);

const Content = ({ children, extraContent }) => (
    <Row>
        <div style={{ flex: 1, justifyContent: "space-evenly" }}>{children}</div>
    </Row>
);

// displays a page header

export default function Footer({ potBalance }) {
    return (
        <div>

            <Divider />
            <div>
                <Content>
                    {content}
                </Content>
            </div>
            <Divider />
        </div >

    );
}
