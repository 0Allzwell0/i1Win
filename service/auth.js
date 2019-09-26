import axios from '~/plugins/axios'
import { CREDENTIAL } from '~/environment'
import Language from '~/middleware/getLanguage'

class AuthService {

    static async refreshToken(accessToken) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/refresh-token`, {
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

    static async login(username, password) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/login', {
                username,
                password
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

    static async register(username, password, fullname, mobile) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/register', {
                username,
                password,
                fullname,
                mobile
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

export { AuthService }