import axios from 'axios'
import LANGUAGE from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN, WEBSITE_ID } from '~/environment'

class UserService {
    // Edit Profile
    static async editProfile(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'PATCH',
                timeout: 5000,
                url: 'api/member/profile',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': LANGUAGE.getLanguage()
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Change Password
    static async changePassword(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'PATCH',
                timeout: 5000,
                url: 'api/member/password',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': LANGUAGE.getLanguage()
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Download Data
    static async getDownload(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/member/downloads/info',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': LANGUAGE.getLanguage()
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get PopUp Data
    static async getPopUp() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'res/popup',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'applicatioin/json',
                    'Accept-language': LANGUAGE.getLanguage()
                },
                params: {
                    is_mobile: 1,
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Banners
    static async getBanners() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'res/banners',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    is_mobile: 1,
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Announcement
    static async getAnnouncement() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'res/announcements',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Jackpot
    static async getJackpot() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'res/jackpot',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Promotions
    static async getPromotions() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'res/promotions',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    is_mobile: 1,
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }

    // Get Article
    static async getArticles(code) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: `res/article/${code}`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
        }

        return response
    }
}

export default UserService