import * as types from './type'
import AuthService from '~/service/auth'

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
    // Login
    async login({ commit }, { username, password }) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        let payload = { username, password, cui, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.login(payload)
        if (response.status) {
            if (response.status === 200) {
                commit(types.LOGIN_SUCCESS, { data: response.data, status: response.status })
            } else {
                commit(types.LOGIN_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    },

    // Logout
    async logout({ commit }) {
        commit(types.INITIAL_STATE)
    },

    // Register
    async register({ commit }, { username, password, password_confirmation, fullname, mobile, line_id }) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { username, password, fullname, password_confirmation, mobile, line_id, cui, exp }
        commit(types.REQUEST_AUTH)
        const response = await AuthService.register(payload)
        if (response.status) {
            if (response.status === 200) {
                commit(types.REGISTER_SUCCESS, { data: response.data, status: response.status })
            } else {
                commit(types.REGISTER_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    },

    // Check Username
    async checkUsername({ commit }, username) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { cui, exp }
        const response = await AuthService.checkUsername(payload, username)
        if (response.status === 200) {
            commit(types.CHECK_USERNAME_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.CHECK_USERNAME_FAIL, response.status)
        }
    },

    // Check Mobile
    async checkMobile({ commit }, mobile) {
        let exp = getExpTimestamp()
        let cui = getCUI()
        const payload = { cui, exp }
        const response = await AuthService.checkMobile(payload, mobile)
        if (response.status === 200) {
            commit(types.CHECK_MOBILE_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.CHECK_MOBILE_FAIL, response.status)
        }
    }
}

export default actions