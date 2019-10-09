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
    async getGameURL({ commit }, { category, productCode, gameID }) {
        const payload = { category, productCode, gameID }
        const response = await GameService.getGamesList(payload)
        if (response.status === 200) {
            commit(typess.GET_GAME_URL_SUCCESS, { data: response.data, status: reponse.status })
        } else {
            commit(typess.GET_GAME_URL_FAIL, { data: response.data, status: response.status })
        }
    }
}

export default actions