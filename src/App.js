import "./flow/config.js";
import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

export default function App() {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  return (
    <ChakraProvider>
      <Flex direction="column" justify="space-between" h="100vh">
        <Navbar user={user} />
        <Home user={user} />
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}
