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
        website_id: WEBSITE_ID
    })
    let cui = localStorage.getItem('CUI') || Base64.encode(json)
    return cui
}

const actions = {
    // Login
    async login({ commit }, { username, password }) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        let payload = { username, password, cui, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.login(payload)
        if (response.status === 200) {
            commit(types.LOGIN_SUCCESS, { data: response.data, status: response.status })
        } else if (response.status === 400) {
            commit(types.LOGIN_FAIL, { data: response.data, status: response.status })
        }
    },

    // Logout
    async logout({ commit }) {
        commit(types.INITIAL_STATE)
    },

    // Register
    async register({ commit }, { username, password, password_confirmation, fullname, mobile, lineID }) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { username, password, fullname, password_confirmation, mobile, lineID, cui, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.register(payload)
        if (response.status === 200) {
            commit(types.REGISTER_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.REGISTER_FAIL, { data: response.data, status: response.status })
        }
    },

    // Check Username
    async checkUsername({ commit }, username) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { cui, exp }
        const response = await AuthService.checkUsername(payload, username)
        if (response.status === 200) {
            commit(types.CHECK_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.CHECK_FAIL, { data: response.data, status: reponse.status })
        }
    },

    // Check Mobile
    async checkMobile({ commit }, mobile) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { cui, exp }
        const response = await AuthService.checkMobile(payload, mobile)
        if (response.status === 200) {
            commit(types.CHECK_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.CHECK_FAIL, { data: response.data, status: reponse.status })
        }
    }
}

export default actions