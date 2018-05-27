export const busyStart = () => {
	return {
		type : "BUSY_START",
	}
}

export const busyEnd = () => {
	return {
		type : "BUSY_END",
	}
}

export const addMusic = (txID, ipfsHash) => {
	return {
		type : "ADD_MUSIC",
		txID : txID,
		ipfsHash : ipfsHash,
	}
}

export const initScatter = (scatter, scatter_eos, identity) => {
	return {
		type : "INIT_SCATTER",
		scatter : scatter,
		scatter_eos : scatter_eos,
	}
}

export const setMusicsTable = (musicsTable) => {
	return {
		type : "SET_MUSICS_TABLE",
		musicsTable : musicsTable,
	}
}

export const setCurrentMusicSrc = (sourceUrl) => {
	return {
		type : "SET_CURRENT_MUSIC",
		sourceUrl : sourceUrl,
	}
}
