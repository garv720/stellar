echo "Creating Account"

node $(find $PWD -type f -name "createAccounts.js")

echo "Finished Creating Account"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Funding Root Account"

node $(find $PWD -type f -name "fundRootAccount.js")

echo "Finished Funding Root Account"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Creating Issuing and Distributing Account"

node $(find $PWD -type f -name "createIssuingAndDistributingAccounts.js")

echo "Finished Issuing and Distributing Account"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Changing Trust"

node $(find $PWD -type f -name "changeTrust.js")

echo "Finished Changing Trust"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Creating Asset"

node $(find $PWD -type f -name "createAsset.js")

echo "Finished Creating Asset"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Locking Issuing Account"

node $(find $PWD -type f -name "lockIssuingAccount.js")

echo "Finished Locking Issuing Account"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Distributing Tokens"

node $(find $PWD -type f -name "tokenDistribution.js")

echo "Finished Distributing Tokens"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Balance Before Purchasing Tokens"

node $(find $PWD -type f -name "checkBalance.js")

echo "++++++++++++++++++++++++++++++++++++++"
echo "Token Purchase is in progress"

node $(find $PWD -type f -name "purchaseToken.js")

echo "Token Purchase Successfull"
echo "++++++++++++++++++++++++++++++++++++++"
echo "Balance After Token Purchase"


node $(find $PWD -type f -name "checkBalance.js")

echo "++++++++++++++++++++++++++++++++++++++"