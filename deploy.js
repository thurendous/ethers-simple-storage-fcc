const ethers = require('ethers')
const fs = require('fs-extra') // to read files
require("dotenv").config()

async function main() {
    // connetion with the blockchain
    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RINKEBY_RPC
    )
    // wallet with a private key
    // console.log(process.env.PRIVATE_KEY)
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    )
    
    // using a new way to create secure wallet
    // console.log(process.env.PRIVATE_KEY)
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8')
    const encryptedJson = fs.readFileSync("./encryptedKey.json", "utf8")
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PW)
    // wallet = await wallet.connect(provider)
    console.log(wallet.address)
    
    // deploy with inside functions
    const binary = fs.readFileSync(
        './Simplestorage_sol_SimpleStorage.bin',
        'utf8'
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait ....")
    const contract = await contractFactory.deploy({})
    const deploymentReceipt = await contract.deployTransaction.wait(1)
        console.log(`contract address ${contract.address}`)
    // console.log("Here is the deployment transaction:(transaction response) ")
    // console.log(contract.deployTransaction)
    // -> transaction receipt is what you get for waiting for the block confirmation
    console.log("Here is the deploying transaction receipt: ")
    console.log(deploymentReceipt)

    // console.log(contract)
    // console.log("Let's deploy with only transaction data! ")
    // nonce = await wallet.getTransactionCount()
    // this is a tranaction before signing
    // const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: '0x608060405234801561001057600080fd5b50610944806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b60405161007191906102b2565b60405180910390f35b610094600480360381019061008f919061030d565b61011c565b005b6100b060048036038101906100ab9190610480565b610126565b005b6100cc60048036038101906100c791906104dc565b6101af565b6040516100d991906102b2565b60405180910390f35b6100fc60048036038101906100f7919061030d565b6101dd565b60405161010a9291906105ad565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908161018591906107e9565b5050508060028360405161019991906108f7565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101ed57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102169061060c565b80601f01602080910402602001604051908101604052809291908181526020018280546102429061060c565b801561028f5780601f106102645761010080835404028352916020019161028f565b820191906000526020600020905b81548152906001019060200180831161027257829003601f168201915b5050505050905082565b6000819050919050565b6102ac81610299565b82525050565b60006020820190506102c760008301846102a3565b92915050565b6000604051905090565b600080fd5b600080fd5b6102ea81610299565b81146102f557600080fd5b50565b600081359050610307816102e1565b92915050565b600060208284031215610323576103226102d7565b5b6000610331848285016102f8565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61038d82610344565b810181811067ffffffffffffffff821117156103ac576103ab610355565b5b80604052505050565b60006103bf6102cd565b90506103cb8282610384565b919050565b600067ffffffffffffffff8211156103eb576103ea610355565b5b6103f482610344565b9050602081019050919050565b82818337600083830152505050565b600061042361041e846103d0565b6103b5565b90508281526020810184848401111561043f5761043e61033f565b5b61044a848285610401565b509392505050565b600082601f8301126104675761046661033a565b5b8135610477848260208601610410565b91505092915050565b60008060408385031215610497576104966102d7565b5b600083013567ffffffffffffffff8111156104b5576104b46102dc565b5b6104c185828601610452565b92505060206104d2858286016102f8565b9150509250929050565b6000602082840312156104f2576104f16102d7565b5b600082013567ffffffffffffffff8111156105105761050f6102dc565b5b61051c84828501610452565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561055f578082015181840152602081019050610544565b8381111561056e576000848401525b50505050565b600061057f82610525565b6105898185610530565b9350610599818560208601610541565b6105a281610344565b840191505092915050565b60006040820190506105c260008301856102a3565b81810360208301526105d48184610574565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061062457607f821691505b602082108103610637576106366105dd565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261069f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610662565b6106a98683610662565b95508019841693508086168417925050509392505050565b6000819050919050565b60006106e66106e16106dc84610299565b6106c1565b610299565b9050919050565b6000819050919050565b610700836106cb565b61071461070c826106ed565b84845461066f565b825550505050565b600090565b61072961071c565b6107348184846106f7565b505050565b5b818110156107585761074d600082610721565b60018101905061073a565b5050565b601f82111561079d5761076e8161063d565b61077784610652565b81016020851015610786578190505b61079a61079285610652565b830182610739565b50505b505050565b600082821c905092915050565b60006107c0600019846008026107a2565b1980831691505092915050565b60006107d983836107af565b9150826002028217905092915050565b6107f282610525565b67ffffffffffffffff81111561080b5761080a610355565b5b610815825461060c565b61082082828561075c565b600060209050601f8311600181146108535760008415610841578287015190505b61084b85826107cd565b8655506108b3565b601f1984166108618661063d565b60005b8281101561088957848901518255600182019150602085019450602081019050610864565b868310156108a657848901516108a2601f8916826107af565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b60006108d182610525565b6108db81856108bb565b93506108eb818560208601610541565b80840191505092915050565b600061090382846108c6565b91508190509291505056fea2646970667358221220e05d916776ecc95aed67a41d6a857d07e05f358ddc98d99fe8b9073c029669af64736f6c634300080f0033',
    //     chainId: 1337,
    // }
    // sign tx
    // const sigedTxResponse = await wallet.signTransaction(tx)
    // send tx
    // const sentTxResponse = await wallet.sendTransaction(tx)
    // await sentTxResponse.wait(1)
    // console.log(sentTxResponse)

    const currentFavoriteNumber = await contract.retrieve()
    const trasactionResponse = await contract.store("21")
    const transactionReceipt= await trasactionResponse.wait(1)
    console.log("This is the transaction response", trasactionResponse)
    console.log("This is the transaction receipt: ", transactionReceipt)
    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`Current favourite number is: ${currentFavoriteNumber.toString()}`)
    console.log(`Current favourite number is: ${updatedFavoriteNumber.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
