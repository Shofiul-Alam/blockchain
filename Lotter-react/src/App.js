import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    //When we are using metamax provider we do not need to tell who is calling
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await lottery.methods.getBalance(lottery.options.address).call();
    console.log(balance);
  
    this.setState({manager, players, balance});
  }

  onSubmit= async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waitting on transaction success....'})

    await lottery.methods.enter().send({
      from: accounts[0], 
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been entered!'})
  };

  draw = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Draw is running....'})

    await lottery.methods.pickWinner().send({
      from: accounts[0], 
    });
    this.setState({message: 'A winner has been picked!'});
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>The lottery contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
        
        <form onSubmit={this.onSubmit}>
          <h4>Please the lottery win money.</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
            value={this.state.value}
            onChange = {event => this.setState({value: event.target.value})}/>
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Time for draw lottery?</h4>
        <button onClick={this.draw}>Find Winner</button>
        <hr />
        <div><h2>{this.state.message}</h2></div>
      </div>
    );
  }
}

export default App;
