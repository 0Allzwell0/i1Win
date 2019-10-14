import * as types from './type'
import GameService from '~/service/game'

const actions = {
    // Get Games List
    async getGamesList({ commit }, { productCode, isSlots, isNew, isFeatured, isJackpot, isTable }) {
        const payload = {
            productCode: productCode,
            isSlots: isSlots,
            isNew: isNew,
            isFeatured: isFeatured,
            isJackpot: isJackpot,
            isTable: isTable
        }
        const response = await GameService.getGamesList(payload)
        if (response.status === 200) {
            commit(types.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(types.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Get Game URL
    async getGameURL({ commit }, { isDownload, category, productCode, gameID }) {
        const payload = { category, productCode, gameID }
        const response = await GameService.getGamesList(payload)
        if (response.status === 200) {
            if (isDownload)
                commit(types.GET_DOWNLOAD_DATA_SUCCESS, { productCode, data: response.data, status: reponse.status })
            else
                commit(types.GET_GAME_URL_SUCCESS, { data: response.data, status: reponse.status })
        } else {
            if (!isDownload)
                commit(types.GET_DOWNLOAD_DATA_FAIL, { productCode, status: response.status })
            else
                commit(types.GET_GAME_URL_FAIL, response.status)
        }
    }
}

export default actions