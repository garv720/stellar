const Stellar = require('stellar-sdk');
const { TimeoutInfinite } = require('stellar-base');
const {
  buyer,
  issuer,
  distributer
} = require("../../pairs.json");

const server = new Stellar.Server('https://horizon-testnet.stellar.org')


const main = async () => {
  const rootAccount = await server.loadAccount(buyer.publicKey);

  const txOptions = {
    fee: await await server.fetchBaseFee(),
    networkPassphrase: Stellar.Networks.TESTNET
  };

  const issuingAccountConfig = {
    destination: issuer.publicKey,
    startingBalance: "2.5000000"
  };

  const distributionAccountConfig = {
    destination: distributer.publicKey,
    startingBalance: "2.5000000"
  };

  let transaction = new Stellar.TransactionBuilder(rootAccount, txOptions)
    .addOperation(Stellar.Operation.createAccount(issuingAccountConfig))
    .addOperation(Stellar.Operation.createAccount(distributionAccountConfig))
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