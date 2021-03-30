import * as type from './type'

const mutations = {
    // =========================================================== Network Error
    [type.NETWORK_ERROR](state) {
        state.requestState = null
        state.httpStatus = null
        state.networkError = true
    },

    // =========================================================== Eidt Profile
    // Request Edit Profile
    [type.REQUEST_EDIT_PROFILE](state) {
        state.requestState = true
        state.httpStatus = null
        state.profileData = {
            birthday: null,
            email: null,
            gender: null,
            line_id: null
        }
        state.profileErrorMsg = null
        state.networkError = false
    },

    // Edit Profile Success
    [type.EDIT_PROFILE_SUCCESS](state, { status, fullname, line_id, email, birthday, gender }) {
        state.requestState = false
        state.httpStatus = status
        state.profileData = {
            fullname: fullname,
            line_id: line_id,
            email: email,
            birthday: birthday,
            gender: gender
        }
        state.profileErrorMsg = null
        state.networkError = false

        let userData = JSON.parse(localStorage.getItem('userData'))
        userData.fullname = fullname
        userData.birthday = birthday
        userData.email = email
        userData.line_id = line_id
        userData.gender = gender

        setLocalStorage('userData', JSON.stringify(userData))
    },

    // Edit Profile Fail
    [type.EDIT_PROFILE_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.profileData = {
            line_id: null,
            email: null,
            birthday: null,
            gender: null
        }
        state.networkError = false

        if (status === 401 || status === 403 || status === 423) {
            state.profileErrorMsg = data.errors[0].msg
        } else {
            state.profileErrorMsg = data
        }
    },

    // =========================================================== Change Passowrd
    // Request Change Password
    [type.REQUEST_CHANGE_PASSWORD](state) {
        state.requestState = true
        state.httpStatus = null
        state.changePSWErrorMsg = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.networkError = false
    },

    // Change Password Success
    [type.CHANGE_PASSWORD_SUCCESS](state, status) {
        state.requestState = false
        state.httpStatus = status
        state.changePSWErrorMsg = {
            password: null,
            new_password: null,
            confirm_new_password: null,
            others: null
        }
        state.networkError = false
    },

    // Change Password Fail
    [type.CHANGE_PASSWORD_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
        if (status === 422) {
            for (let error of data.errors) {
                if (error.password) {
                    state.changePSWErrorMsg.password = error.password[0]
                }
                if (error.new_password) {
                    state.changePSWErrorMsg.new_password = error.new_password[0]
                }
                if (error.confirm_new_password) {
                    state.changePSWErrorMsg.confirm_new_password = error.confirm_new_password[0]
                }
            }
        } else if (status === 401 || status === 403 || status === 500) {
            state.changePSWErrorMsg.others = data.errors[0].msg
        } else {
            state.changePSWErrorMsg.others = data
        }
    },

    // =========================================================== Get Downalod Data
    // Get Download Data Success
    [type.GET_DOWNLOAD_SUCCESS](state, { data, status }) {
        state.downloadData = data
        state.status = status
    },

    // Get Download Data Fail
    [type.GET_DOWNLOAD_FAIL](state, status) {
        state.downloadData = null
        state.status = status
    },

    // =========================================================== Get PopUp Data
    // Get PopUp Success
    [type.GET_POPUP_SUCCESS](state, { data, status }) {
        state.popupData = data[0].image_mobile
        state.httpStatus = status
    },

    // Get PopUp Fail
    [type.GET_POPUP_FAIL](state, status) {
        state.popupData = null
        state.httpStatus = status
    },

    // =========================================================== Get Banners
    // Get Banners Success
    [type.GET_BANNERS_SUCCESS](state, { data, status }) {
        state.banners = data.data[0].banners
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
        state.promotionsList = data
        state.httpStatus = status
    },

    // Get Promotions Fail
    [type.GET_PROMOTIONS_FAIL](state, status) {
        state.promotionsList = null
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

// Set Local Storage
function setLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

// Get Local Storage
function getLocalStorage(key) {
    return localStorage.getItem(key)
}

export default mutations