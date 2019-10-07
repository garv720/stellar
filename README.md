For ICO

	0. Create pairs(Accounts)
		We just create key pairs for an Issuing account, a Distribution account, and a Root account.

	1. Fund Root account
		To be able to create an ICO and the other accounts, we use the friendbot to fund the root account (10K XLM by default).

	2. Root account creates Issuing and Distribution accounts
		The Root account creates and funds the Issuing and Distribution accounts with a minimum balance, allowing further entries and transaction fees to be covered.

	3. Change trust
		For the Distribution account to be able to receive a custom asset, here the SYL token, it has to create a trustline, i.e. Distribution account accepts SYL tokens.

		This step corresponds to the fact that if the Issuer says that 1 SYL corresponds to 1 orange, the Distributor trusts he is saying the truth and can exchange his N SYL for N oranges at any time.

	4. Create asset
		The Issuing account will now create the new asset and send it to the Distribution account via a payment operation.

		An asset is simply defined by its name (here it is SYL) and an issuing account.

		This information can be shared across the Stellar network via a toml file, but I omit this step here as it is not mandatory, just convenient.

		The Distribution account has now a balance of N SYL

	5. Lock Issuing account
		To make sure the Issuing account doesn't create new tokens from thin air, the issuing account locks itself out, becoming permanently immutable, even with its own private key.

	6. Token distribution
		This distribution is simply made by publicizing that the SYL token is to sell with a price per unit in exchange of XLMs. This is part of the Stellar protocols, and the Stellar network will resolve these orders on its own when there is a match.

	7. Token purchase
		To acquire a given token, an account has to trust the asset and submit a buying order that matches the offer.

		Once submitted, if it matches, the transaction is executed and the purchaser and distributor balances updated.

		In this example, I'm using the Root account to perform those steps.


for more: https://github.com/slyg/stellar-tinkering/tree/master/ico
	
	API's: 
		    "account": {
		      "href": "https://horizon-testnet.stellar.org/accounts/{account_id}",
		      "templated": true
		    },
		    "account_transactions": {
		      "href": "https://horizon-testnet.stellar.org/accounts/{account_id}/transactions{?cursor,limit,order}",
		      "templated": true
		    },
		    "assets": {
		      "href": "https://horizon-testnet.stellar.org/assets{?asset_code,asset_issuer,cursor,limit,order}",
		      "templated": true
		    },
		    "friendbot": {
		      "href": "https://friendbot.stellar.org/{?addr}",
		      "templated": true
		    },
		    "metrics": {
		      "href": "https://horizon-testnet.stellar.org/metrics"
		    },
		    "order_book": {
		      "href": "https://horizon-testnet.stellar.org/order_book{?selling_asset_type,selling_asset_code,selling_asset_issuer,buying_asset_type,buying_asset_code,buying_asset_issuer,limit}",
		      "templated": true
		    },
		    "self": {
		      "href": "https://horizon-testnet.stellar.org/"
		    },
		    "transaction": {
		      "href": "https://horizon-testnet.stellar.org/transactions/{hash}",
		      "templated": true
		    },
		    "transactions": {
		      "href": "https://horizon-testnet.stellar.org/transactions{?cursor,limit,order}",
		      "templated": true
		    }
		  }