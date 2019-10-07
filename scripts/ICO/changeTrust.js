const Stellar = require('stellar-sdk');
const { TimeoutInfinite } = require('stellar-base');

const { issuer, distributer } = require("../../pairs.json");

const server = new Stellar.Server('https://horizon-testnet.stellar.org');

const main = async () => {
  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  const distributionAccount = await server.loadAccount(
    distributer.publicKey
  );

  const mobiAsset = new Stellar.Asset("MOBI", issuer.publicKey);

  const changeTrustOpts = {
    asset: mobiAsset,
    limit: "1000"
  };

  let transaction = new Stellar.TransactionBuilder(
    distributionAccount,
    txOptions
  )
    .addOperation(Stellar.Operation.changeTrust(changeTrustOpts))
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(
    Stellar.Keypair.fromSecret(distributer.secretSeed)
  );

  try {
    await server.submitTransaction(transaction);
  } catch (e) {
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