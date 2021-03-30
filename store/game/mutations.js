import * as type from './type'

const mutations = {
    // =========================================================== Get Games List
    // Get Games List Success
    [type.GET_GAMES_LIST_SUCCESS](state, { data, status }) {
        state.gamesList = data
        state.httpStatus = status
    },

    // Get Games List Fail
    [type.GET_GAMES_LIST_FAIL](state, status) {
        state.gamesList = null
        state.httpStatus = status
    },

    // =========================================================== Get Game URL
    // Get Game URL Success
    [type.GET_GAME_URL_SUCCESS](state, { data, status }) {
        state.gameURL = data.url
        state.httpStatus = status
        state.errorMsg = null
    },

    // Get Game URL Fail
    [type.GET_GAME_URL_FAIL](state, { data, status }) {
        state.gameURL = null
        state.httpStatus = status
        if (status === 401) {
            state.errorMsg = data.msg
        } else if (status === 422) {
            state.errorMsg = data.errors.system[0]
        } else {
            state.errorMsg = data
        }
    },

    // ================================================================ Network Error
    [type.NETWORK_ERROR](state) {
        state.gameURL = null
        state.httpStatus = null
        state.errorMsg = null
    }
}

function setLoacalStorage(key, value) {
    localStorage.setItem(key, value)
}

export default mutations