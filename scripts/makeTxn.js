const Stellar = require('stellar-sdk')
const { TimeoutInfinite } = require('stellar-base');
const [ pairA, pairB ] = require('../accounts.json')

const server = new Stellar.Server('https://horizon-testnet.stellar.org')

const transaction = async () => {

    const paymentToB = {
        destination: pairB.publicKey,
        asset: Stellar.Asset.native(),
        amount: '20.0000000', // Notice the use of the type string here
    }
    
    const txOptions = {
        fee: await server.fetchBaseFee(),
        networkPassphrase: Stellar.Networks.TESTNET
    }

    const accountA = await server.loadAccount(pairA.publicKey)

    const transaction = new Stellar.TransactionBuilder(accountA, txOptions)
        .addOperation(Stellar.Operation.payment(paymentToB))
        .addMemo(Stellar.Memo.text('Test Transaction'))
        .setTimeout(TimeoutInfinite)
        .build()

    const StellarPairA = Stellar.Keypair.fromSecret(pairA.secretSeed)

    transaction.sign(StellarPairA)

    await server.submitTransaction(transaction)

}

transaction()
    .then(() => console.log('ok'))
    .catch((e) => { console.error(e); throw e})