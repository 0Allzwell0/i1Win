import * as types from './type'
import AuthService from '~/service/auth'

const actions = {
    // Refresh Token
    async refreshToken({ commit }, accessToken) {
        const response = await AuthService.refreshToken(accessToken)
        if (response.status === 200) {
            commit(types.REFRESH_TOKEN_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.REFRESH_TOKEN_FAIL, response.status)
        }
    },


    // Login
    async login({ commit }, { username, password }) {
        commit(types.REQUEST_AUTH)
        const response = await AuthService.login(username, password)
        if (response.status === 200) {
            commit(types.SUCCESS_AUTH, { data: response.data, status: response.status })
        } else {
            commit(types.FAIL_AUTH, { data: response.data, status: response.status })
        }
    },

    // Logout
    async logout({ commit }) {
        commit(types.LOGOUT)
    },

    // Register
    async register({ commit }, { username, password, fullname, mobile }) {
        commit(types.REQUEST_AUTH)
        const response = await AuthService.register(username, password, fullname, mobile)
        if (response.status === 200) {
            commit(types.SUCCESS_AUTH, { data: response.data, status: response.status })
        } else {
            commit(types.FAIL_AUTH, { data: response.data, status: response.status })
        }
    }
}

export default actions