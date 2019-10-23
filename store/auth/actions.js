import { Base64 } from 'js-base64';
import { WEBSITE_ID, ACCOUNT_ID } from '~/environment'
import * as types from './type'
import AuthService from '~/service/auth'

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
    // Login
    async login({ commit }, { username, password }) {
        const exp = getExpTimestamp()
        const payload = { username, password, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.login(payload)
        if (response.status === 200) {
            commit(types.SUCCESS_AUTH, { data: response.data, status: response.status })
        } else {
            commit(types.FAIL_AUTH, { data: response.data, status: response.status })
        }
    },

    // Logout
    async logout({ commit }) {
        commit(types.INITIAL_STATE)
    },

    // Register
    async register({ commit }, { username, password, fullname, mobile, lineID }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { username, password, fullname, mobile, lineID, cui, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.register(payload)
        if (response.status === 200) {
            commit(types.SUCCESS_AUTH, { data: response.data, status: response.status })
        } else {
            commit(types.FAIL_AUTH, { data: response.data, status: response.status })
        }
    }
}

export default actions