import React, { Component } from 'react';
import { Grid, Form, Button } from 'react-bootstrap';
import { KEY_PROVIDER_PRIVATE_KEY, LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from '../global.js'; 
import * as Eos from 'eosjs';

class CreateAccountComponent extends Component {
	state = {
		inputAccountName:"",
		inputPublicKey:"",
	};

	createAccount()
	{
		//this.network = { blockchain:'eos', LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT };
		//this.props.statefunction.scatter.suggestNetwork(this.network).then(()=>
		//{
		const httpEndpoint = `http://${LOCAL_NETWORK_HOST}:${LOCAL_NETWORK_PORT}`; // http://127.0.0.1:8888
		const stakerName = "eosio"; 
		const keyProvider = KEY_PROVIDER_PRIVATE_KEY; // WIF private key
		const eos = Eos.Localnet({httpEndpoint, keyProvider});

		const options = {
			broadcast: true,
			sign: true,
			//chainId :'706a7ddd808de9fc2b8879904f3b392256c83104c1d544b38302cc07d9fca477',
		};
		eos.newaccount({
			creator: stakerName,
			name: this.state.inputAccountName,
			owner: this.state.inputPublicKey,
			active: this.state.inputPublicKey,
		}, options)
			.then(result => {
				this.props.onBusyEnd();
				console.log("account created!", result);
				this.setState({inputAccountName: "", inputPublicKey: ""});
			})
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onBusyStart();
		this.createAccount();
	}; //onSubmit

	captureAccountName = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({inputAccountName : event.target.value});
	}

	capturePublicKey = (event) => {
		event.stopPropagation()
		event.preventDefault()
		this.setState({inputPublicKey : event.target.value});
	}

	render()
	{
		return (
			<div className="CreateAccountComponent">
				<hr/>
				<Grid>
					<h3> Input account name and public key to create </h3>
					<Form onSubmit={this.onSubmit}>
						<label>
							Account Name 
							<input type="text" onChange = {this.captureAccountName} value = {this.state.inputAccountName}/>
						</label>
						<label>
							Public Key 
							<input type="text" onChange = {this.capturePublicKey} value = {this.state.inputPublicKey}/>
						</label>

						<Button	bsStyle="primary" type="submit">
							Send it
						</Button>
					</Form>
					<hr/>
				</Grid>
			</div>
		);
	}
}

export default CreateAccountComponent;
