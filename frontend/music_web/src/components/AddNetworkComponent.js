import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from '../global.js'; 

class AddNetworkComponent extends Component {

	AddNetworkComponent(){
		this.network = { blockchain:'eos', host:LOCAL_NETWORK_HOST, port:LOCAL_NETWORK_PORT,};
		this.props.statefunction.scatter.suggestNetwork(this.network).then(()=>
			{
				this.props.onBusyEnd();
			});
	}       

	onClickAddNetwork = (event) => {
		event.preventDefault();
		this.props.onBusyStart();
		this.AddNetworkComponent();
	};

	render()
	{
		return (
			<div className="AddNetworkComponent">
				<hr/>
				<Grid>
					<h3> If you did not add our network, press this button </h3>
					<Button	bsStyle="primary" onClick={this.onClickAddNetwork}>
						Add Network
					</Button>
					<hr/>
				</Grid>
			</div>
		);
	}
}

export default AddNetworkComponent;
