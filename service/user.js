import axios from '~/plugins/axios'
import { CREDENTIAL } from '~/environment'
import Language from '~/middleware/getLanguage'

class UserService {
    // Edit Profile
    static async editProfile(accessToken, lineID, email, birthday, gender) {
        let response = null
        try {
            response = await axios.post('api/v1/members/updateProfile', {
                lineID,
                email,
                birthday,
                gender
            }, {
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
    static async changePassword(accessToken, currentPassword, newPassword, confirmNewPassword) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/changePassword', {
                currentPassword,
                newPassword,
                confirmNewPassword
            }, {
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
    static async getBanners(bannerType) {
        let response = null
        try {
            response = await axios.post('/api/v1/banners', {
                bannerType
            }, {
                headers: {
                    'Authorization': `Basic ${CREDENTIAL}`,
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
        try {
            response = await axios.post('/api/v1/announcements', {
                headers: {
                    'Authorization': `Basic ${CREDENTIAL}`,
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
            response = await axios.post('/api/v1/jackpot', {
                headers: {
                    'Authorization': `Basic ${CREDENTIAL}`,
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
        try {
            response = await axios.post('/api/v1/promotions', {
                headers: {
                    'Authorization': `Basic ${CREDENTIAL}`,
                    'Accept-Language': Language.getLanguage()
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
            response = await axios.post('/api/v1/articles', {
                code
            }, {
                headers: {
                    'Authorization': `Basic ${CREDENTIAL}`,
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