import * as fcl from "@onflow/fcl";
import { Button } from "@chakra-ui/react";

export default function UnAuthenticatedState() {
  return (
    <Button onClick={fcl.logIn} bg="green.300">
      Connect Wallet
    </Button>
  );
}
