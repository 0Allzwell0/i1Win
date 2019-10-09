import * as types from './type'
import WalletService from '~/service/wallet'

const actions = {
    // Get Wallet
    async getWallets({ commit }, isReload) {
        const payload = { isReload }
        const response = await WalletService.getWallets(payload)
        if (response.status === 200) {
            commit(types.GET_WALLETS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_WALLETS_FAIL, response.status)
        }
    },

    // Get Limits
    async getLimits({ commit }) {
        const response = await WalletService.getLimits()
        if (response.status === 200) {
            commit(types.GET_LIMITS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_LIMITS_FAIL, response.status)
        }
    },

    // Get Deposit Banks
    async getDepositBanks({ commit }) {
        const response = await WalletService.getDepositBanks()
        if (response.status === 200) {
            commit(types.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(types.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Withdrawal Banks
    async getWithdrawalBanks({ commit }) {
        const response = await WalletService.getWithdrawalBanks()
        if (response.status === 200) {
            commit(types.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(types.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Amount
    async getAmount({ commit }, code) {
        const response = await WalletService.getAmount(code)
        if (response.status === 200) {
            commit(types.GET_AMOUNT_SUCCESS, response.data)
        } else {
            commit(types.GET_AMOUNT_FAIL, response.status)
        }
    },

    // Get Bonus
    async getBonus({ commit }) {
        const response = await WalletService.getBonus()
        if (response.status === 200) {
            commit(types.GET_BONUS_SUCCESS, response.data)
        } else {
            commit(types.GET_BONUS_FAIL, response.status)
        }
    },

    // Deposit
    async deposit({ commit }, formData) {
        const payload = { formData }
        commit(types.REQUEST_DWT)
        const response = await WalletService.deposit(payload)
        if (response.status === 200) {
            commit(types.DWT_SUCCESS, response.status)
        } else {
            commit(types.DWT_FAIL, { data: response.data, status: response.status })
        }
    },

    // Withdrawal
    async withdrawal({ commit }, { toBank, accountNumber, amount }) {
        const payload = { toBank, accountNumber, amount }
        commit(types.REQUEST_DWT)
        const response = await WalletService.withdrawal(payload)
        if (response.status === 200) {
            commit(types.DWT_SUCCESS, response.status)
        } else {
            commit(types.DWT_FAIL, { data: response.data, status: response.status })
        }
    },

    // Transfer
    async transfer({ commit }, { from, amount, to }) {
        const payload = { from, amount, to }
        commit(types.REQUEST_DWT)
        const response = await WalletService.transfer(payload)
        if (response.status === 200) {
            commit(types.DWT_SUCCESS, response.status)
        } else {
            commit(types.DWT_FAIL, { data: response.data, status: response.status })
        }
    }
}

export default actions