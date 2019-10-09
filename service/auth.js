import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'

class AuthService {

    static async login(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/members/login', payload, {
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

    static async register(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/members/register', payload, {
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

export default AuthService