const Stellar = require('stellar-sdk');
const { TimeoutInfinite } = require('stellar-base'); 
const server = new Stellar.Server('https://horizon-testnet.stellar.org');
const { distributer, issuer } = require("../../pairs.json");

const main = async () => {
  const issuingAccount = await server.loadAccount(
    distributer.publicKey
  );

  const tknAsset = new Stellar.Asset("TKN", issuer.publicKey);

  const txOptions = {
    fee: await await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  const manageSellOfferOpts = {
    selling: tknAsset,
    buying: Stellar.Asset.native(),
    amount: "1000.00000000",
    price: "1.00000000"
  };

  let transaction = new Stellar.TransactionBuilder(issuingAccount, txOptions)
    .addOperation(Stellar.Operation.manageSellOffer(manageSellOfferOpts))
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