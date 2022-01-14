
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { utils } from "ethers";
import { Button, Divider, InputNumber, Checkbox } from "antd";

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

let ownAction = false;
function onChange(e) {
    ownAction = e;
}

const Action = {
    Mint: 0,
    Claim: 1,
    Sell: 2,
};

const Color = {
    Green: 1,
    Red: 2,
    Blue: 3,
    Purple: 4,
    Pink: 5
};

const htmlColorNames = ["orange", "green", "red", "blue", "purple", "pink"];

const Performer = {
    You: 'You',
    Other: 'Other players'
}

function getBalances(currBalances) {
    console.log(currBalances);
    for (let i = 0; i < 6; i++) {
        if (i < 5 && currBalances[i] >= 5) {
            let numNextTier = Math.floor(currBalances[i] / 5);
            currBalances[i + 1] = numNextTier;
            currBalances[i] = currBalances[i] - numNextTier * 5;
        }
    }
    return currBalances;
}

function Simulator({ potBalance, numMinted, numBurned }) {
    const [yourBalances, setBalances] = useState([0, 0, 0, 0, 0, 0]);

    const [b_potBalance, setB_PotBalance] = useState(0);
    const [b_numBurned, setB_NumBurned] = useState(0);
    const [b_numMinted, setB_NumMinted] = useState(0);

    const [you_spent, setYou_Spent] = useState(0);
    const [you_received, setYou_Received] = useState(0);
    const [you_numBurned, setYou_NumBurned] = useState(0);
    const [you_numMinted, setYou_NumMinted] = useState(0);
    const [b_royalties, setB_Royalties] = useState(0);

    const [b_actions, setB_Actions] = useState([]);
    const [b_actionsStr, setB_ActionsStr] = useState([]);
    const [d_actionsStr, setD_ActionsStr] = useState([]);
    const [otherPlayers_actionsStr, setA_ActionsStr] = useState([]);
    const [d_potBalance, setD_PotBalance] = useState(0);
    const [d_numBurned, setD_NumBurned] = useState(0);
    const [d_numMinted, setD_NumMinted] = useState(0);
    const [d_royalties, setD_Royalties] = useState(0);
    const [d_actions, setD_Actions] = useState([]);
    const [otherPlayers_potBalance, setA_PotBalance] = useState(0);
    const [otherPlayers_numBurned, setA_NumBurned] = useState(0);
    const [otherPlayers_numMinted, setA_NumMinted] = useState(0);
    const [otherPlayers_actions, setA_Actions] = useState([]);
    const [otherPlayers_royalties, setA_Royalties] = useState(0);

    const [b_numToMint, setB_NumToMint] = useState(0);
    const [b_numRoyaltiesToCollect, setB_NumRoyaltiesToCollect] = useState(0);
    const [b_greenToClaim, setB_GreenToClaim] = useState(0);
    const [b_redToClaim, setB_RedToClaim] = useState(0);
    const [b_blueToClaim, setB_BlueToClaim] = useState(0);
    const [b_purpleToClaim, setB_PurpleToClaim] = useState(0);
    const [b_pinkToClaim, setB_PinkToClaim] = useState(0);

    const [otherPlayersBalances, setOtherPlayersBalances] = useState([0, 0, 0, 0, 0, 0]);
    const [otherPlayers_numToMint, setA_NumToMint] = useState(0);
    const [defaultParams, setDefaultParams] = useState([0, 0, 0, 0, [0, 0, 0, 0, 0, 0], 0, 0, 0, 0]);

    const getStartingMintCost = (prevMinted) => {
        return Number((prevMinted * 0.00001 + 0.001))
    }

    //check and throw errors if stuff changes
    const calculate = (actions, potBalance, numMinted, numBurned, royalties, currBalances, you_numMinted, you_numBurned, you_spent, you_received) => {

        let actionsStrs = [];
        for (const action of actions) {
            if (action[1] == Action.Mint) {
                action[2] = Math.floor(action[2]);
                const startingCost = getStartingMintCost(numMinted);
                const totalCost = Number((((action[2] - 1) / 2) * action[2] * 0.00001) + Number((numMinted * 0.00001 + 0.001) * action[2]));
                numMinted += action[2];
                potBalance += totalCost;
                if (action[0] == Performer.You) {
                    you_numMinted += action[2];
                    you_spent += totalCost;
                }
                actionsStrs.push(<>{`${action[0]} minted ${action[2]} `} <span style={{ color: "orange" }}>&#11044;</span> {` for a total cost of ${truncate("" + totalCost, 6)} ETH (${truncate("" + (totalCost / action[2]), 6)} ETH avg.)`}</>);
            } else if (action[1] == Action.Sell) {
                actionsStrs.push(`Collected ${truncate("" + action[2], 6)} ETH in royalties at 2.5% per sale`);
                potBalance += action[2];
                royalties += action[2];
            } else if (action[1] == Action.Claim) {
                action[3] = Math.floor(action[3]);
                let adjustMultiplier = 0;
                let tierMultiplier = 0;
                let adjustedNum = 0;
                if (action[2] == Color.Green) {
                    adjustMultiplier = 5;
                    tierMultiplier = 0.6;
                    adjustedNum = action[3] * adjustMultiplier;
                } else if (action[2] == Color.Red) {
                    adjustMultiplier = 25;
                    tierMultiplier = 0.7;
                    adjustedNum = action[3] * adjustMultiplier;
                } else if (action[2] == Color.Blue) {
                    adjustMultiplier = 125;
                    tierMultiplier = 0.8;
                    adjustedNum = action[3] * adjustMultiplier;
                } else if (action[2] == Color.Purple) {
                    adjustMultiplier = 625;
                    tierMultiplier = 0.9;
                    adjustedNum = action[3] * adjustMultiplier;
                } else if (action[2] == Color.Pink) {
                    adjustMultiplier = 3125;
                    tierMultiplier = 1;
                    adjustedNum = action[3] * adjustMultiplier;
                }


                if (numBurned + adjustedNum > numMinted) {
                    actionsStrs.push(`Error: Claiming ${action[3]} not possible. Skipping.`)
                } else {
                    const claimAmount = action[3] * adjustMultiplier / (numMinted - numBurned) * tierMultiplier * potBalance;
                    numBurned += adjustedNum;
                    potBalance -= claimAmount;

                    if (action[0] === Performer.You) {
                        you_numBurned += adjustedNum;
                        you_received += claimAmount;
                    }

                    actionsStrs.push(<>{`${action[0]} claimed ${action[3]} `}<span style={{ color: htmlColorNames[action[2]] }}>&#11044;</span>{` for a total cost of ${truncate("" + claimAmount, 6)} ETH (${truncate("" + (claimAmount / action[3]), 6)} ETH each)`}</>);
                }
            }
        }
        currBalances[0] = you_numMinted - you_numBurned;
        return [potBalance, numMinted, royalties, actionsStrs, you_numMinted, you_spent,];
    }

    const recalculate = (b_actions, d_actions, otherPlayers_actions, params) => {
        const inputParams = params ? params : defaultParams;
        const beforeValues = calculate(b_actions, ...inputParams);
        setB_PotBalance(beforeValues[0]);
        setB_NumMinted(beforeValues[1]);
        setB_Royalties(beforeValues[2]);
        setB_ActionsStr(beforeValues[3]);
        setBalances(getBalances([beforeValues[4], 0, 0, 0, 0, 0]));
        setYou_NumMinted(beforeValues[4]);
        setYou_Spent(beforeValues[5]);
    }

    const getTotalAdjustedTokens = () => {
        let total = 0;
        for (let i = 0; i < 5; i++) {
            total += (otherPlayersBalances[i] + yourBalances[i]) * (1 + 0.1 * i) * (5 ** i);
        }
        return total;
    }

    return (
        <div style={{ textAlign: "left", fontSize: 16 }}>
            <div style={{ margin: 32 }}>
                <span style={{ marginRight: 8 }}>🛠</span>
                <b>Simulation Tool</b><br />
                Explore how minting, upgrading, and collecting royalties alter the claim values and token allocations.
                <br /><br />
                <b>Perform Actions</b>
                <div>
                    <InputNumber
                        min={0} defaultValue={0}
                        value={otherPlayers_numToMint}
                        onChange={e => {
                            setA_NumToMint(e);
                        }} />
                    <Button
                        disabled={otherPlayers_numToMint <= 0}
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setB_Actions([...b_actions, [Performer.You, Action.Mint, otherPlayers_numToMint]])
                            recalculate([...b_actions, [Performer.You, Action.Mint, otherPlayers_numToMint]], d_actions, otherPlayers_actions);
                            setA_NumToMint(0);
                        }}
                    >
                        <>You Mint {otherPlayers_numToMint}{" "}<span style={{ color: "orange" }}> &#11044; </span></>
                    </Button>
                    <InputNumber
                        min={0} defaultValue={0}
                        value={b_numToMint}
                        onChange={e => {
                            setB_NumToMint(e);
                        }} />
                    <Button
                        disabled={b_numToMint <= 0}
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setB_Actions([...b_actions, [Performer.Other, Action.Mint, b_numToMint]])
                            recalculate([...b_actions, [Performer.Other, Action.Mint, b_numToMint]], d_actions, otherPlayers_actions);
                            let otherBalances = [...otherPlayersBalances];
                            otherBalances[0] += b_numToMint;
                            setOtherPlayersBalances(otherBalances)
                            setB_NumToMint(0);
                        }}
                    >
                        <>Other Players Mint {b_numToMint}{" "}<span style={{ color: "orange" }}> &#11044; </span></>
                    </Button>
                    <InputNumber
                        min={0} defaultValue={0}
                        step={0.1}
                        value={b_numRoyaltiesToCollect}
                        onChange={e => {
                            setB_NumRoyaltiesToCollect(e);
                        }} />
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setB_Actions([...b_actions, [Performer.Other, Action.Sell, b_numRoyaltiesToCollect]])
                            recalculate([...b_actions, [Performer.Other, Action.Sell, b_numRoyaltiesToCollect]], d_actions, otherPlayers_actions);
                            setB_NumRoyaltiesToCollect(0);
                        }}
                    >
                        Collect {b_numRoyaltiesToCollect} ETH in Royalties
                    </Button>
                    <br />
                    <br />
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            let newActions = [...b_actions];
                            newActions.splice(-1, 1);
                            setB_Actions(newActions)
                            recalculate(newActions, [], []);
                        }}
                    >
                        Undo Last
                    </Button>
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setDefaultParams([0, 0, 0, 0, [0, 0, 0, 0, 0, 0], 0, 0, 0, 0]);
                            setB_Actions([])
                            setA_Actions([]);
                            setD_Actions([]);
                            recalculate([], [], [], [0, 0, 0, 0, [0, 0, 0, 0, 0, 0], 0, 0, 0, 0]);
                            setOtherPlayersBalances([0, 0, 0, 0, 0, 0])
                        }}

                    >
                        Reset
                    </Button>
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            const totalCost = Number((((numMinted - 1) / 2) * numMinted * 0.00001) + Number((0 * 0.00001 + 0.001) * numMinted));
                            let royalties = []
                            if (utils.formatEther(potBalance) > totalCost) {
                                royalties = [Performer.Other, Action.Sell, utils.formatEther(potBalance) - totalCost];
                            }

                            setB_Actions([[Performer.Other, Action.Mint, numMinted], royalties]);
                            setA_Actions([]);
                            setD_Actions([]);
                            recalculate([[Performer.Other, Action.Mint, numMinted], royalties], [], []);
                            setOtherPlayersBalances([numMinted, 0, 0, 0, 0, 0])
                        }}
                    >
                        Reset to Current Pot's State
                    </Button>
                </div>
                <br />
                <b>How are the other players' {b_numMinted - you_numMinted} <span style={{ color: "orange" }}>&#11044; </span> distributed?</b>
                <div>
                    <InputNumber
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[0]}
                        readOnly={true}
                    />
                    {" "}<span style={{ color: "orange" }}>&#11044; </span>{"   "}
                    <InputNumber
                        style={{ marginLeft: 12 }}
                        disabled={b_numMinted - you_numMinted < 5}
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[1]}
                        onChange={newBalance => {
                            let otherBalances = [...otherPlayersBalances];
                            let prevBalance = otherPlayersBalances[1];
                            if (prevBalance - newBalance > 0) {
                                otherBalances[0] += 5 * (prevBalance - newBalance);
                                otherBalances[1] = newBalance;
                                setOtherPlayersBalances(otherBalances);
                            }
                            else if (prevBalance - newBalance < 0) {
                                if (otherBalances[0] >= 5 * (newBalance - prevBalance)) {
                                    otherBalances[0] -= 5 * (newBalance - prevBalance);
                                    otherBalances[1] = newBalance;
                                    setOtherPlayersBalances(otherBalances);
                                }
                            }
                        }}
                    />
                    {" "}<span style={{ color: "green" }}>&#11044; </span>{"   "}
                    <InputNumber
                        style={{ marginLeft: 12 }}
                        disabled={b_numMinted - you_numMinted < 25}
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[2]}
                        onChange={newBalance => {
                            let otherBalances = [...otherPlayersBalances];
                            let prevBalance = otherPlayersBalances[2];
                            if (prevBalance - newBalance > 0) {
                                otherBalances[0] += 25 * (prevBalance - newBalance);
                                otherBalances[2] = newBalance;
                                setOtherPlayersBalances(otherBalances);
                            }
                            else if (prevBalance - newBalance < 0) {
                                if (otherBalances[0] >= 25 * (newBalance - prevBalance)) {
                                    otherBalances[0] -= 25 * (newBalance - prevBalance);
                                    otherBalances[2] = newBalance;
                                    setOtherPlayersBalances(otherBalances);
                                }
                            }
                        }}
                    />
                    {" "}<span style={{ color: "red" }}>&#11044; </span>{"   "}
                    <InputNumber
                        style={{ marginLeft: 12 }}
                        disabled={b_numMinted - you_numMinted < 125}
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[3]}
                        onChange={newBalance => {
                            let otherBalances = [...otherPlayersBalances];
                            let prevBalance = otherPlayersBalances[3];
                            if (prevBalance - newBalance > 0) {
                                otherBalances[0] += 125 * (prevBalance - newBalance);
                                otherBalances[3] = newBalance;
                                setOtherPlayersBalances(otherBalances);
                            }
                            else if (prevBalance - newBalance < 0) {
                                if (otherBalances[0] >= 125 * (newBalance - prevBalance)) {
                                    otherBalances[0] -= 125 * (newBalance - prevBalance);
                                    otherBalances[3] = newBalance;
                                    setOtherPlayersBalances(otherBalances);
                                }
                            }
                        }}
                    />
                    {" "}<span style={{ color: "blue" }}>&#11044; </span>{"   "}
                    <InputNumber
                        style={{ marginLeft: 12 }}
                        disabled={b_numMinted - you_numMinted < 625}
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[4]}
                        onChange={newBalance => {
                            let otherBalances = [...otherPlayersBalances];
                            let prevBalance = otherPlayersBalances[4];
                            if (prevBalance - newBalance > 0) {
                                otherBalances[0] += 625 * (prevBalance - newBalance);
                                otherBalances[4] = newBalance;
                                setOtherPlayersBalances(otherBalances);
                            }
                            else if (prevBalance - newBalance < 0) {
                                if (otherBalances[0] >= 625 * (newBalance - prevBalance)) {
                                    otherBalances[0] -= 625 * (newBalance - prevBalance);
                                    otherBalances[4] = newBalance;
                                    setOtherPlayersBalances(otherBalances);
                                }
                            }
                        }}
                    />
                    {" "} <span style={{ color: "purple" }}>&#11044; </span>{"   "}
                    <InputNumber
                        style={{ marginLeft: 12 }}
                        disabled={b_numMinted - you_numMinted < 3125}
                        min={0} defaultValue={0}
                        value={otherPlayersBalances[5]}
                        onChange={newBalance => {
                            let otherBalances = [...otherPlayersBalances];
                            let prevBalance = otherPlayersBalances[5];
                            if (prevBalance - newBalance > 0) {
                                otherBalances[0] += 3125 * (prevBalance - newBalance);
                                otherBalances[5] = newBalance;
                                setOtherPlayersBalances(otherBalances);
                            }
                            else if (prevBalance - newBalance < 0) {
                                if (otherBalances[0] >= 3125 * (newBalance - prevBalance)) {
                                    otherBalances[0] -= 3125 * (newBalance - prevBalance);
                                    otherBalances[5] = newBalance;
                                    setOtherPlayersBalances(otherBalances);
                                }
                            }
                        }}
                    />
                    {" "} <span style={{ color: "pink" }}>&#11044; </span>
                    <br />
                    <br />
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setOtherPlayersBalances(getBalances([b_numMinted - you_numMinted, 0, 0, 0, 0, 0]))
                        }}
                    >
                        Fully Upgrade All
                    </Button>
                    <Button
                        style={{ marginRight: 10 }}
                        onClick={async () => {
                            setOtherPlayersBalances([b_numMinted - you_numMinted, 0, 0, 0, 0, 0])
                        }}
                    >
                        <>Reset All to{" "}<span style={{ color: "orange" }}> &#11044; </span></>
                    </Button>
                </div>
                <br />
                <b>Balances</b>
                <div>

                    Your Balances:{" "}
                    {yourBalances[0]} <span style={{ color: "orange" }}>&#11044; </span>
                    {yourBalances[1]} <span style={{ color: "green" }}>&#11044; </span>
                    {yourBalances[2]} <span style={{ color: "red" }}>&#11044; </span>
                    {yourBalances[3]} <span style={{ color: "blue" }}>&#11044; </span>
                    {yourBalances[4]} <span style={{ color: "purple" }}>&#11044; </span>
                    {yourBalances[5]} <span style={{ color: "pink" }}>&#11044; </span> (fully upgraded)
                    <br />
                    Total Balances:{" "}
                    {yourBalances[0] + otherPlayersBalances[0]} <span style={{ color: "orange" }}>&#11044; </span>
                    {yourBalances[1] + otherPlayersBalances[1]} <span style={{ color: "green" }}>&#11044; </span>
                    {yourBalances[2] + otherPlayersBalances[2]} <span style={{ color: "red" }}>&#11044; </span>
                    {yourBalances[3] + otherPlayersBalances[3]} <span style={{ color: "blue" }}>&#11044; </span>
                    {yourBalances[4] + otherPlayersBalances[4]} <span style={{ color: "purple" }}>&#11044; </span>
                    {yourBalances[5] + otherPlayersBalances[5]} <span style={{ color: "pink" }}>&#11044; </span>
                    <br />

                    You have spent {truncate("" + you_spent, 6)} ETH and can claim {you_numMinted - you_numBurned > 0 ?
                        truncate("" + Number(
                            ((yourBalances[0] * 1 * 1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                            ((yourBalances[1] * 5 * 1.1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                            ((yourBalances[2] * 25 * 1.2) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                            ((yourBalances[3] * 125 * 1.3) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                            ((yourBalances[4] * 625 * 1.4) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                            ((yourBalances[5] * 3125 * 1.5) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9))
                        ), 6) : 0
                    } ETH <b>(
                        {
                            you_numMinted - you_numBurned > 0 ?
                                truncate("" + Number(

                                    ((yourBalances[0] * 1 * 1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                                    ((yourBalances[1] * 5 * 1.1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                                    ((yourBalances[2] * 25 * 1.2) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                                    ((yourBalances[3] * 125 * 1.3) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                                    ((yourBalances[4] * 625 * 1.4) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) +
                                    ((yourBalances[5] * 3125 * 1.5) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9)) -
                                    you_spent
                                ), 6) : 0
                        }

                        {" "}ETH)</b>. You will also be allocated <b>{
                            getTotalAdjustedTokens() != 0 ?
                                Number((
                                    (yourBalances[0] * 1 * 1) +
                                    (yourBalances[1] * 5 * 1.1) +
                                    (yourBalances[2] * 25 * 1.2) +
                                    (yourBalances[3] * 125 * 1.3) +
                                    (yourBalances[4] * 625 * 1.4) +
                                    (yourBalances[5] * 3125 * 1.5)
                                ) / getTotalAdjustedTokens() * 100 * 0.5).toFixed(2)
                                :
                                0
                        }%</b> of the Circle Game DAO tokens.


                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "48%", border: "3px solid #cccccc", borderRadius: 4, padding: 10 }}>
                        <b>Actions Taken (in order): </b><br />
                        {b_actionsStr.length > 0 ? b_actionsStr.map(actionStr => <div>-{actionStr}</div>) : ""}
                    </div>
                    <div style={{ width: "48%", border: "3px solid #cccccc", borderRadius: 4, padding: 10 }}>
                        <b>Current Pot:</b> <br />
                        Balance: {truncate("" + b_potBalance, 6)} ETH<br />
                        <br />
                        <b>Minting:</b> <br />
                        Total <span style={{ color: "orange" }}>&#11044;</span> Minted: {b_numMinted}<br />
                        Current <span style={{ color: "orange" }}>&#11044;</span> Mint Cost: {truncate("" + getStartingMintCost(b_numMinted), 6)} ETH<br />
                        <br />
                        <b>Claim Values:</b> <br />
                        1 <span style={{ color: "orange" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 5 ? truncate("" + (1 * 1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        1 <span style={{ color: "green" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 5 ? truncate("" + (5 * 1.1) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        1 <span style={{ color: "red" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 25 ? truncate("" + (25 * 1.2) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        1 <span style={{ color: "blue" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 125 ? truncate("" + (125 * 1.3) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        1 <span style={{ color: "purple" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 625 ? truncate("" + (625 * 1.4) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        1 <span style={{ color: "pink" }}>&#11044;</span> can claim {((b_numMinted)) > 0 && ((b_numMinted)) >= 3125 ? truncate("" + (3125 * 1.5) / (getTotalAdjustedTokens()) * (b_potBalance * 0.9), 6) + " ETH" : "N/A"}<br />
                        <br />
                    </div>


                </div>

                <br />
                <br />

                <br />
            </div>
        </div >
    );
}

export default Simulator;
