import axios from 'axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class UserService {
    // Edit Profile
    static async editProfile(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('api/v1/members/updateProfile', payload, {
                headers: {
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
            response = await axios.post('/api/v1/members/changePassword', payload, {
                headers: {
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
    static async getBanners(websiteID) {
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
                    website_id: websiteID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Announcement
    static async getAnnouncement(websiteID) {
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
                    website_id: websiteID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Jackpot
    static async getJackpot(websiteID) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 1000,
                url: 'res/announcements',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    website_id: websiteID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Promotions
    static async getPromotions(code, websiteID) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 1000,
                url: 'res/announcements',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    code: code,
                    website_id: websiteID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Article
    static async getArticles(code, isMobile, websiteID) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 1000,
                url: 'res/articles',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': Language.getLanguage()
                },
                params: {
                    code: code,
                    is_mobile: isMobile,
                    website_id: websiteID
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }
}

export default UserService