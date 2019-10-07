const Stellar = require('stellar-sdk');
const util = require("util");
const { issuer, distributer, buyer } = require("../../pairs.json");
const server = new Stellar.Server('https://horizon-testnet.stellar.org')


const displayTemp = ({ name, accountId, balances }) => {
  console.log(
    `\u001b[33m${name}\u001b[0m \u001b[37;2m${accountId.substring(
      0,
      9
      )}${Array.from(new Array(15- name.length))
        .map(()=>"-")
        .join("")}\u001b[0m${balances}`
  );
}
const checkAccounts = async () => {
  const accounts = await Promise.all(
    [issuer, distributer, buyer].map( async ({ name, publicKey }) => {
      const account = await server.loadAccount(publicKey);
      return {
        name,
        accountId: publicKey,
        balances: account.balances.map(
          ({ balance, asset_type, asset_code }) => 
            `${balance} ${asset_type === "native" ? "XLM" : asset_code }`
        )
      };
    })
  );

accounts.forEach(displayTemp);

//   return accounts.map(account => ({
//     accountId: account.id,
//     balances: account.balances.map(
//       balance =>
//         `${balance.balance} ${
//           balance.asset_type === "native" ? "XLM" : balance.asset_code
//         }`
//     )
//   }));
};

checkAccounts();