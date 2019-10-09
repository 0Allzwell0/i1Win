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
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/banners', payload, {
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

    // Get Announcement
    static async getAnnouncement() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/announcements', {}, {
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

    // Get Jackpot
    static async getJackpot() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/jackpot', {}, {
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

    // Get Promotions
    static async getPromotions() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/promotions', {}, {
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

    // Get Article
    static async getArticles(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/articles', payload, {
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
}

export default UserService