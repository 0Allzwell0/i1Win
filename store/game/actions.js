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
    let cui = localStorage.getItem('CUI') || Base64.encode(json)
    return cui
}

const actions = {
    // Get Games List
    async getGamesList({ commit }, { productCode, isSlots, isNew, isFeatured, isJackpot, isTable }) {
        const payload = {
            productCode: productCode,
            isSlots: isSlots,
            isNew: isNew,
            isFeatured: isFeatured,
            isJackpot: isJackpot,
            isTable: isTable,
            website_id: WEBSITE_ID
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
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, category, productCode, gameID, exp }
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