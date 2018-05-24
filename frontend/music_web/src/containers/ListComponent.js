import ListComponent from '../components/ListComponent.js'
import { busyStart, busyEnd, setCurrentMusicSrc } from '../store/actions.js'
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

		onSetCurrentMusicSrc : (sourceUrl) => {
			dispatch(setCurrentMusicSrc(sourceUrl))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
