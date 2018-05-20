import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ipfs from './ipfs.js';
//import ReactAudioPlayer from 'react-audio-player';
import { Dimmer, Loader } from 'semantic-ui-react'
import Audio from 'react-audioplayer';
//import ReactDOM from 'react-dom';

class GetFileIpfs extends Component {
	
	state = {
		pic:"https://gateway.ipfs.io/ipfs/QmVA9k4z8WMC74Byj5eYJBc5MXc1tAcRFfUZZgv9UDo99P",
		audio:"",
		busy:false,
		playlist:[{name:"name",
		src:"",
		img:"https://gateway.ipfs.io/ipfs/QmVA9k4z8WMC74Byj5eYJBc5MXc1tAcRFfUZZgv9UDo99P",}],
	}

	onSubmitPic = (event) => {
		event.preventDefault();
		this.setState({busy:true});
		ipfs.cat(this.refs.ipfsHash.value, (err, file) => {
			let arrayBufferView = new Uint8Array( file );
			let blob_jpeg = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );

			let imageUrl = window.URL.createObjectURL( blob_jpeg );	
			this.setState({pic:imageUrl});
			this.setState({busy:false});
			console.log(this.state.pic);
		})
	}; //onSubmit


	onSubmitAudio = async (event) => {
		event.preventDefault();
		this.setState({busy:true});
		await ipfs.cat(this.refs.ipfsHash.value, (err, file) => {

			let arrayBufferView = new Uint8Array( file );
			let blob_audio = new Blob( [ arrayBufferView ], { type: "audio/mpeg" } );
			let audioUrl = window.URL.createObjectURL( blob_audio );
								
			this.setState({audio:audioUrl});
			console.log(this.state.audio);
			let newPlaylist = [{name:"name",
				src:this.state.audio,
				img:this.state.pic,
			}];
			this.setState({playlist:newPlaylist});
			this.setState({busy:false});
		})
	}; //onSubmit


	render() {
		return(
			<div className="GetFileIpfs">
				{ this.state.busy ? <Dimmer active>
					<Loader size="big" inline="centered" content="Loading.."/>
				</Dimmer> : null }
				<h3> Input IPFS hash to get cover image </h3>
				<Form onSubmit={this.onSubmitPic}>
					<input 
					type = "text"
					ref="ipfsHash"
					/>
					<Button 
					bsStyle="primary" 
					type="submit"> 
					Send it 
					</Button>
				</Form>
				<h3> Input IPFS hash to get audio file </h3>
				<Form onSubmit={this.onSubmitAudio}>
					<input 
					type = "text"
					ref="ipfsHash"
					/>
					<Button 
					bsStyle="primary" 
					type="submit"> 
					Send it 
					</Button>
				</Form>
				<Audio
					playlist={this.state.playlist}			
					autoPlay={true}
					fullPlayer={true}
					ref={audioComponent => { this.audioComponent = audioComponent; }}
				/>
			</div>	
		)
	}
}

export default GetFileIpfs;
