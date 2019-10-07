const fs = require('fs')
const Stellar = require('stellar-sdk')

const reducer = (acc, name) => {
  const pair = Stellar.Keypair.random();
  return {
    ...acc,
    [name]: {
      name: name,
      secretSeed: pair.secret(),
      publicKey: pair.publicKey()
    }
  };
};

const pairs = [
  "issuer",
  "distributer",
  "buyer"
].reduce(reducer, {});

fs.writeFileSync("pairs.json", JSON.stringify(pairs, null, 2));