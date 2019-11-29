import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class HistoryService {
    // Get Transaction Data
    static async getTransactionData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/history/transaction',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Statement Data
    static async getStatementData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/history/statement',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                }
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Transfer Data
    static async getTransferData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/history/transfer',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
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

export default HistoryService