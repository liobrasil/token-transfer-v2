import * as fcl from "@onflow/fcl";
import { HStack, Text, Button } from "@chakra-ui/react";
import { VAULT_SETUP } from "../cadence/transactions/vault-setup.tx";

export default function ConnectedState({ user }) {
  const vaultSetup = async () =>
    await fcl.mutate({ cadence: VAULT_SETUP, limit: 9999 });

  return (
    <HStack align="center">
      <Text>👉 {user.addr ?? "no address"}</Text>
      <Button onClick={fcl.unauthenticate} bg="purple.300">
        Disconnect
      </Button>
      <Button onClick={vaultSetup} bg="gray.400">
        Setup tokens
      </Button>
    </HStack>
  );
}
