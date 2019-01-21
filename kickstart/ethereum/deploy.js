const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require ('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const walletMnemonic = 'suffer print capital expose tape clip victory coffee phrase legend buffalo fossil';
const walletAPIUrl = 'https://rinkeby.infura.io/v3/5972d1d45c6f43ad86c32955ab41939b';

const provider = new HDWalletProvider(
    walletMnemonic,
    walletAPIUrl
);


const web3 = new Web3(provider);


const deploy = async () => {
    //Get a list of all accounts 
  const accounts = await web3.eth.getAccounts();

   console.log('Attempting to deploye from accounts', accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
        )
            .deploy({ data: compiledFactory.bytecode})
            .send({gas: '1000000', from: accounts[0]});

    console.log('Contract Deployed to', result.options.address);
};

deploy();


