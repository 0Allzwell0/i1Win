import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'

class HistoryService {
    // Get Transaction Data
    static async getTransactionData(accessToken, fromDate, toDate) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getTransactionHistory', {
                fromDate,
                toDate
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

    // Get Statement Data
    static async getStatementData(accessToken, fromDate, toDate) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getStatementHistory', {
                fromDate,
                toDate
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

    // Get Transfer Data
    static async getTransferData(accessToken, fromDate, toDate) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getTransferHistory', {
                fromDate,
                toDate
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

export default HistoryService