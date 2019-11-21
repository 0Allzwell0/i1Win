import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class GameService {
    // Get Slot Games. Before Login
    static async getGamesBefore(payload, productCode) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `res/before/slots/${productCode}`,
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

    // Get Slot Games. After Login
    static async getGamesAfter(payload, productCode) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `res/slots/${productCode}`,
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

    // Get Game URL
    static async getGameURL(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/entrance',
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
}

export default GameService