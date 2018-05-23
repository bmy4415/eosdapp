import React, { Component } from 'react';
import { Grid, Form, Button } from 'react-bootstrap';
import ipfs from '../ipfs.js';
import { CONTRACT_NAME, KEY_PROVIDER_PRIVATE_KEY, LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from '../global.js'; 
import * as Eos from 'eosjs';

class AddMusicComponent extends Component {
	state = {
		ipfsHash:null,
		buffer:'',
		musicName:'',
		singer:'',
	};
	
	addMusicToEos() {
		const account = this.props.statefunction.scatter.identity.accounts.find(account => account.blockchain === 'eos');
		const keyProvider = KEY_PROVIDER_PRIVATE_KEY;
		const httpEndpoint = `http://${LOCAL_NETWORK_HOST}:${LOCAL_NETWORK_PORT}`;
		let eos = Eos.Localnet({httpEndpoint, keyProvider});

		const options = {
			authorization: [
				`${account.name}@${account.authority}`,
			]
		};
		
		eos.contract(CONTRACT_NAME).then(contract => {
			contract.addmusic(this.state.musicName, this.state.singer, this.state.ipfsHash, account.name, options).then(result => {
				this.props.onAddMusic(result.transaction_id, this.state.ipfsHash);
				this.props.onBusyEnd();
				console.log(this.props.statefunction);
				console.log(this.state);
			})
		})
	}
	

	onSubmit = async (event) => {
		event.preventDefault();
		this.props.onBusyStart();
		console.log(this.props.statefunction);
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			this.setState({ ipfsHash:ipfsHash[0].hash }); 
			this.addMusicToEos();
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

	captureMusicName = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({musicName : event.target.value});
	}

	captureSinger = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({singer : event.target.value});
	}


	convertToBuffer = async (reader) => {
		//file is converted to a buffer for upload to IPFS
		const buffer = await Buffer.from(reader.result);
		//set this buffer -using es6 syntax
		this.setState({buffer});
	};  


	render()
	{
		return (
			<div className="AddMusicComponent">
				<hr/>
				<Grid>
					<h3> Choose file to send to IPFS </h3>
					<Form onSubmit={this.onSubmit}>
						<label>
							Music Name 
							<input type="text" onChange = {this.captureMusicName} />
						</label>
						<br/>
						<label>
							Singer 
							<input type="text" onChange = {this.captureSinger} />
						</label>
						<br/>
						<input type = "file" onChange = {this.captureFile}/>
						<Button	bsStyle="primary" type="submit">
							Send it
						</Button>
					</Form>
					<hr/>
					{ this.props.statefunction.addMusicIsSuccess ? <h3> Upload success! <br/> TXID = {this.props.statefunction.addMusicSuccessTxID} <br/> IPFS hash = {this.props.statefunction.addMusicSuccessIPFS} </h3> : null }
					
				</Grid>
			</div>
		);
	}
}

export default AddMusicComponent;
