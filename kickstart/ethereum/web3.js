import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    //the code running inside server or metamax is not running

    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/5972d1d45c6f43ad86c32955ab41939b'
    );

    web3 = new Web3(provider);
}

export default web3;