import { Base64 } from 'js-base64';
import { WEBSITE_ID, ACCOUNT_ID } from '~/environment'
import * as types from './type'
import GameService from '~/service/game'

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
}

// Get CUI (Base64_Encode([website_id, account_id]))
function getCUI() {
    let json = JSON.stringify({
        website_id: WEBSITE_ID,
        account_id: ACCOUNT_ID
    })

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
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = {
            cui,
            tab,
            is_mobile: 1,
            lang: localStorage.getItem('LANGUAGE') || 'en',
            exp
        }
        const response = await GameService.getGamesBefore(payload, 'Playtech')
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
            lang: localStorage.getItem('LANGUAGE') || 'en',
            exp
        }
        const response = await GameService.getGamesAfter(payload, 'Playtech')
        if (response.status === 200) {
            commit(types.GET_GAMES_LIST_SUCCESS, { data: response.data.games, status: response.status })
        } else {
            commit(types.GET_GAMES_LIST_FAIL, response.status)
        }
    },

    // Get Game URL
    async getGameURL({ commit }, { category, productCode, gameID }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, category, productCode, gameID, is_mobile: 1, exp }
        const response = await GameService.getGameURL(payload)
        if (response.status === 200) {
            commit(types.GET_GAME_URL_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_GAME_URL_FAIL, { data: response.data, status: response.status })
        }
    }
}

export default actions