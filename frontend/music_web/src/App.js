import React, { Component } from 'react';
import './App.css';
import AddMusicComponent from './containers/AddMusicComponent.js'
import * as Eos from 'eosjs';
import { LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from './global.js';
import { Dimmer, Loader } from 'semantic-ui-react'
import SearchComponent from './containers/SearchComponent.js'
import ListComponent from './containers/ListComponent.js'
import MusicPlayerComponent from './containers/MusicPlayerComponent.js'

class App extends Component {

	/*
	 * function for initializing "scatter" and "scatter_eos" variable in store
	 */
	initScatter() {
		document.addEventListener('scatterLoaded', () => {
			this.props.onBusyStart();
			this.scatter = window.scatter;
			window.scatter = null;     
		/*	this.scatter.authenticate()
				.then(res => {console.log('auth res', res);
						this.sig = res;})
				.catch(err => console.log('auth err', err));
		*/	
			const host = LOCAL_NETWORK_HOST;
			const port = LOCAL_NETWORK_PORT;
			this.network = { blockchain:'eos', host, port };
			const eosOptions = {};
			this.scatter_eos = this.scatter.eos( this.network, Eos.Localnet, eosOptions );
			this.props.onInitScatter(this.scatter, this.scatter_eos);
			this.props.onBusyEnd();
			this.scatter.suggestNetwork(this.network);
		})
	}


	// if busy state is true, loading spinner appears
	render() {
		this.initScatter();
		return (
			<div className="App">
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
				
				{ this.props.statefunction.busy ? 
					<Dimmer active>
                      <Loader size="big" inline="centered" content  ="Loading.."/>
					</Dimmer> : null }
			
				<MusicPlayerComponent/>
				<AddMusicComponent/>
				<SearchComponent/>
				<ListComponent/>
			</div>
		);
	}
}

export default App;
