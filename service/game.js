import axios from '~/plugins/axios'
import LANGUAGE from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class GameService {
    // Get Slot Games. Before Login
    static async getGamesBefore(productCode, type) {
        let response = null

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: `res/before/slots/${productCode}`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Accept-Language': LANGUAGE.getLanguage()
                },
                params: {
                    tab: type,
                    is_mobile: 1,
                    lang: LANGUAGE.getLanguage()
                }
            })
        } catch (error) {
            if (error.response) return error.response
            else return error
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
                timeout: 15000,
                url: `res/slots/${productCode}`,
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

    // Search Slots Games
    static async searchGames(payload, gameName) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: `/res/slots/name/${gameName}`,
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

    // Get Game URL
    static async getGameURL(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'api/entrance',
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
}

export default GameService