require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


 module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://speedy-nodes-nyc.moralis.io/8dba0e81db8e840e027a5cd2/eth/rinkeby',
      accounts: ['6bf84747172ee35bf46168135c247fc2dc6e8b8bd658a1eff22ab3e5ce2a626f'],
    },
  },
}