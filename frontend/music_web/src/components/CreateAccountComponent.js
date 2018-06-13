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
		const httpEndpoint = `http://${LOCAL_NETWORK_HOST}:${LOCAL_NETWORK_PORT}`; // http://127.0.0.1:8888
		const stakerName = "eosio"; 
		const keyProvider = KEY_PROVIDER_PRIVATE_KEY; // WIF private key
		const eos = Eos.Localnet({httpEndpoint, keyProvider});

		eos.newaccount({
			creator: stakerName,
			name: this.state.inputAccountName,
			owner: this.state.inputPublicKey,
			active: this.state.inputPublicKey,
		})
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
					<Form onSubmit={this.onSubmit}>
						<table align="center">
							<tr>
								<td> <label> Account Name </label> </td>
								<td> <input type="text" onChange = {this.captureAccountName} value = {this.state.inputAccountName}/> </td>
								<td rowspan="2"> &nbsp;&nbsp;&nbsp;
									<Button	bsStyle="primary" type="submit" style={{}}>
										Create
									</Button>
								</td>
							</tr>
							<tr>
								<td> <label> Public Key </label> </td>
								<td> <input type="text" onChange = {this.capturePublicKey} value = {this.state.inputPublicKey}/> </td>
							</tr>
						</table>
					</Form>
		);
	}
}

export default CreateAccountComponent;
