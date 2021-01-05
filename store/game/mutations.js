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

    // ================================================================ Get "Playtech DT" Game Data (Slot、Live Casino)
    [type.GET_PLT_DT_DATA](state, { json, status }) {
        /*state.pltData.domain = json.gameUrl
        state.pltData.params.username = json.data.username
        state.pltData.params.password = json.data.password
        state.pltData.params.game = json.data.game
        state.pltData.params.loginURL = json.data.loginURL
        state.pltData.params.gameURL = json.data.gameURLH5*/
        state.httpStatus = status

        setLoacalStorage('PLT_DT_GameURL', json.gameUrl)
        setLoacalStorage('PLT_DT_Username', json.data.username)
        setLoacalStorage('PLT_DT_Password', json.data.password)
        setLoacalStorage('PLT_DT_Game', json.data.game)
        setLoacalStorage('PLT_DT_LoginURL', json.data.loginURL)
        setLoacalStorage('PLT_DT_GameURLH5', json.data.gameURLH5)
    },

    // ================================================================ Get Joker Game Data
    [type.GET_JOKER_DATA](state, { json, status }) {
        /*state.jokerData.domain = json.gameURL
        state.jokerData.params.token = json.data.token
        state.jokerData.params.redirectURL = json.data.redirectURL
        tate.jokerData.params.game = json.data.game
        tate.jokerData.params.loginID = json.data.loginID*/
        state.httpStatus = status

        setLoacalStorage('JOKER_GameURL', json.gameUrl)
        setLoacalStorage('JOKER_Token', json.data.token)
        setLoacalStorage('JOKER_RedirectURL', json.data.redirectURL)
        setLoacalStorage('JOKER_Game', json.data.game)
        setLoacalStorage('JOKER_LoginID', json.data.loginID)
    }
}

function setLoacalStorage(key, value) {
    localStorage.setItem(key, value)
}

export default mutations