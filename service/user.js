import axios from 'axios'
import Language from '~/middleware/getLanguage'
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
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
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
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Banners
    static async getBanners() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'res/banners',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Announcement
    static async getAnnouncement() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'res/announcements',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Jackpot
    static async getJackpot() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'res/jackpot',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Promotions
    static async getPromotions() {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'res/promotions',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    is_mobile: 1,
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Article
    static async getArticles(code) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `res/articles`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    is_mobile: 1,
                    website_id: WEBSITE_ID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }
}

export default UserService