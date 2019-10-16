import * as types from './type'
import AuthService from '~/service/auth'
import { WEBSITE_ID, ACCOUNT_ID } from '~/environment'
import { Base64 } from 'js-base64';

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
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
        const cui = Base64.encode(JSON.stringify({ wesite_id: WEBSITE_ID, account_id: ACCOUNT_ID }))
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