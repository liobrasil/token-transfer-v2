export const ACCOUNT_INFO = `import FungibleToken from 0xFungibleToken
import FiatToken from 0xFiatToken
import FUSD from 0xFUSD
import FlowToken from 0xFlowToken
import TeleportedTetherToken from 0xTeleportedTetherToken
import BloctoToken from 0xBloctoToken

pub fun main(address: Address): {String : UFix64} {
  let account = getAccount(address)

  let fusdBalanceRef = account.getCapability(/public/fusdBalance).borrow<&FUSD.Vault{FungibleToken.Balance}>()
  let fiatBalanceRef = account.getCapability(FiatToken.VaultBalancePubPath).borrow<&FiatToken.Vault{FungibleToken.Balance}>()
  let flowTokenBalanceRef = account.getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault{FungibleToken.Balance}>()
  let tetherTokenBalanceRef = account.getCapability(TeleportedTetherToken.TokenPublicBalancePath).borrow<&TeleportedTetherToken.Vault{FungibleToken.Balance}>()
  let bloctoTokenBalanceRef = account.getCapability(/public/bloctoTokenBalance).borrow<&BloctoToken.Vault{FungibleToken.Balance}>()

  let fusdBalance = fusdBalanceRef == nil ? 0.0 : fusdBalanceRef!.balance
  let fiatBalance = fiatBalanceRef == nil ? 0.0 : fiatBalanceRef!.balance
  let flowBalance = flowTokenBalanceRef == nil ? 0.0 : flowTokenBalanceRef!.balance
  let tetherBalance = tetherTokenBalanceRef == nil ? 0.0 : tetherTokenBalanceRef!.balance
  let bloctoBalance = bloctoTokenBalanceRef == nil ? 0.0 : bloctoTokenBalanceRef!.balance
  

  return { "FUSD": fusdBalance, "USDC": fiatBalance, "FLOW": flowBalance, "tUSDT": tetherBalance, "BLT": bloctoBalance }
}`;
