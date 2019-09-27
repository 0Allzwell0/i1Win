import * as type from './type'
import UserService from '~/service/user'

const actions = {
    // Edit Profile
    async editProfile({ commit }, { accessToken, birthday, email, gender }) {
        commit(type.REQUEST_EDIT_PROFILE)
        const response = await UserService.changePassword(accessToken, birthday, email, gender)
        if (response.status === 200) {
            commit(type.EDIT_PROFILE_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.EDIT_PROFILE_FAIL, { data: response.data, status: response.status })
        }
    },

    // Change Password
    async changePassword({ commit }, { accessToken, currentPassword, newPassword }) {
        commit(type.REQUEST_CHANGE_PASSWORD)
        const response = await UserService.changePassword(accessToken, currentPassword, newPassword)
        if (response.status === 200) {
            commit(type.CHANGE_PASSWORD_SUCCESS, response.status)
        } else {
            commit(type.CHANGE_PASSWORD_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Banners
    async getBanners({ commit }, bannerType) {
        const response = await UserService.getBanners(bannerType)
        if (response.status === 200) {
            commit(type.GET_BANNERS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.GET_BANNERS_FAIL, response.status)
        }
    },

    // Get Announcement
    async getAnnouncement({ commit }) {
        const response = await UserService.getAnnouncement()
        if (response.status === 200) {
            commit(type.GET_ANNOUNCEMENT_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.GET_ANNOUNCEMENT_FAIL, response.status)
        }
    },

    // Get Jackpot
    async getJackpot({ commit }) {
        const response = await UserService.getJackpot()
        if (response.status === 200) {
            commit(type.GET_JACKPOT_SUCCESS, { data: response.data, status: response })
        } else {
            commit(type.GET_JACKPOT_FAIL, response.status)
        }
    },

    // Get Promotions
    async getPromotions({ commit }) {
        const response = await UserService.getPromotions()
        if (response.status === 200) {
            commit(type.GET_PROMOTIONS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.GET_PROMOTIONS_FAIL, response.status)
        }
    },

    // Get Article
    async getArticles({ commit }, code) {
        const response = await UserService.getArticles(code)
        if (response.status === 200) {
            commit(type.GET_ARTICLE_SUCCESS, { data: response.data, code: code })
        } else {
            commit(type.GET_ARTICLE_FAIL, response.status)
        }
    }
}

export default actions