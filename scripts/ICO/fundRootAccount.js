const axios = require('axios')
const Stellar = require('stellar-sdk')

const { buyer } = require('../../pairs.json')

const fundAccounts = async addr =>
  axios.get("/friendbot", {
    baseURL: 'https://horizon-testnet.stellar.org/',
    params: { addr }
  });


fundAccounts(buyer.publicKey)
    .then(() => console.log('ok'))
    .catch((e) => { console.error(e); throw e})