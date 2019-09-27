import * as type from './type'
import WalletService from '~/service/wallet'

const actions = {
    // Get Wallet
    async getWallets({ commit }, { accessToken, isReload }) {
        const response = await WalletService.getWallets(accessToken, isReload)
        if (response.status === 200) {
            commit(type.GET_WALLETS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.GET_WALLETS_FAIL, response.status)
        }
    },

    // Get Limits
    async getLimits({ commit }, accessToken) {
        const response = await WalletService.getLimits(accessToken)
        if (response.status === 200) {
            commit(type.GET_LIMITS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(type.GET_LIMITS_FAIL, response.status)
        }
    },

    // Get Deposit Banks
    async getDepositBanks({ commit }, accessToken) {
        const response = await WalletService.getDepositBanks(accessToken)
        if (response.status === 200) {
            commit(type.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(type.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Withdrawal Banks
    async getWithdrawalBanks({ commit }, accessToken) {
        const response = await WalletService.getWithdrawalBanks(accessToken)
        if (response.status === 200) {
            commit(type.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(type.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Amount
    async getAmount({ commit }, { accessToken, code }) {
        const response = await WalletService.getAmount(accessToken, code)
        if (response.status === 200) {
            commit(type.GET_AMOUNT_SUCCESS, response.data)
        } else {
            commit(type.GET_AMOUNT_FAIL, response.status)
        }
    },

    // Get Bonus
    async getBonus({ commit }, accessToken) {
        const response = await WalletService.getBonus(accessToken)
        if (response.status === 200) {
            commit(type.GET_BONUS_SUCCESS, response.data)
        } else {
            commit(type.GET_BONUS_FAIL, response.status)
        }
    },

    // Deposit
    async deposit({ commit }, { accessToken, formData }) {
        commit(type.REQUEST_DWT)
        const response = await WalletService.deposit(accessToken, formData)
        if (response.status === 200) {
            commit(type.DWT_SUCCESS, response.status)
        } else {
            commit(type.DWT_FAIL, { data: response.data, status: response.status })
        }
    },

    // Withdrawal
    async withdrawal({ commit }, { accessToken, toBank, accountNumber, amount }) {
        commit(type.REQUEST_DWT)
        const response = await WalletService.withdrawal(accessToken, toBank, accountNumber, amount)
        if (response.status === 200) {
            commit(type.DWT_SUCCESS, response.status)
        } else {
            commit(type.DWT_FAIL, { data: response.data, status: response.status })
        }
    },

    // Transfer
    async transfer({ commit }, { accessToken, from, amount, to }) {
        commit(type.REQUEST_DWT)
        const response = await WalletService.transfer(accessToken, from, amount, to)
        if (response.status === 200) {
            commit(type.DWT_SUCCESS, response.status)
        } else {
            commit(type.DWT_FAIL, { data: response.data, status: response.status })
        }
    }
}

export default actions