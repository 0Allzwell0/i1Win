import * as types from './type'
import UserService from '~/service/user'

const actions = {
    // Edit Profile
    async editProfile({ commit }, { lineID, email, birthday, gender }) {
        const payload = { lineID, email, birthday, gender }
        commit(types.REQUEST_EDIT_PROFILE)
        const response = await UserService.editProfile(payload)
        if (response.status === 200) {
            commit(types.EDIT_PROFILE_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.EDIT_PROFILE_FAIL, { data: response.data, status: response.status })
        }
    },

    // Change Password
    async changePassword({ commit }, { currentPassword, newPassword, confirmNewPassword }) {
        const payload = { currentPassword, newPassword, confirmNewPassword }
        commit(types.REQUEST_CHANGE_PASSWORD)
        const response = await UserService.changePassword(payload)
        if (response.status === 200) {
            commit(types.CHANGE_PASSWORD_SUCCESS, response.status)
        } else {
            commit(types.CHANGE_PASSWORD_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Banners
    async getBanners({ commit }, type) {
        const payload = { type }
        const response = await UserService.getBanners(payload)
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
        const payload = { code }
        const response = await UserService.getArticles(payload)

        if (response.status === 200) {
            commit(types.GET_ARTICLE_SUCCESS, { data: response.data, status: status })
        } else {
            commit(types.GET_ARTICLE_FAIL, response.status)
        }
    }
}

export default actions