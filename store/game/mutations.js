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
        state.gameURL = data.gameUrl
        state.httpStatus = status
    },

    // Get Game URL Fail
    [type.GET_GAME_URL_FAIL](state, status) {
        state.gameURL = null
        state.httpStatus = status
    }
}

export default mutations