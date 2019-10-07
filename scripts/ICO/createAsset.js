const Stellar = require('stellar-sdk');
const { TimeoutInfinite } = require('stellar-base');
const { issuer, distributer } = require("../../pairs.json");

const server = new Stellar.Server('https://horizon-testnet.stellar.org');

const main = async () => {
  const issuingAccount = await server.loadAccount(issuer.publicKey);

  const tknAsset = new Stellar.Asset("TKN", issuer.publicKey);

  const txOptions = {
    fee: await await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  paymentOpts = {
    asset: tknAsset,
    destination: distributer.publicKey,
    amount: "1000"
  };

  let transaction = new Stellar.TransactionBuilder(issuingAccount, txOptions)
    .addOperation(Stellar.Operation.payment(paymentOpts))
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(Stellar.Keypair.fromSecret(issuer.secretSeed));

  try {
    await server.submitTransaction(transaction);
  } catch (e) {
    debugger;
    console.log(e.response.data.extras.result_codes);
    throw e;
  }
};

main()
  .then(() => {
    console.log("ok");
  })
  .catch(e => {
    console.error(e);
    throw e;
  });