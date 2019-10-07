const Stellar = require('stellar-sdk');
const util = require("util");
const {
  issuer,
  distributer,
  buyer
} = require("../../pairs.json");
const server = new Stellar.Server('https://horizon-testnet.stellar.org')

const checkAccounts = async () => {
  const accounts = await Promise.all(
    [issuer, distributer, buyer].map(
      async ({ publicKey }) => await server.loadAccount(publicKey)
    )
  );

  return accounts.map(account => ({
    accountId: account.id,
    balances: account.balances.map(
      balance =>
        `${balance.balance} ${
          balance.asset_type === "native" ? "XLM" : balance.asset_code
        }`
    )
  }));
};

checkAccounts()
  .then(accounts => console.log(util.inspect(accounts, false, null)))
  .catch(e => {
    console.error(e);
    throw e;
  });