import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { List } from 'semantic-ui-react';
import ipfs from '../ipfs.js';

class ListComponent extends Component {

	// when user click an item, currentMusicSrc is set, and MusicPlayer starts playing the music
	onClickItem = async (event, data) => {
		event.preventDefault();
		this.props.onBusyStart();
		await ipfs.cat(data.value, (err, file) => {
			console.log(data.value);
			console.log(err,file);
			let arrayBufferView = new Uint8Array( file );
			let blob_audio = new Blob( [ arrayBufferView ], { type : "audio/mpeg" } );
			let audioUrl = window.URL.createObjectURL( blob_audio );
			this.props.onSetCurrentMusicSrc(audioUrl);
			this.props.onBusyEnd();
			console.log(this.props.statefunction);
		})
	}

	render()
	{
		return (
					<List> 
						{this.props.statefunction.searchResultList.map(
						(music) =>	
							<List.Item onClick={this.onClickItem} key={music.ipfs_hash} value={music.ipfs_hash_str}>
								<List.Content>
									<List.Header as='a'> {music.music_name} </List.Header>
									<List.Description> <a><b> {music.singer} </b></a> {music.ipfs_hash} </List.Description>
								</List.Content>
							</List.Item>
						)} 
					</List>
		);
	}
}

export default ListComponent;
