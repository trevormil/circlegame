import "antd/dist/antd.css";
import {
    useBalance,
    useContractLoader,
    useContractReader,
    useGasPrice,
    useOnBlock,
    useUserProviderAndSigner,
} from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import {
    Account,
    // Header,
    ThemeSwitch,
    NetworkSwitch,
} from "./components";
import { NETWORKS, ALCHEMY_KEY, CONTRACT_ADDRESS } from "./constants";
import externalContracts from "./contracts/external_contracts";
// contracts
import deployedContracts from "./contracts/hardhat_contracts.json";
import { Transactor, Web3ModalSetup } from "./helpers";
import { Home, Mint, Upgrade, Claim, Stats, Advanced, Simulator, Rules } from "./views";
import { useStaticJsonRPC } from "./hooks";
import PageFooter from "./components/Footer";
import { Layout, Menu, PageHeader } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Leaderboard from "./views/Leaderboard";

const { Header, Content, Footer, Sider } = Layout;

const { ethers } = require("ethers");

function truncate(str, maxDecimalDigits) {
    return "" + parseFloat(Number(str).toFixed(maxDecimalDigits));
}

/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/scaffold-eth/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Alchemy.com & Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.localhost; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = false;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = false; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [
    "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
    `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
    "https://rpc.scaffoldeth.io:48544",
];

function App(props) {
    // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
    // reference './constants.js' for other networks
    const networkOptions = [initialNetwork.name, "mainnet", "rinkeby"];

    const [injectedProvider, setInjectedProvider] = useState();
    const [address, setAddress] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[1]);
    const location = useLocation();

    const targetNetwork = NETWORKS[selectedNetwork];

    // 🔭 block explorer URL
    const blockExplorer = targetNetwork.blockExplorer;

    // load all your providers
    const localProvider = useStaticJsonRPC([
        process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
    ]);
    const mainnetProvider = useStaticJsonRPC(providers);

    if (DEBUG) console.log(`Using ${selectedNetwork} network`);

    // 🛰 providers
    if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

    const logoutOfWeb3Modal = async () => {
        await web3Modal.clearCachedProvider();
        if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
            await injectedProvider.provider.disconnect();
        }
        setTimeout(() => {
            window.location.reload();
        }, 1);
    };

    // /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
    // const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

    // /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
    const gasPrice = useGasPrice(targetNetwork, "fast");

    // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
    const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
    const userSigner = userProviderAndSigner.signer;

    useEffect(() => {
        async function getAddress() {
            if (userSigner) {
                const newAddress = await userSigner.getAddress();
                setAddress(newAddress);
            }
        }
        getAddress();

    }, [userSigner]);

    // You can warn the user if you would like them to be on a specific network
    const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
    const selectedChainId =
        userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

    // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

    // The transactor wraps transactions and provides notificiations
    const tx = Transactor(userSigner, gasPrice);
    // const contractConfig = useContractConfig();

    const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

    // Load in your local 📝 contract and read a value from it:
    const readContracts = useContractLoader(localProvider, contractConfig);

    // If you want to make 🔐 write transactions to your contracts, use the userSigner:
    const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

    const currDetails = useContractReader(readContracts, "CircleGame", "getDetails", [address ? address : "0x0000000000000000000000000000000000000000"]);

    let details = currDetails ? [...currDetails] : [0, 1000000000000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (currDetails) {
        for (let i = 2; i < 14; i++) {
            details[i] = details[i].toNumber();
        }
    }

    //can just set these to be constant at end of game when they are declared
    // const adjustedNumberOfTokens = useContractReader(readContracts, "CircleGame", "adjustedTokenTotal", 120);
    // const claimableBalance = useContractReader(readContracts, "CircleGame", "endingClaimablePotBalance", 120);

    //
    // 🧫 DEBUG 👨🏻‍🔬
    //
    useEffect(() => {
        if (
            DEBUG &&
            mainnetProvider &&
            address &&
            selectedChainId &&

            readContracts &&
            writeContracts
        ) {
            console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
            console.log("🌎 mainnetProvider", mainnetProvider);
            console.log("🏠 localChainId", localChainId);
            console.log("👩‍💼 selected address:", address);
            console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
            console.log("📝 readContracts", readContracts);
            console.log("🔐 writeContracts", writeContracts);
        }
    }, [
        mainnetProvider,
        address,
        selectedChainId,
        readContracts,
        writeContracts,
    ]);

    const loadWeb3Modal = useCallback(async () => {
        const provider = await web3Modal.connect();
        setInjectedProvider(new ethers.providers.Web3Provider(provider));

        provider.on("chainChanged", chainId => {
            console.log(`chain changed to ${chainId}! updating providers`);
            setInjectedProvider(new ethers.providers.Web3Provider(provider));
        });

        provider.on("accountsChanged", () => {
            console.log(`account changed!`);
            setInjectedProvider(new ethers.providers.Web3Provider(provider));
        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            console.log(code, reason);
            logoutOfWeb3Modal();
        });
    }, [setInjectedProvider]);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            loadWeb3Modal();
        }
    }, [loadWeb3Modal]);

    return (
        <div className="App">
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{
                        minHeight: "100%"
                    }}
                    theme="dark"
                >
                    <div className="logo" style={{
                        'height': '32px',
                        'margin': '16px',
                        fontSize: 22
                    }}>
                        {" "}<span style={{ color: "orange" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "green" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "red" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "blue" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "purple" }}>&#11044;</span>{" "}
                        {" "}<span style={{ color: "pink" }}>&#11044;</span>{" "}
                    </div>
                    <Menu theme="dark" mode="inline" selectedKeys={[window.location.pathname]}>
                        <Menu.Item key="/">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/mint" >
                            <Link to="/mint">Mint</Link>
                        </Menu.Item>
                        <Menu.Item key="/upgrade">
                            <Link to="/upgrade">Upgrade</Link>
                        </Menu.Item>
                        <Menu.Item key="/claim">
                            <Link to="/claim">Claim</Link>
                        </Menu.Item>
                        <Menu.Item key="/leaderboard">
                            <Link to="/leaderboard">Leaderboard</Link>
                        </Menu.Item>
                        <Menu.Item key="/simulator" >
                            <Link to="/simulator">Simulator</Link>
                        </Menu.Item>
                        <Menu.Item key="/opensea">
                            <a href="https://opensea.io/collection/circlegamenft" target="_blank">OpenSea ↗</a>
                        </Menu.Item>
                        <Menu.Item key="/discord">
                            <a href="https://discord.gg/ASCuCh5sz4" target="_blank">Discord ↗</a>
                        </Menu.Item>
                        <Menu.Item key="/twitter">
                            <a href="https://twitter.com/CircleGameNFT" target="_blank">Twitter ↗</a>
                        </Menu.Item>
                        <Menu.Item key="/etherscan">
                            <a href="https://etherscan.io/address/0x7dcfE966E0bE69Bd2aB6B35cE4Ec741ac7AcC571" target="_blank">Etherscan ↗</a>
                        </Menu.Item>
                        <Menu.Item key="/github">
                            <a href="https://github.com/CircleGame" target="_blank">GitHub ↗</a>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                        <a href="https://circlegame.io" >
                            <PageHeader
                                title={"Circle Game (Current Pot: " + truncate(ethers.utils.formatEther(details[0]), 5) + " ETH)"}
                                subTitle={Math.floor((new Date("02/13/2022").getTime() - Date.now()) / (1000 * 3600 * 24)) + " days left until the game ends!"}
                                style={{ cursor: "pointer" }}
                                className="site-page-header"
                                avatar={{ src: `${process.env.PUBLIC_URL}/circlegameorange.png` }}
                            />
                        </a>
                    </Header>
                    <Content style={{ margin: '12px 16px 0' }}>
                        <Switch>
                            <Route exact path="/">
                                <Home
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    potBalance={details[0]}
                                    mintPrice={details[1]}
                                />
                            </Route>
                            <Route exact path="/leaderboard">
                                <Leaderboard
                                    mainnetProvider={mainnetProvider}
                                    blockExplorer={blockExplorer}
                                />
                            </Route>
                            <Route exact path="/rules">
                                <Rules
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    potBalance={details[0]}
                                    mintPrice={details[1]}
                                />
                            </Route>
                            <Route exact path="/simulator">
                                <Simulator
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    potBalance={details[0]}
                                    mintPrice={details[1]}
                                    totalOrangeBalance={details[8]}
                                    totalGreenBalance={details[9]}
                                    totalRedBalance={details[10]}
                                    totalBlueBalance={details[11]}
                                    totalPurpleBalance={details[12]}
                                    totalPinkBalance={details[13]}
                                />
                            </Route>
                            <Route exact path="/mint">
                                <Mint
                                    address={address}
                                    tx={tx}
                                    readContracts={readContracts}
                                    writeContracts={writeContracts}
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    mintPrice={details[1]}
                                    orangeBalance={details[2]}
                                    greenBalance={details[3]}
                                    redBalance={details[4]}
                                    blueBalance={details[5]}
                                    purpleBalance={details[6]}
                                    pinkBalance={details[7]}
                                    totalOrangeBalance={details[8]}
                                    totalGreenBalance={details[9]}
                                    totalRedBalance={details[10]}
                                    totalBlueBalance={details[11]}
                                    totalPurpleBalance={details[12]}
                                    totalPinkBalance={details[13]}
                                />
                            </Route>
                            <Route exact path="/upgrade">
                                <Upgrade
                                    address={address}
                                    tx={tx}
                                    writeContracts={writeContracts}
                                    readContracts={readContracts}
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    potBalance={details[0]}
                                    orangeBalance={details[2]}
                                    greenBalance={details[3]}
                                    redBalance={details[4]}
                                    blueBalance={details[5]}
                                    purpleBalance={details[6]}
                                    pinkBalance={details[7]}
                                />
                            </Route>
                            <Route exact path="/claim">
                                <Claim
                                    address={address}
                                    tx={tx}
                                    writeContracts={writeContracts}
                                    readContracts={readContracts}
                                    numMinted={details[1] ? (details[1] - 1000000000000000) / 10000000000000 : 0}
                                    potBalance={details[0]}
                                    orangeBalance={details[2]}
                                    greenBalance={details[3]}
                                    redBalance={details[4]}
                                    blueBalance={details[5]}
                                    purpleBalance={details[6]}
                                    pinkBalance={details[7]}
                                    // adjustedNumberOfTokens={adjustedNumberOfTokens}
                                    // claimableBalance={claimableBalance}
                                    totalOrangeBalance={details[8]}
                                    totalGreenBalance={details[9]}
                                    totalRedBalance={details[10]}
                                    totalBlueBalance={details[11]}
                                    totalPurpleBalance={details[12]}
                                    totalPinkBalance={details[13]}
                                />
                            </Route>
                            {/* <Route exact path="/stats">
                    <Stats
                        address={address}
                        tx={tx}
                        writeContracts={writeContracts}
                        readContracts={readContracts}
                        numMinted={numMinted}
                        potBalance={potBalance}
                        mintPrice={details[1]}
                        orangeBalance={details[2]}
                        greenBalance={details[3]}
                        redBalance={details[4]}
                        blueBalance={details[5]}
                        purpleBalance={details[6]}
                        pinkBalance={details[7]}
                        updateBalances={updateBalances}
                        balancesLoaded={balancesLoaded}
                    />
                </Route> */}
                            {/* <Route exact path="/advanced">
                    <Advanced
                        numMinted={numMinted}
                        potBalance={potBalance}
                        mintPrice={details[1]} />
                </Route> */}
                        </Switch>

                        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
                        <div style={{ position: "absolute", textAlign: "right", right: 0, top: 0, padding: 10 }}>
                            <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                                {USE_NETWORK_SELECTOR && (
                                    <div style={{ marginRight: 20 }}>
                                        <NetworkSwitch
                                            networkOptions={networkOptions}
                                            selectedNetwork={selectedNetwork}
                                            setSelectedNetwork={setSelectedNetwork}
                                        />
                                    </div>
                                )}
                                <Account
                                    useBurner={USE_BURNER_WALLET}
                                    address={address}
                                    localProvider={localProvider}
                                    userSigner={userSigner}
                                    mainnetProvider={mainnetProvider}
                                    web3Modal={web3Modal}
                                    loadWeb3Modal={loadWeb3Modal}
                                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                                    blockExplorer={blockExplorer}
                                />
                            </div>
                        </div>

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        {/* <PageFooter /> */}
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
}


export default App;
