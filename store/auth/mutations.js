import * as type from './type'

const mutations = {
    // ================================================================ Initial Status
    [type.INITIAL_STATE](state) {
        state.isLogined = false
        state.userData = {
            cui: null,
            username: null,
            fullname: null,
            birthday: null,
            mobile: null,
            email: null,
            gender: null,
            line_id: null,
            uid: null
        }
        state.requestState = false
        state.httpStatus = null
        state.networkError = false
        state.loginError = {
            login: null,
            username: null,
            password: null,
            others: null
        }
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null,
            others: null
        }

        setLocalStorage('isLogined', 'false')
    },

    // ================================================================ Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.isLogined = false
        state.userData = {
            cui: null,
            username: null,
            fullname: null,
            birthday: null,
            mobile: null,
            email: null,
            gender: null,
            line_id: null,
            uid: null
        }
        state.requestState = true
        state.httpStatus = null
        state.networkError = false
        state.loginErrorMsg = {
            login: null,
            username: null,
            password: null,
            others: null
        }
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null,
            others: null
        }

        setLocalStorage('isLogined', 'false')
    },

    // ================================================================ Get Login State
    [type.GET_LOGIN_STATE](state) {
        state.isLogined = (getLocalStorage('isLogined') === 'true') ? true : false
        state.userData = getLocalStorage('userData')
        state.requestState = false
        state.httpStatus = null
        state.networkError = false
        state.loginError = {
            login: null,
            username: null,
            password: null,
            others: null
        }
    },

    // ================================================================ Login Success
    [type.LOGIN_SUCCESS](state, { data, status }) {
        state.isLogined = true
        state.userData = {
            cui: data.cui,
            username: data.username,
            fullname: data.fullname,
            birthday: data.birthday,
            mobile: data.mobile,
            email: data.email,
            gender: data.gender,
            line_id: data.line_id,
            uid: data.uid
        }
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
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
        state.userData = {
            cui: null,
            username: null,
            fullname: null,
            birthday: null,
            mobile: null,
            email: null,
            gender: null,
            line_id: null,
            uid: null
        }
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
        if (status === 422) {
            for (let error of data.errors) {
                if (error.login) {
                    state.loginErrorMsg.login = error.login
                }
                if (error.username) {
                    state.loginErrorMsg.username = error.username[0]
                }
                if (error.password) {
                    state.loginErrorMsg.password = error.password[0]
                }
            }
        } else if (status === 401) {
            state.loginErrorMsg.others = data.msg
        } else {
            state.loginErrorMsg.others = data
        }

        setLocalStorage('isLogined', 'false')
    },

    // ================================================================ Register Success
    [type.REGISTER_SUCCESS](state, { data, status }) {
        state.isLogined = true
        state.userData = {
            cui: data.cui,
            username: data.username,
            fullname: data.fullname,
            birthday: data.birthday,
            mobile: data.mobile,
            email: data.email,
            gender: data.gender,
            line_id: data.line_id,
            uid: data.uid
        }
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null,
            others: null
        }

        setLocalStorage('isLogined', 'true')
        setLocalStorage('userData', JSON.stringify(state.userData))
    },

    // ================================================================ Register Fail
    [type.REGISTER_FAIL](state, { data, status }) {
        state.isLogined = false
        state.userData = {
            cui: null,
            username: null,
            fullname: null,
            birthday: null,
            mobile: null,
            email: null,
            gender: null,
            line_id: null,
            uid: null
        }
        state.requestState = false
        state.httpStatus = status
        state.networkError = false

        if (status === 422) {
            for (let error of data.errors) {
                if (error.username) {
                    state.regErrorMsg.username = error.username[0]
                }
                if (error.password) {
                    state.regErrorMsg.password = error.password[0]
                }
                if (error.password_confirmation) {
                    state.regErrorMsg.confirm_psw = error.password_confirmation[0]
                }
                if (error.fullname) {
                    state.regErrorMsg.fullname = error.fullname[0]
                }
                if (error.mobile) {
                    state.regErrorMsg.mobile = error.mobile[0]
                }
            }
        } else if (status === 401) {
            state.regErrorMsg.others = data.msg
        } else {
            state.regErrorMsg.others = data
        }

        setLocalStorage('isLogined', 'false')
    },

    // ================================================================ Check Username Success
    [type.CHECK_USERNAME_SUCCESS](state, { data, status }) {
        state.isRegister = data.isRegistered
        state.httpStatus = status
        state.networkError = false
    },

    // ================================================================ Check Username Fail
    [type.CHECK_USERNAME_FAIL](state, status) {
        state.isRegister = null
        state.httpStatus = status
        state.networkError = false
    },

    // ================================================================ Check Mobile Success
    [type.CHECK_MOBILE_SUCCESS](state, { data, status }) {
        state.isExisted = data.isExisted
        state.httpStatus = status
        state.networkError = false
    },

    // ================================================================ Check Mobile Fail
    [type.CHECK_MOBILE_FAIL](state, status) {
        state.isExisted = null
        state.httpStatus = status
        state.networkError = false
    },

    // ================================================================ Network Error
    [type.NETWORK_ERROR](state) {
        state.isLogined = false
        state.userData = {
            cui: null,
            username: null,
            fullname: null,
            birthday: null,
            mobile: null,
            email: null,
            gender: null,
            line_id: null,
            uid: null
        }
        state.requestState = false
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null,
            others: null
        }
        state.networkError = true
        state.httpStatus = null

        setLocalStorage('isLogined', 'false')
    },
}

// Set Local Storage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

// Get Local Storage
function getLocalStorage(key) {
    return localStorage.getItem(key)
}

export default mutations