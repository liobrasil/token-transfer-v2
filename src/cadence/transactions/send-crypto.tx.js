export const SEND_CRYPTO = `import FungibleToken from 0xFungibleToken
import FiatToken from 0xFiatToken
import FlowToken from 0xFlowToken
import FUSD from 0xFUSD
import TeleportedTetherToken from 0xTeleportedTetherToken
import BloctoToken from 0xBloctoToken

transaction(amount: UFix64, to: Address) {

    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        let vaultRef = signer.borrow<&vaultRefType>(from: vaulStoragePath)
            ?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount)
    }

    execute {

        let recipient = getAccount(to)

        let receiverRef = recipient.getCapability(tokenRecieverCapPath).borrow<&{FungibleToken.Receiver}>()
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

        receiverRef.deposit(from: <-self.sentVault)
    }
}`;
