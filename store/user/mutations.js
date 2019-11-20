import * as type from './type'

const mutations = {
    // =========================================================== Eidt Profile
    // Request Edit Profile
    [type.REQUEST_EDIT_PROFILE](state) {
        state.profileToken = null
        state.requestState = true
        state.failMessage = null
        state.httpStatus = null
    },

    // Edit Profile Success
    [type.EDIT_PROFILE_SUCCESS](state, { data, status }) {
        state.profileToken = data.token
        state.requestState = false
        state.failMessage = null
        state.httpStatus = status
    },

    // Edit Profile Fail
    [type.EDIT_PROFILE_FAIL](state, { data, status }) {
        state.profileToken = null
        state.requestState = false
        state.failMessage = data.msg
        state.httpStatus = status
    },

    // =========================================================== Change Passowrd
    // Request Change Password
    [type.REQUEST_CHANGE_PASSWORD](state) {
        state.requestState = true
        state.failMessage = null
        state.httpStatus = null
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
    },

    // =========================================================== Get Banners
    // Get Banners Success
    [type.GET_BANNERS_SUCCESS](state, { data, status }) {
        state.banners = data
        state.httpStatus = status
    },

    // Get Banners Fail
    [type.GET_BANNERS_FAIL](state, status) {
        state.banners = null
        state.httpStatus = status
    },

    // =========================================================== Get Jackpot
    // Get Jackpot Success
    [type.GET_JACKPOT_SUCCESS](state, { data, status }) {
        state.jackpot = data
        state.httpStatus = status
    },

    // Get Jackopt Fail
    [type.GET_JACKPOT_FAIL](state, status) {
        state.jackpot = null
        state.httpStatus = status
    },

    // =========================================================== Get Announcement
    // Get Announcement Success
    [type.GET_ANNOUNCEMENT_SUCCESS](state, { data, status }) {
        state.announcements = data
        state.httpStatus = status
    },

    // Get Announcement Fail
    [type.GET_ANNOUNCEMENT_FAIL](state, status) {
        state.announcements = null
        state.httpStatus = status
    },

    // =========================================================== Get Promotions
    // Get Promotions Success
    [type.GET_PROMOTIONS_SUCCESS](state, { data, status }) {
        state.promotions = data
        state.httpStatus = status
    },

    // Get Promotions Fail
    [type.GET_PROMOTIONS_FAIL](state, status) {
        state.promotions = null
        state.httpStatus = status
    },

    // =========================================================== Get Article
    // Get Article Success
    [type.GET_ARTICLE_SUCCESS](state, { data, status }) {
        state.articles = data[0]
        state.httpStatus = status
    },

    // Get Article Fail
    [type.GET_ARTICLE_FAIL](state, status) {
        state.articles = null
        state.httpStatus = status
    }
}

export default mutations