const axios = require('axios')
const Stellar = require('stellar-sdk')
const accounts = require('../accounts.json')

const fundAccounts = async (accounts) => await Promise.all(
    accounts.map(
        async (account) => await axios.get('/friendbot', {
            baseURL: 'https://horizon-testnet.stellar.org/',
            params: { addr: account.publicKey }
        })
    )
)

fundAccounts(accounts)
    .then(() => console.log('ok'))
    .catch((e) => { console.error(e); throw e})