import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Eos from 'eosjs';
import ecc from 'eosjs-ecc';

class App extends Component {

	randomAccountName() {
		const size = 12;
		let text = "";
		const possible = "abcdefghij12345";
		for(let i=0; i<size; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}

	createAccount(){
		this.scatter.suggestNetwork(this.network).then(() => {
			ecc.randomKey().then(privateKey => {
				const publicKey = ecc.privateToPublic(privateKey);
				console.log(privateKey);
				console.log(publicKey);
				const accountName = this.randomAccountName();
				const stakerName = process.env.REACT_APP_ACCOUNT_NAME;
				const keyProvider = process.env.REACT_APP_PRIVATE_KEY;
				const httpEndpoint = `http://${process.env.REACT_APP_NETWORK_HOST}:${process.env.REACT_APP_NETWORK_PORT}`;
				let eos = Eos.Localnet({httpEndpoint, keyProvider});
				eos.newaccount({
					creator: stakerName,
					name: accountName,
					owner: publicKey,
					active: publicKey,
					recovery: stakerName,
					deposit: `1 EOS`
				}).then(account => {
					/*   
					   setTimeout(() => {
					   eos.contract('eosio.token').then(contract => {
					   contract.transfer(stakerName, accountName, '10 EOS', 'memo', false).then((result) => {console.log(result)})
					   });
					   }, 500); 
					   }).catch(e => {
					   console.log('error', e);*/
				}) 
			})
		})
		//})
		return;
	}


	logic() {
		document.addEventListener('scatterLoaded', () => {
			//window.scatter.requireVersion();
			this.scatter = window.scatter;
			window.scatter = null;		  
			//scatter.authenticate()
			//      .then(res => console.log('auth res', res))
			//      .catch(err => console.log('auth err', err))
			const host = process.env.REACT_APP_NETWORK_HOST;
			const port = process.env.REACT_APP_NETWORK_PORT;
			this.network = { blockchain:'eos', host, port };
			const eosOptions = {};
			const eos = this.scatter.eos( this.network, Eos.Localnet, eosOptions );
			eos.getBlock(1).then((result) => {
				console.log(result);
			});			

			this.createAccount();
			this.scatter.getIdentity({ accounts:[this.network] })
				.then(id => {this.id = id});
			console.log(this.id);

		})
		return;
	}


  render() {
    this.logic();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
