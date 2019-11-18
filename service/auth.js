import axios from 'axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class AuthService {

    static async login(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/login',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    static async register(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'POST',
                timeout: 5000,
                url: 'api/register',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                data: payload
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Check Username
    static async checkUsername(payload, username) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `api/check/username/${username}`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Check Mobile
    static async checkMobile(payload, mobile) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `api/check/mobile/:${mobile}`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
            })
        } catch (error) {
            return error.response
        }

        return response
    }
}

export default AuthService