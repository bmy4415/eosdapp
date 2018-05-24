import MusicPlayerComponent from '../components/MusicPlayerComponent.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

export default connect(mapStateToProps, undefined)(MusicPlayerComponent);
