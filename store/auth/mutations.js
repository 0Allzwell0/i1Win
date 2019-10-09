import * as type from './type'

const mutations = {
    // ================================================================ Initial Status
    [type.INITIAL_STATE](state) {
        state.isLogined = false
        state.requestState = false
        state.httpStatus = null
        state.failMessage = null
    },

    // ================================================================ Request Login && Request Register
    [type.REQUEST_AUTH](state) {
        state.isLogined = false
        state.requestState = true
        state.httpStatus = null
        state.failMessage = null
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
        state.requestState = false
        state.httpStatus = status
        state.failMessage = data
    }
}

// Set Local Storage
function setLocalStorage(item, data) {
    localStorage.setItem(item, data)
}

export default mutations