import * as types from './type'
import GameService from '~/service/game'

// Set Timestamp
function getExpTimestamp() {
    let exp = Math.floor(Date.now() / 1000)
    localStorage.setItem('EXP', exp)
    return Math.floor(exp) + 600 // 10 min
}

// Get CUI
function getCUI() {
    let cui = null
    if (localStorage.getItem('userData')) {
        let userData = localStorage.getItem('userData')
        cui = JSON.parse(userData).cui
    }

    return cui
}

const actions = {
    // Get Games List. Before Login
    async getGamesBefore({ commit }, { productCode, tab }) {
        const response = await GameService.getGamesBefore(productCode, tab)
        if (response.status === 200) {
            commit(types.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(types.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Get Games List Before. After Login
    async getGamesAfter({ commit }, { productCode, tab }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = {
            cui,
            tab,
            is_mobile: 1,
            lang: localStorage.getItem('LANGUAGE'),
            exp
        }
        const response = await GameService.getGamesAfter(payload, productCode)
        if (response.status === 200) {
            commit(types.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(types.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Search Slots Games
    async searchGames({ commit }, gameName) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, gameName, is_mobile: 1, exp }
        const response = await GameService.searchGames(payload, gameName)
        if (response.status === 200) {
            commit(types.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(types.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Get Game URL
    async getGameURL({ commit }, { category, product_code, game_id }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, category, product_code, game_id, is_mobile: 1, exp }
        const response = await GameService.getGameURL(payload)
        if (response.status) {
            if (response.status === 200) {
                commit(types.GET_GAME_URL_SUCCESS, { data: response.data, status: response.status })
            } else {
                commit(types.GET_GAME_URL_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    }
}

export default actions