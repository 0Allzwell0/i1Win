import axios from '~/plugins/axios'
import { CREDENTIAL } from '~/environment'
import Language from '~/middleware/getLanguage'

class GameService {
    // Get Slot Games
    static async getGamesList(productCode, isSlot, isNew, isFeatured, isJackpot, isTable) {
        let response = null
        try {
            response = await axios.get(`/api/v1/slots/${productCode}`, {
                isSlot,
                isNew,
                isFeatured,
                isJackpot,
                isTable
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

    // Get Game URL
    static async getGameURL(accessToken, category, productCode, gameID) {
        let response = null
        try {
            response = await axios.get('/api/v1/play', {
                category,
                productCode,
                gameID,
                isMobile: 1
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
}

export default GameService