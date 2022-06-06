export const VAULT_SETUP = `import FungibleToken from 0xFungibleToken
import FiatToken from 0xFiatToken
import FUSD from 0xFUSD
import TeleportedTetherToken from 0xTeleportedTetherToken
import BloctoToken from 0xBloctoToken

transaction() {
    prepare(signer: AuthAccount) {
        
        // FUSD setup
        if(signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil) {
            // Create a new FUSD Vault and put it in storage
            signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
                /public/fusdReceiver,
                target: /storage/fusdVault
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&FUSD.Vault{FungibleToken.Balance}>(
                /public/fusdBalance,
                target: /storage/fusdVault
            )
        }

        //BLT
        if(signer.borrow<&BloctoToken.Vault>(from: BloctoToken.TokenStoragePath) == nil) {
            // Create a new Blocto Token Vault and put it in storage
            signer.save(<-BloctoToken.createEmptyVault(), to: BloctoToken.TokenStoragePath)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&BloctoToken.Vault{FungibleToken.Receiver}>(
                BloctoToken.TokenPublicReceiverPath,
                target: BloctoToken.TokenStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&BloctoToken.Vault{FungibleToken.Balance}>(
                BloctoToken.TokenPublicBalancePath,
                target: BloctoToken.TokenStoragePath
            )
        }

        // tUSDT
        if(signer.borrow<&TeleportedTetherToken.Vault>(from: TeleportedTetherToken.TokenStoragePath) == nil) {
            // Create a new tUSDT Token Vault and put it in storage
            signer.save(<-TeleportedTetherToken.createEmptyVault(), to: TeleportedTetherToken.TokenStoragePath)

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&TeleportedTetherToken.Vault{FungibleToken.Receiver}>(
                TeleportedTetherToken.TokenPublicReceiverPath,
                target: TeleportedTetherToken.TokenStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&TeleportedTetherToken.Vault{FungibleToken.Balance}>(
                TeleportedTetherToken.TokenPublicBalancePath,
                target: TeleportedTetherToken.TokenStoragePath
            )
        }

        // USDC
        if signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath) == nil {
            // Create a new ExampleToken Vault and put it in storage
            signer.save(
                <-FiatToken.createEmptyVault(),
                to: FiatToken.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&FiatToken.Vault{FungibleToken.Receiver}>(
                FiatToken.VaultReceiverPubPath,
                target: FiatToken.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the UUID() function through the VaultUUID interface
            signer.link<&FiatToken.Vault{FiatToken.ResourceId}>(
                FiatToken.VaultUUIDPubPath,
                target: FiatToken.VaultStoragePath
            )

            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&FiatToken.Vault{FungibleToken.Balance}>(
                FiatToken.VaultBalancePubPath,
                target: FiatToken.VaultStoragePath
            )
        }
    }
}`;
