import { Flex, Text, Select, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import * as fcl from "@onflow/fcl";
import { SEND_CRYPTO } from "../cadence/transactions/send-crypto.tx";

export default function Transfer({ setTxStatus }) {
  const [reciever, setReciever] = useState("");
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");

  const sendCrypto = async (crypto, reciever) => {
    let vaultRefType;
    let vaulStoragePath;
    let tokenRecieverCapPath;

    switch (crypto) {
      case "FLOW":
        vaultRefType = "FlowToken.Vault";
        vaulStoragePath = "storage/flowTokenVault";
        tokenRecieverCapPath = "public/flowTokenReceiver";
        break;

      case "BLT":
        vaultRefType = "BloctoToken.Vault";
        vaulStoragePath = "BloctoToken.TokenStoragePath";
        tokenRecieverCapPath = "BloctoToken.TokenPublicReceiverPath";
        break;

      case "FUSD":
        vaultRefType = "FUSD.Vault";
        vaulStoragePath = "storage/fusdVault";
        tokenRecieverCapPath = "public/fusdReceiver";
        break;

      case "tUSDT":
        vaultRefType = "TeleportedTetherToken.Vault";
        vaulStoragePath = "TeleportedTetherToken.TokenStoragePath";
        tokenRecieverCapPath = "TeleportedTetherToken.TokenPublicReceiverPath";
        break;

      case "USDC":
        vaultRefType = "FiatToken.Vault";
        vaulStoragePath = "FiatToken.VaultStoragePath";
        tokenRecieverCapPath = "FiatToken.VaultReceiverPubPath";
        break;
    }

    let txId = await fcl.mutate({
      cadence: SEND_CRYPTO.replace("vaultRefType", vaultRefType)
        .replace("vaulStoragePath", vaulStoragePath)
        .replace("tokenRecieverCapPath", tokenRecieverCapPath),
      args: (arg, t) => [
        arg(Number(amount).toFixed(8).toString(), t.UFix64),
        arg(reciever, t.Address),
      ],
      limit: 9999,
    });

    console.log(txId);
    setTxStatus(await fcl.tx(txId).onceSealed());
  };

  return (
    <Flex direction="column">
      <Text mb="10px">Transfer:</Text>
      <Input
        type="text"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="100"
      />
      <Select
        onChange={(e) => setCrypto(e.target.value)}
        placeholder="Crypto-currency"
      >
        <option value="FLOW">FLOW</option>
        <option value="USDC">USDC</option>
        <option value="tUSDT">tUSDT</option>
        <option value="FUSD">FUSD</option>
        <option value="BLT">BLT</option>
      </Select>
      to
      <Input
        type="text"
        id="reciever"
        name="reciever"
        value={reciever}
        onChange={(e) => setReciever(e.target.value)}
        placeholder="0x0000000123456789"
      />
      <Button onClick={() => sendCrypto(crypto, reciever)} bg="green.300">
        Send
      </Button>
    </Flex>
  );
}
