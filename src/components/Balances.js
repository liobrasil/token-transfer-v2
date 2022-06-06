import { Flex, Text } from "@chakra-ui/react";

export default function Balances({ accountInfos }) {
  return (
    <Flex direction="column">
      <Text mb="10px">Showing Account Balances Info:</Text>
      <Text>FLOW: {accountInfos?.FLOW}</Text>
      <Text>USDC: {accountInfos?.USDC}</Text>
      <Text>tUSDT: {accountInfos?.tUSDT}</Text>
      <Text>FUSD: {accountInfos?.FUSD}</Text>
      <Text>BLT: {accountInfos?.BLT}</Text>
    </Flex>
  );
}
