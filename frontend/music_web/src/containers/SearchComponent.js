import SearchComponent from '../components/SearchComponent.js'
import { setMusicsTable, busyStart, busyEnd } from '../store/actions.js'
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

		onSetMusicsTable : (musicsTable) => {
			dispatch(setMusicsTable(musicsTable))
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
