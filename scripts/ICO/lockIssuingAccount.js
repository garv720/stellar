const Stellar = require('stellar-sdk');
const { issuer } = require("../../pairs.json");
const { TimeoutInfinite } = require("stellar-base");
const server = new Stellar.Server('https://horizon-testnet.stellar.org')

const main = async () => {
  const issuingAccount = await server.loadAccount(issuer.publicKey);

  const txOptions = {
    fee: await await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  const thresholds = {
    masterWeight: 0, // Issuing account has a weight of 0, no rights :)
    lowThreshold: 0,
    medThreshold: 0,
    highThreshold: 0 // Means no transaction can be performed anymore on this account
  };

  let transaction = new Stellar.TransactionBuilder(issuingAccount, txOptions)
    .addOperation(Stellar.Operation.setOptions(thresholds))
    .setTimeout(TimeoutInfinite)
    .build();

  transaction.sign(Stellar.Keypair.fromSecret(issuer.secretSeed));

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