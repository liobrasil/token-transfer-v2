import * as fcl from "@onflow/fcl";
import { Flex, Text, Select } from "@chakra-ui/react";
import ConnectedState from "./ConnectedState";
import UnAuthenticatedState from "./UnAuthenticatedState";

export default function Navbar({ user, setNetwork }) {
  return (
    <>
      <Flex bg="tomato" w="100%" p={4} color="white" justify="space-between">
        <Text>Tokens transfer App - FLOW, USDC, BLT, tUSDT and FUSD</Text>
        <Flex align="center">
          <Text mr="5">Network</Text>
          <Select
            onChange={(e) => {
              setNetwork(e.target.value);
              fcl.unauthenticate();
            }}
            defaultValue="testnet"
            placeholder="Choose network"
          >
            <option value="testnet">Testnet</option>
            <option value="mainnet">Mainnet</option>
          </Select>
        </Flex>
        {user.loggedIn ? (
          <ConnectedState user={user} />
        ) : (
          <UnAuthenticatedState />
        )}
      </Flex>
    </>
  );
}
