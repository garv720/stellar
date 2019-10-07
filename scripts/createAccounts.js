const fs = require('fs')
const Stellar = require('stellar-sdk')

fs.writeFileSync(
    "accounts.json",
    JSON.stringify(
        ['pairA', 'pairB'].map(() => {
            const pair = Stellar.Keypair.random()
            return {
                secretSeed: pair.secret(),
                publicKey: pair.publicKey(),
            }
        })
    )
);