import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'

class GameService {
    // Get Slot Games
    static async getGamesList(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get(`/api/v1/slots/${payload.productCode}`, payload, {
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

    // Get Game URL
    static async getGameURL(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/play', payload, {
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

export default GameService