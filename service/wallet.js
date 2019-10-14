import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'

class WalletService {
    // Get Wallets
    static async getWallets(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/members/getWallets', payload, {
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

    // Get Limits
    static async getLimits() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/members/getLimits', {}, {
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

    // Get Deposit Banks
    static async getDepositBanks() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/members/getDepositBankAccounts', {}, {
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

    // Get Withdrawal Banks
    static async getWithdrawalBanks() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get('/api/v1/members/getWithdrawalBankAccounts', {}, {
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

    // Get Amount
    static async getAmount(code) {
        let response = null
        let accessToken = JWT.sign(code)

        try {
            response = await axios.get(`/api/v1/members/getWallets/${code}`, {}, {
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

    // Get Bonus
    static async getBonus() {
        let response = null
        let accessToken = JWT.sign(null)

        try {
            response = await axios.get(`/api/v1/members/getBonus`, {}, {
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

    // Deposit
    static async deposit(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post(`/api/v1/members/getBonus`, payload, {
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

    // Withdrawal
    static async withdrawal(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post(`/api/v1/members/getBonus`, payload, {
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

    // Transfer
    static async transfer(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.post(`/api/v1/members/getBonus`, payload, {
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

export default WalletService