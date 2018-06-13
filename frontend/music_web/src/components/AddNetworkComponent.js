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
			<p> If you did not add our network, 
				<a href="" onClick={this.onClickAddNetwork} style={{ color: 'skyblue'}}> click</a>
			</p>
		);

	}
}

export default AddNetworkComponent;
