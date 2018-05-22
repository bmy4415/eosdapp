import React, { Component } from 'react';
import './App.css';
import * as Eos from 'eosjs';
import ecc from 'eosjs-ecc';
import ipfs from './ipfs.js';
import { Grid, Form, Button } from 'react-bootstrap';
import GetFileIpfs from './GetFileIpfs.js';
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends Component {

	state = {
		ipfsHash:null,
		buffer:'',
		busy:false,
	};

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({busy:true});
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			console.log(err,ipfsHash);
			this.setState({ ipfsHash:ipfsHash[0].hash });
			console.log(this.state);
			this.setState({busy:false});
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

	searchMusics(){

		const httpEndpoint = `http://${process.env.REACT_APP_NETWORK_HOST}:${process.env.REACT_APP_NETWORK_PORT}`;
		const eos = Eos.Localnet({httpEndpoint:httpEndpoint});
		eos.getTableRows({
			"json": true,
			"scope": 'music2',
			"code": 'music2',
			"table": "musics",
			"limit": 500
		}).then(result => {console.log(result);
			});

		return;
	}

	addMusic(){
		this.scatter.suggestNetwork(this.network).then(() => {

			const accountName = "music2";
			const keyProvider = process.env.REACT_APP_PRIVATE_KEY;
			const httpEndpoint = `http://${process.env.REACT_APP_NETWORK_HOST}:${process.env.REACT_APP_NETWORK_PORT}`;
			let eos = Eos.Localnet({httpEndpoint, keyProvider});
			const signProvider = (buf, sign) => {
				return sign(buf, "5J9wkAzVnMSBha1hPnQZX7vAHmbaVLFhd7NJXfejPRiQzTHHo1T")
			};
		
			const options = {
				authorization: [
					"music2@active",
					"music2@owner"
				]
			};

			eos.contract('music2', {signProvider}).then(contract => {
				contract.addmusic('anywhere', 'mcthemax', 'hashvalue2', accountName, options).then((result) => {console.log(result)})
			}).catch(e => {
				console.log('error', e);
			}) 
		})
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
			//this.addMusic();
			//this.createAccount();
			this.searchMusics();
		})
		return;
	}


	render() {
    	this.logic();
		return (
			<div className="App">
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
				<header className="App-header">
					<h1> IPFS with Create React App</h1>
				</header>
					{ this.state.busy ? <Dimmer active>
					<Loader size="big" inline="centered" content="Loading.."/>
				</Dimmer> : null }
				
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

				<GetFileIpfs/>


			</div>
		);
	} //render

}

export default App;
