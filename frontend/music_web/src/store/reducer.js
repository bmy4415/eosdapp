import { initialState } from './selectors.js'

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "BUSY_START":
			return Object.assign({}, state, {
				busy : true,
				addMusicIsSuccess : false,
            });
		case "BUSY_END":
			return Object.assign({}, state, {
				busy : false,
            });

		case "INIT_SCATTER":
			return Object.assign({}, state, {
				scatter : action.scatter,
				scatter_eos : action.scatter_eos,
            });

		case "ADD_MUSIC":
			return Object.assign({}, state, {
				addMusicIsSuccess : true,
				addMusicSuccessTxID : action.txID,
				addMusicSuccessIPFS : action.ipfsHash,
            });

		case "SET_MUSICS_TABLE":
			return Object.assign({}, state, {
				searchResultList : action.musicsTable,
            });

		case "SET_CURRENT_MUSIC":
			return Object.assign({}, state, {
				currentMusicSrc : action.sourceUrl,
            });

		default:
			return state;
	}
}

export default reducer
