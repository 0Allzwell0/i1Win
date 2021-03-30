import axios from '~/plugins/axios'
import LANGUAGE from '~/middleware/getLanguage'
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
                timeout: 15000,
                url: 'api/history/transaction',
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

    // Get Statement Data
    static async getStatementData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'api/history/statement',
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

    // Get Transfer Data
    static async getTransferData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 15000,
                url: 'api/history/transfer',
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

export default HistoryService