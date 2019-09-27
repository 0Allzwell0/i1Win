import * as type from './type'
import GameService from '~/service/game'

const actions = {
    // Get Games List
    async getGamesList({ commit }, { productCode, isSlots, isNew, isFeatured, isJackpot, isTable }) {
        const response = await GameService.getGamesList(productCode, isSlots, isNew, isFeatured, isJackpot, isTable)
        if (response.status === 200) {
            commit(type.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(type.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Get Game URL
    async getGameURL({ commit }, { accessToken, category, productCode, gameID }) {
        const response = await GameService.getGamesList(accessToken, category, productCode, gameID)
        if (response.status === 200) {
            commit(types.GET_GAME_URL_SUCCESS, { data: response.data, status: reponse.status })
        } else {
            commit(types.GET_GAME_URL_FAIL, { data: response.data, status: response.status })
        }
    }
}

export default actions