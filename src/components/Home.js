import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";
import { Flex, VStack } from "@chakra-ui/react";
import Balances from "./Balances";
import Transfer from "./Transfer";
import { ACCOUNT_INFO } from "../cadence/scripts/account-info.script.js";

export default function Home({ user }) {
  const [accountInfos, setAccountInfos] = useState();
  const [txStatus, setTxStatus] = useState("");

  useEffect(() => {
    if (user.loggedIn) {
      (async () =>
        setAccountInfos(
          await fcl.query({
            cadence: ACCOUNT_INFO,
            args: (arg, t) => [arg(user.addr, t.Address)],
          })
        ))();
    }
  }, [user, txStatus]);

  return (
    <Flex
      py="10"
      px="10"
      bg="gray.100"
      h="100%"
      align="start"
      direction="column"
    >
      {user.loggedIn && (
        <VStack spacing="24px" align="start">
          <Balances accountInfos={accountInfos} />
          <Transfer setTxStatus={setTxStatus} />
        </VStack>
      )}
    </Flex>
  );
}
