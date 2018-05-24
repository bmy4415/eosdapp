import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class MusicPlayerComponent extends Component {
	
	render()
	{
		return (
			<div className="MusicPlayerComponent">
				<hr/>
				<Grid>
					<audio src={this.props.statefunction.currentMusicSrc} controls autoPlay/>					
					<hr/>
				</Grid>
			</div>
		);
	}
}

export default MusicPlayerComponent;
