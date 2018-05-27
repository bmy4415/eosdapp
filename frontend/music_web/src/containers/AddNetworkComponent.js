import AddNetworkComponent from '../components/AddNetworkComponent.js'
import { busyStart, busyEnd } from '../store/actions.js'
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNetworkComponent);
