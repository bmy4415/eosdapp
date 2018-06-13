import React, { Component } from 'react';
import styles from './App.css';
import AddMusicComponent from './containers/AddMusicComponent.js'
import * as Eos from 'eosjs';
import { LOCAL_NETWORK_HOST, LOCAL_NETWORK_PORT } from './global.js';
import { Dimmer, Loader } from 'semantic-ui-react'
import SearchComponent from './containers/SearchComponent.js'
import ListComponent from './containers/ListComponent.js'
import MusicPlayerComponent from './containers/MusicPlayerComponent.js'
import CreateAccountComponent from './containers/CreateAccountComponent.js'
import AddNetworkComponent from './containers/AddNetworkComponent.js'

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

			this.network = { blockchain: 'eos', host: LOCAL_NETWORK_HOST, port: LOCAL_NETWORK_PORT, };
			const eosOptions = {};
			this.scatter_eos = this.scatter.eos(this.network, Eos.Localnet, eosOptions);
			this.props.onInitScatter(this.scatter, this.scatter_eos);
			this.props.onBusyEnd();

		})
	}


	// if busy state is true, loading spinner appears
	render() {
		this.initScatter();
		return (
			<div className="App">
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
				{this.props.statefunction.busy ?
				<div class="fixedloader">
					<Dimmer active>
						<Loader size="big" inline="centered" content="Loading.."/>
					</Dimmer>
				</div> : null}
			
				<div class="splash-container">
					<div class="splash" style={{ backgroundcolor: 'transparent' }}>
						<h1 class="splash-head">MEOSIC</h1>
						<p class="splash-subhead">
							Music streaming service, powered by EOS
       					</p>
						<br />
						<p>
							{this.props.statefunction.currentMusicSrc === "" ?
								<a href="#search" class="pure-button pure-button-primary">Search Music</a>
								: <MusicPlayerComponent />}
						</p>
					</div>
				</div>


				<div class="content-wrapper">
					<div class="content">
					<section id="search">
						<br />
						<h2 class="content-head is-center">Search</h2>

						<div class="pure-g">
							<div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">

								<h3 class="content-subhead">
									Search any music you want from EOS blockchain!<br />
               				 	</h3>
								<p> search by music title </p>
								<SearchComponent />
								{this.props.statefunction.searchResultList.size === 0 ?
									null
									: <ListComponent />}
							</div>
							<br />
						</div>
						</section>
					</div>

					<div class="ribbon l-box-lrg pure-g">
						<br /><br /><br />
						<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">

							<h2 class="content-head content-head-ribbon">Upload</h2>

							<h3>
								Publish your own music to EOS blockchain!
                			</h3>

							<AddMusicComponent />
							<h3><br /><br /></h3>

						</div>
					</div>

					<div class="content">
						<br />
						<h2 class="content-head is-center">Create Account</h2>

						<div class="pure-g">
							<div class="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">

								<h3 class="content-subhead">
									<i class="fa fa-rocket"></i>
									If you don't have any account, create one
								</h3>
								<CreateAccountComponent />
								<h3><br /><br /><br /></h3>
							</div>
						</div>
					</div>


					<div class="footer l-box is-center" style={{ color: 'white', background: 'grey' }}>
						<AddNetworkComponent />
					</div>
				</div>


			</div>
		);
	}
}

export default App;
