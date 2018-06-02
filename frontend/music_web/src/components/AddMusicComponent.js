import React, { Component } from 'react';
import { Grid, Form, Button } from 'react-bootstrap';
import ipfs from '../ipfs.js';
import { CONTRACT_NAME, LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from '../global.js'; 

class AddMusicComponent extends Component {
	/* state */
	state = {
		ipfsHash:null,
		buffer:'',
		musicName:'',
		singer:'',
	};
	

	/*
	 * function that add music to Eos smart contract table
	 */

	addMusicToEos() {
		this.network = { blockchain:'eos', host:LOCAL_NETWORK_HOST, port:LOCAL_NETWORK_PORT,};
		this.props.statefunction.scatter.getIdentity({ accounts:[this.network] }).then(id => { 
			console.log(id.accounts);
			const account = id.accounts.find(account => account.blockchain === 'eos');
		
			const options = {
				authorization: [
					`${account.name}@${account.authority}`,
				],
			};
			console.log(this.props.statefunction.scatter.identity);

			this.props.statefunction.scatter_eos.contract(CONTRACT_NAME,).then(contract => {
				console.log(this.state.ipfsHash);
				console.log(contract);

				contract.addmusic(this.state.musicName, this.state.singer, this.state.ipfsHash, account.name, options).then(result => {
					this.props.onAddMusic(result.transaction_id, this.state.ipfsHash);//this is for success message

					//clear input components
					this.setState({musicName : ''});
					this.setState({singer: ''});
					this.refs.fileInput.value = '';
					
					this.props.statefunction.scatter.forgetIdentity();

					//stop loading spinner
					this.props.onBusyEnd();
					console.log(this.props.statefunction);
				})
			})
		})	
	}
	

	/*
	 * when user click the send button, this function will be called
	 */
	onSubmit = async (event) => {
		event.preventDefault();
		this.props.onBusyStart();
		console.log(this.props.statefunction);

		// add file to ipfs, and call addMusicToEos with ipfs hash
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			this.setState({ ipfsHash:ipfsHash[0].hash }); 
			this.addMusicToEos();
		}) //await ipfs.add 
	}; //onSubmit



	// functions for capturing inputs
	captureFile = (event) => {
		event.stopPropagation()
		event.preventDefault()
		const file = event.target.files[0]
		let reader = new window.FileReader()
		reader.readAsArrayBuffer(file)
		reader.onloadend = () => this.convertToBuffer(reader)
	};

	captureMusicName = (event) => {
		this.setState({musicName : event.target.value});
	}

	captureSinger = (event) => {
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
					<h3> Choose file to upload </h3>
					<Form onSubmit={this.onSubmit}>
						<label>
							Music Name 
							<input type="text" onChange = {this.captureMusicName} value = {this.state.musicName} />
						</label>
						<br/>
						<label>
							Singer 
							<input type="text" onChange = {this.captureSinger} value = {this.state.singer} />
						</label>
						<br/>
						<input type = "file" onChange = {this.captureFile} ref="fileInput" />
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
