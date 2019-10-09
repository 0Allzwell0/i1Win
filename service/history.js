import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'

class HistoryService {
    // Get Transaction Data
    static async getTransactionData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/members/getTransactionHistory', payload, {
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

    // Get Statement Data
    static async getStatementData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/members/getStatementHistory', payload, {
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

    // Get Transfer Data
    static async getTransferData(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post('/api/v1/members/getTransferHistory', payload, {
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

export default HistoryService