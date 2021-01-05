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
        if (status === 422) {
            if (data.errors.login) {
                state.loginErrorMsg.login = data.errors.login
            }
            if (data.errors.username) {
                state.loginErrorMsg.username = data.errors.username[0]
            }
            if (data.errors.password) {
                state.loginErrorMsg.password = data.errors.password[0]
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
        state.regErrorMsg = {
            username: null,
            password: null,
            confirm_psw: null,
            fullname: null,
            mobile: null
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
        if (status === 422) {
            if (data.errors.username) {
                state.regErrorMsg.username = data.errors.username[0]
            }
            if (data.errors.password) {
                state.regErrorMsg.password = data.errors.password[0]
            }
            if (data.errors.password_confirmation) {
                state.regErrorMsg.confirm_psw = data.errors.password_confirmation[0]
            }
            if (data.errors.fullname) {
                state.regErrorMsg.fullname = data.errors.fullname[0]
            }
            if (data.errors.mobile) {
                state.regErrorMsg.mobile = data.errors.mobile[0]
            }
        } else {
            state.regErrorMsg.others = data.errors
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

// Get Local Storage
function getLocalStorage(key) {
    return localStorage.getItem(key)
}

export default mutations