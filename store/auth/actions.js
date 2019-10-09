import * as types from './type'
import AuthService from '~/service/auth'
import JWT from '~/middleware/jwt'

const actions = {
    // Login
    async login({ commit }, { username, password }) {
        const payload = { username, password }
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
        const payload = { username, password, fullname, mobile, lineID }
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