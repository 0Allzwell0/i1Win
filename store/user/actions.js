import { Base64 } from 'js-base64';
import { WEBSITE_ID, ACCOUNT_ID } from '~/environment.js'
import * as types from './type'
import UserService from '~/service/user'

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
}

// Get CUI (Base64_Encode([website_id, account_id]))
function getCUI() {
    let json = JSON.stringify({
        website_id: WEBSITE_ID
    })

    let cui = null
    if (localStorage.getItem('userData')) {
        let userData = localStorage.getItem('userData')
        cui = JSON.parse(userData).cui
    }

    return cui || Base64.encode(json)
}

const actions = {
    // Edit Profile
    async editProfile({ commit }, { line_id, email, birthday, gender }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, line_id, email, birthday, gender, exp }
        commit(types.REQUEST_EDIT_PROFILE)
        const response = await UserService.editProfile(payload)
        if (response.status === 204) {
            commit(types.EDIT_PROFILE_SUCCESS, {
                status: response.status,
                line_id,
                email,
                birthday,
                gender
            })
        } else {
            commit(types.EDIT_PROFILE_FAIL, { data: response.data, status: response.status })
        }
    },

    // Change Password
    async changePassword({ commit }, { password, new_password, new_password_confirmation }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, password, new_password, new_password_confirmation, exp }
        commit(types.REQUEST_CHANGE_PASSWORD)
        const response = await UserService.changePassword(payload)
        if (response.status === 204) {
            commit(types.CHANGE_PASSWORD_SUCCESS, response.status)
        } else {
            commit(types.CHANGE_PASSWORD_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Download Data
    async getDownload({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await UserService.getDownload(payload)
        if (response.status === 200) {
            commit(types.GET_DOWNLOAD_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_DOWNLOAD_FAIL, response.status)
        }
    },

    // Get Banners
    async getBanners({ commit }) {
        const response = await UserService.getBanners()
        if (response.status === 200) {
            commit(types.GET_BANNERS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_BANNERS_FAIL, response.status)
        }
    },

    // Get Announcement
    async getAnnouncement({ commit }) {
        const response = await UserService.getAnnouncement()
        if (response.status === 200) {
            commit(types.GET_ANNOUNCEMENT_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_ANNOUNCEMENT_FAIL, response.status)
        }
    },

    // Get Jackpot
    async getJackpot({ commit }) {
        const response = await UserService.getJackpot()
        if (response.status === 200) {
            commit(types.GET_JACKPOT_SUCCESS, { data: response.data, status: response })
        } else {
            commit(types.GET_JACKPOT_FAIL, response.status)
        }
    },

    // Get Promotions
    async getPromotions({ commit }) {
        const response = await UserService.getPromotions()
        if (response.status === 200) {
            commit(types.GET_PROMOTIONS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_PROMOTIONS_FAIL, response.status)
        }
    },

    // Get Article
    async getArticles({ commit }, code) {
        const response = await UserService.getArticles(code)
        if (response.status === 200) {
            commit(types.GET_ARTICLE_SUCCESS, { data: response.data, status: status })
        } else {
            commit(types.GET_ARTICLE_FAIL, response.status)
        }
    }
}

export default actions