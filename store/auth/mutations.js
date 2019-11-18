import * as type from './type'

const mutations = {
    // ================================================================ Initial Status
    [type.INITIAL_STATE](state) {
        state.isLogined = false
        state.userData = null
        state.requestState = false
        state.httpStatus = null
        state.loginError = {
            login: null,
            username: null,
            password: null,
            others: null
        }

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.isLogined = false
        state.userData = null
        state.requestState = true
        state.httpStatus = null
        state.loginErrorMsg = {
            login: null,
            username: null,
            password: null,
            others: null
        }

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Login Success
    [type.LOGIN_SUCCESS](state, { data, status }) {
        state.isLogined = true
        state.userData = data
        state.requestState = false
        state.httpStatus = status
        state.loginErrorMsg = {
            login: null,
            username: null,
            password: null,
            others: null
        }

        setLocalStorage('isLogined', 'true')
        setLocalStorage('userData', JSON.stringify(state.userData))
    },

    // ================================================================ Login Fail
    [type.LOGIN_FAIL](state, { data, status }) {
        state.isLogined = false
        state.userData = null
        state.requestState = false
        state.httpStatus = status
        if (status === 400) {
            if (data.login) {
                state.loginErrorMsg.login = data.login
            }
            if (data.username) {
                state.loginErrorMsg.username = data.username
            }
            if (data.password) {
                state.loginErrorMsg.password = data.password
            }
        } else {
            state.loginErrorMsg.others = data
        }

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Register Success
    [type.REGISTER_SUCCESS](state, { data, status }) {
        state.isLogined = true
        state.userData = data
        state.requestState = false
        state.httpStatus = status
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null
        }

        setLocalStorage('isLogined', 'true')
    },

    // ================================================================ Register Fail
    [type.REGISTER_FAIL](state, { data, status }) {
        state.isLogined = false
        state.userData = null
        state.requestState = false
        state.httpStatus = status
        if (status === 400) {
            if (data.username) {
                state.regErrorMsg.username = data.username
            }
            if (data.password) {
                state.regErrorMsg.password = data.password
            }
            if (data.password_confirmation) {
                state.regErrorMsg.confirm_psw = data.password_confirmation
            }
            if (data.fullname) {
                state.regErrorMsg.fullname = data.fullname
            }
            if (data.mobile) {
                state.regErrorMsg.mobile = data.mobile
            }
        } else {
            state.regErrorMsg.others = data
        }

        setLocalStorage('isLogined', 'false')
    },

    // ================================================================ Check Username Success
    [type.CHECK_USERNAME_SUCCESS](state, { data, status }) {
        state.isUsed = data.isRegistered
        state.httpStatus = status
    },

    // ================================================================ Check Username Fail
    [type.CHECK_USERNAME_FAIL](state, { data, status }) {
        state.isUsed = data.isRegistered
        state.httpStatus = status
    },

    // ================================================================ Check Mobile Success
    [type.CHECK_MOBILE_SUCCESS](state, { data, status }) {
        state.isUsed = data
        state.httpStatus = status
    },

    // ================================================================ Check Mobile Fail
    [type.CHECK_MOBILE_FAIL](state, { data, status }) {
        state.isUsed = data
        state.httpStatus = status
    },
}

// Set Local Storage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

export default mutations