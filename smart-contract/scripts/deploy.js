const hre = require('hardhat')

async function main() {
  const RequestPrayerCoinFactory = await hre.ethers.getContractFactory('RequestPrayerCoin')
  const RequestPrayerCoin = await RequestPrayerCoinFactory.deploy()

  await RequestPrayerCoin.deployed()

  console.log('Prayer Request Coin deployed to:', RequestPrayerCoin.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })