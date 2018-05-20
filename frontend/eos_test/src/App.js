import React, { Component } from 'react';
import './App.css';
import * as Eos from 'eosjs';
import ecc from 'eosjs-ecc';
import ipfs from './ipfs.js';
import { Grid, Form, Button } from 'react-bootstrap';


class App extends Component {

	state = {
		ipfsHash:null,
		buffer:'',
	};

	onSubmit = async (event) => {
		event.preventDefault();
		//bring in user's metamask account address
		//const accounts = await web3.eth.getAccounts();

		//console.log('Sending from Metamask account: ' + accounts[0]);
		//obtain contract address from storehash.js
		//const ethAddress= await storehash.options.address;
		//this.setState({ethAddress});
		//save document to IPFS,return its hash#, and set hash# to state
		//https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			console.log(err,ipfsHash);
			//setState by setting ipfsHash to ipfsHash[0].hash 
			this.setState({ ipfsHash:ipfsHash[0].hash });
			console.log(this.state);
			
			// call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
			//return the transaction hash from the ethereum contract
			//see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

//			storehash.methods.sendHash(this.state.ipfsHash).send({
//				from: accounts[0] 
//			}, (error, transactionHash) => {
//				console.log(transactionHash);
//				this.setState({transactionHash});
//			}); //storehash 
		}) //await ipfs.add 
	}; //onSubmit



	captureFile = (event) => {
		event.stopPropagation()
		event.preventDefault()
		const file = event.target.files[0]
		let reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => this.convertToBuffer(reader)    
	};

	convertToBuffer = async (reader) => {
		//file is converted to a buffer for upload to IPFS
		const buffer = await Buffer.from(reader.result);
		//set this buffer -using es6 syntax
		this.setState({buffer});
	};

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
				const accountName = this.randomAccountName();
				console.log(privateKey);
				console.log(publicKey);
				console.log(accountName);
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
					this.scatter.getIdentity({ accounts:[this.network] })
						.then(id => {
							console.log(this.scatter)
							console.log(this.network)
							console.log(id)});
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
		})
		return;
	}


	render() {
    	this.logic();
		return (
			<div className="App">
				<header className="App-header">
					<h1> IPFS with Create React App</h1>
				</header>
				<hr />
				<Grid>
					<h3> Choose file to send to IPFS </h3>
					<Form onSubmit={this.onSubmit}>
						<input 
						type = "file"
						onChange = {this.captureFile}
						/>
						<Button 
						bsStyle="primary" 
						type="submit"> 
						Send it 
						</Button>
					</Form>
				<hr/>
				</Grid>
			</div>
		);
	} //render

}

export default App;
