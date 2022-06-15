import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { networkconfig } from "./config";

export default function App() {
  const [user, setUser] = useState({ loggedIn: null });
  const [network, setNetwork] = useState("testnet");

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  fcl.config(
    network === "testnet" ? networkconfig.testnet : networkconfig.mainnet
  );

  return (
    <ChakraProvider>
      <Flex direction="column" justify="space-between" h="100vh">
        <Navbar user={user} setNetwork={setNetwork} />
        <Home user={user} />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
