import * as type from './type'
import jwt from 'vue-jwt-decode'

const mutations = {
    // Initial Status
    [type.INITIAL_STATE](state) {
        state.isLogined = false
        state.accessToken = null
        state.requestState = false
        state.httpStatus = null
    },

    // Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.isLogined = false
        state.accessToken = null
        state.requestState = true
        state.httpStatus = null
    },

    // Login Success && Register Success
    [type.SUCCESS_AUTH](state, { data, status }) {
        state.isLogined = true
        state.accessToken = data.token
        state.userData = jwt.decode(state.accessToken)
        state.requestState = false
        state.httpStatus = status

        setLocalStorage('isLogined', 'true')
        setLocalStorage('accessToken', state.accessToken)
        setLocalStorage('userData', state.userData)
    },

    // Login Fail && Logout && Register Fail
    [type.FAIL_AUTH](state, { data, status }) {
        state.isLogined = false
        state.accessToken = null
        state.requestState = false
        state.httpStatus = status
    },

    // Refresh Token
    [type.REFRESH_TOKEN_SUCCESS](state, { data, status }) {
        state.accessToken = data.token
        state.httpStatus = status

        setLocalStorage('accessToken', state.accessToken)
    },

    // Refresh Token
    [type.REFRESH_TOKEN_FAIL](state, status) {
        state.accessToken = localStorage.getItem('accessToken')
        state.httpStatus = status
    }
}

// Set Local Storage
function setLocalStorage(item, data) {
    localStorage.setItem(item, data)
}

export default mutations