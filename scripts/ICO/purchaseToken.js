const Stellar = require('stellar-sdk');
const { TimeoutInfinite } = require('stellar-base');
const server = new Stellar.Server('https://horizon-testnet.stellar.org');

const { buyer, issuer } = require("../../pairs.json");

const main = async () => {
  const rootAccount = await server.loadAccount(buyer.publicKey);

  const mobiAsset = new Stellar.Asset("MOBI", issuer.publicKey);

  const txOptions = {
    fee: await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  const changeTrustOpts = {
    asset: mobiAsset,
    limit: "500"
  };

  const manageSellOfferOpts = {
    selling: Stellar.Asset.native(),
    buying: mobiAsset,
    amount: "1",
    price: "1"
  };

  let transaction = new Stellar.TransactionBuilder(rootAccount, txOptions)
    .addOperation(Stellar.Operation.changeTrust(changeTrustOpts))
    .addOperation(Stellar.Operation.manageSellOffer(manageSellOfferOpts))
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(Stellar.Keypair.fromSecret(buyer.secretSeed));

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
