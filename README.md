										EOS ICO CREATION DOC
										Language: JS

 
	1. Create Accounts pairs(createAccounts.js)
		
		a. We just create key pairs for an Issuing account, a Distribution account, and a Root account.
	
	2. Fund Root account (fundRootAccount.js)
		
		a. To be able to create an ICO and the other accounts, we use the friendbot to fund the root account (10K XLM by default).
	
	3. Root account creates Issuing and Distribution accounts 
	   (createIssuingAndDistributingAccounts.js)
		
		a. The Root account creates and funds the Issuing and Distribution accounts with a minimum balance, allowing further entries and transaction fees to be covered.
	
	4. Change trust (changeTrust.js)
		
		a. For the Distribution account to be able to receive a custom asset, here the SYL token, it has to create a trustline, i.e. Distribution account accepts SYL tokens.
		
		b. This step corresponds to the fact that if the Issuer says that 1 SYL corresponds to 1 orange, the Distributor trusts he is saying the truth and can exchange his N SYL for N oranges at any time.
	
	5. Create asset (createAsset.js)
		
		a. The Issuing account will now create the new asset and send it to the Distribution account via a payment operation.
		
		b. An asset is simply defined by its name (here it is SYL) and an issuing account.
		
		c. This information can be shared across the Stellar network via a toml file, but I omit this step here as it is not mandatory, just convenient.
		d. The Distribution account has now a balance of N SYL
	
	6. Lock Issuing account (lockIssuingAccount.js)
		
		a. To make sure the Issuing account doesn't create new tokens from thin air, the issuing account locks itself out, becoming permanently immutable, even with its own private key.
		
		b. Token distribution (tokenDistribution.js)
		
		c. This distribution is simply made by publicizing that the SYL token is to sell with a price per unit in exchange of XLMs. This is part of the Stellar protocols, and the Stellar network will resolve these orders on its own when there is a match.
	
	7. Token purchaseToken purchase (purchaseToken.js)purchaseToken.js
		
		a. To acquire a given token, an account has to trust the asset and submit a buying order that matches the offer.
		
		b. Once submitted, if it matches, the transaction is executed and the purchaser and distributor balances updated.
		
		c. In this example, I'm using the Root account to perform those steps.
	
	>> ADDITIONAL INFORMATIONS
	
	1. Check Balance (checkBalance.js)
		
		a. A simple script to check balance the static account given inside script.
	
	2. Pairs.json
		
		a. Accounts created will be stored inside this file as mentioned inside createAccount.js file.
	
	3. generateICO.sh
		
		a. Simple shell script which runs all the js script in the sequence to generate the ICO and transfer the asset from one account to another.
