import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="&#11044; Circle Game &#11044;"
        subTitle="An NFT social experiment on risk, scarcity, and game theory."
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
