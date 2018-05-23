import AddMusicComponent from '../components/AddMusicComponent.js'
import { addMusic, busyStart, busyEnd } from '../store/actions.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
	return {
		statefunction : state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onBusyStart : () => {
			dispatch(busyStart())
		},
		onBusyEnd : () => {
			dispatch(busyEnd())
		},

		onAddMusic : (blockInfo, ipfsHash) => {
			dispatch(addMusic(blockInfo, ipfsHash))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMusicComponent);
