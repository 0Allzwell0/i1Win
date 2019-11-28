import axios from '~/plugins/axios'
import Language from '~/middleware/getLanguage'
import JWT from '~/middleware/jwt'
import { API_DOMAIN } from '~/environment'

class WalletService {
    // Get Wallets
    static async getWallets(payload) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/member/wallets',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
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
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/member/limits',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
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
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/member/deposit/banks',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
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
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: 'api/member/withdraw/banks',
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
            })
        } catch (error) {
            return error.response
        }

        return response
    }

    // Get Balance
    static async getBalance(payload, productCode) {
        let response = null
        let accessToken = JWT.sign(payload)

        try {
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `api/member/wallet/${productCode}`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
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
            response = await axios({
                method: 'GET',
                timeout: 5000,
                url: `api/member/bonus`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                params: payload
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
            response = await axios({
                method: 'POST',
                timeout: 5000,
                url: `api/member/deposit`,
                baseURL: API_DOMAIN,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': Language.getLanguage()
                },
                data: payload
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