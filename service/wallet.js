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
    static async getLimits(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/members/getLimits', payload, {
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
    static async getDepositBanks(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/members/getDepositBankAccounts', payload, {
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
    static async getWithdrawalBanks(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get('/api/v1/members/getWithdrawalBankAccounts', payload, {
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
    static async getAmount(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get(`/api/v1/members/getWallets/${payload.code}`, payload, {
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
    static async getBonus(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios.get(`/api/v1/members/getBonus`, payload, {
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