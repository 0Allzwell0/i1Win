import * as type from './type'
import jwt from 'vue-jwt-decode'

const mutations = {
    // Initial
    [type.INITIAL_STATE](state) {
        state.requestState = false
        state.httpStatus = null

        initialData(state)
    },

    // Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.requestState = true
        state.httpStatus = null

        initialData(state)
    },

    // Login Success && Register Success
    [type.SUCCESS_AUTH](state, { data, status }) {
        state.requestState = false
        state.isLogined = true
        state.accessToken = data.token
        if (data.token) {
            let json = jwt.decode(token)

            state.userData = {
                username: json.username,
                password: json.paswword,
                mobile: json.mobile,
                line_id: json.line_id,
                fullname: json.fullname,
                birthday: json.birthday,
                email: json.email,
                gender: json.gender
            }
        }
        state.httpStatus = status

        setLocalStorage('isLogined', 'true')
        setLocalStorage('accessToken', state.accessToken)
        setLocalStorage('userData', state.userData)
    },

    // Login Fail && Logout && Register Fail
    [type.FAIL_AUTH](state, status) {
        state.requestState = false
        state.httpStatus = status

        initialData(state)
    },

    // Refresh Token
    [type.REFRESH_TOKEN_SUCCESS](state, { data, status }) {
        state.accessToken = data.token
        state.httpStatus = status

        setLocalStorage('accessToken', state.accessToken)
    },

    // Refresh Token
    [type.REFRESH_TOKEN_FAIL](state, status) {
        state.accessToken = window.localStorage.getItem('accessToken')
        state.httpStatus = status
    },

    // Request Change Password
    [type.REQUEST_CHANGE_PASSWORD](state, status) {
        state.requestState = false
        state.failMessage = null
        state.httpStatus = status
    },

    // Change Password Success
    [type.CHANGE_PASSWORD_SUCCESS](state, status) {
        state.requestState = false
        state.failMessage = null
        state.httpStatus = status
    },

    // Change Password Fail
    [type.CHANGE_PASSWORD_FAIL](state, { data, status }) {
        state.requestState = false
        state.failMessage = data.msg
        state.httpStatus = status
    }
}

// Initaial
function initialData(state) {
    state.isLogined = false
    state.accessToken = null
    state.userData = {
        username: null,
        password: null,
        mobile: null,
        line_id: null,
        fullname: null,
        birthday: null,
        email: null,
        gender: null
    }
}

// Set Local Storage
function setLocalStorage(item, data) {
    if (typeof (data) === 'object') {
        window.localStorage.setItem(item, JSON.stringify(data))
    } else {
        window.localStorage.setItem(item, data)
    }
}

export default mutations