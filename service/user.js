import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'

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
    static async getBanners(payload) {
        let response = null

        try {
            response = await axios.get('/api/v1/banners', payload, {
                headers: {
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Announcement
    static async getAnnouncement(payload) {
        let response = null

        try {
            response = await axios.get('/api/v1/announcements', payload, {
                headers: {
                    'Accept-Language': Language.getLanguage()
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
            response = await axios.get('/api/v1/jackpot', payload, {
                headers: {
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Promotions
    static async getPromotions(payload) {
        let response = null

        try {
            response = await axios.get('/api/v1/promotions', payload, {
                headers: {
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Article
    static async getArticles(payload) {
        let response = null

        try {
            response = await axios.get('/api/v1/articles', payload, {
                headers: {
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }
}

export default UserService