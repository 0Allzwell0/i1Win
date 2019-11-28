import * as type from './type'

const mutations = {
    // =========================================================== Eidt Profile
    // Request Edit Profile
    [type.REQUEST_EDIT_PROFILE](state) {
        state.requestState = true
        state.errorMessage = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.httpStatus = null
    },

    // Edit Profile Success
    [type.EDIT_PROFILE_SUCCESS](state, { status, line_id, email, birthday, gender }) {
        state.profileData.birthday = birthday
        state.profileData.email = email
        state.profileData.line_id = line_id
        state.profileData.gender = gender
        state.requestState = false
        state.errorMessage = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.httpStatus = status
    },

    // Edit Profile Fail
    [type.EDIT_PROFILE_FAIL](state, { data, status }) {
        state.requestState = false
        state.errorMessage = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: data
        }
        state.httpStatus = status
    },

    // =========================================================== Change Passowrd
    // Request Change Password
    [type.REQUEST_CHANGE_PASSWORD](state) {
        state.requestState = true
        state.errorMessage = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.httpStatus = null
    },

    // Change Password Success
    [type.CHANGE_PASSWORD_SUCCESS](state, status) {
        state.requestState = false
        state.errorMessage = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.httpStatus = status
    },

    // Change Password Fail
    [type.CHANGE_PASSWORD_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        if (status === 422) {
            if (data.password) {
                state.errorMessage.password = data.password
            }
            if (data.new_password) {
                state.errorMessage.new_password = data.new_password
            }
            if (data.confirm_new_password) {
                state.errorMessage.confirm_new_password = data.confirm_new_password
            }
        } else {
            state.errorMessage.others = data
        }
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