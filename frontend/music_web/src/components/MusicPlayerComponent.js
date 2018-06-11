import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class MusicPlayerComponent extends Component {
	
	render()
	{
		return (
			<audio src={this.props.statefunction.currentMusicSrc} controls autoPlay/>					
		);
	}
}

export default MusicPlayerComponent;
