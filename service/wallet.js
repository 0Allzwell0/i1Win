import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'

class WalletService {
    // Get Wallets
    static async getWallets(accessToken, isReload) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getWallets', { isReload }, {
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
    static async getLimits(accessToken) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getLimits', {}, {
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
    static async getDepositBanks(accessToken) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getDepositBankAccounts', {}, {
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
    static async getWithdrawalBanks(accessToken) {
        let response = null
        try {
            response = await axios.post('/api/v1/members/getWithdrawalBankAccounts', {}, {
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
    static async getAmount(accessToken, code) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/getWallets/${code}`, {}, {
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
    static async getBonus(accessToken) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/getBonus`, {}, {
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
    static async deposit(accessToken, formData) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/getBonus`, { formData }, {
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
    static async withdrawal(accessToken, toBank, accountNumber, amount) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/getBonus`, {
                toBank,
                accountNumber,
                amount
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

    // Transfer
    static async transfer(accessToken, from, amount, to) {
        let response = null
        try {
            response = await axios.post(`/api/v1/members/getBonus`, {
                from,
                amount,
                to
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

export default WalletService