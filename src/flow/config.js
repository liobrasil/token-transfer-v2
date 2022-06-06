import { config } from "@onflow/fcl";

config({
  "accessNode.api": process.env.REACT_APP_ACCESS_NODE,
  "discovery.wallet": process.env.REACT_APP_DISCOVERY_WALLET,
  env: process.env.REACT_APP_ENV,
  "0xFungibleToken": process.env.REACT_APP_FUNGIBLE_TOKEN,
  "0xFUSD": process.env.REACT_APP_FUSD,
  "0xFiatToken": process.env.REACT_APP_FIAT_TOKEN,
  "0xFlowToken": process.env.REACT_APP_FLOW_TOKEN,
  "0xTeleportedTetherToken": process.env.REACT_APP_TETHER_TOKEN,
  "0xBloctoToken": process.env.REACT_APP_BLOCTO_TOKEN,
});
