import * as type from './type'

const mutations = {
    // ================================================================ Initial Status
    [type.INITIAL_STATE](state) {
        state.isLogined = false
        state.userData = null
        state.requestState = false
        state.httpStatus = null
        state.failMessage = null

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.isLogined = false
        state.userData = null
        state.requestState = true
        state.httpStatus = null
        state.failMessage = null

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Login Success && Register Success
    [type.SUCCESS_AUTH](state, { data, status }) {
        state.isLogined = true
        state.userData = data
        state.requestState = false
        state.httpStatus = status
        state.failMessage = null

        setLocalStorage('isLogined', 'true')
        setLocalStorage('userData', JSON.stringify(state.userData))
    },

    // ================================================================ Login Fail && Register Fail
    [type.FAIL_AUTH](state, { data, status }) {
        state.isLogined = false
        state.userData = null
        state.requestState = false
        state.httpStatus = status
        state.failMessage = data

        setLocalStorage('isLogined', 'false')
        setLocalStorage('userData', null)
    },

    // ================================================================ Check Success
    [type.CHECK_SUCCESS](state, { data, status }) {
        state.isUsed = data
        state.httpStatus = status
    },

    // ================================================================ Check Fail
    [type.CHECK_SUCCESS](state, { data, status }) {
        state.isUsed = data
        state.httpStatus = status
    },
}

// Set Local Storage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

export default mutations