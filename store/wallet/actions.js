import * as types from './type'
import WalletService from '~/service/wallet'

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
}

// Get CUI (Base64_Encode([website_id, account_id]))
function getCUI() {
    return localStorage.getItem('CUI')
}

const actions = {
    // Get Wallet
    async getWallets({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getWallets(payload)
        if (response.status === 200) {
            commit(types.GET_WALLETS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_WALLETS_FAIL, response.status)
        }
    },

    // Get Limits
    async getLimits({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getLimits(payload)
        if (response.status === 200) {
            commit(types.GET_LIMITS_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_LIMITS_FAIL, response.status)
        }
    },

    // Get Deposit Banks
    async getDepositBanks({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getDepositBanks(payload)
        if (response.status === 200) {
            commit(types.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(types.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Withdrawal Banks
    async getWithdrawalBanks({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getWithdrawalBanks(payload)
        if (response.status === 200) {
            commit(types.GET_BANKS_LIST_SUCCESS, { date: response.data.bankAccounts, status: response.status })
        } else {
            commit(types.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Amount
    async getAmount({ commit }, code) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, code, exp }
        const response = await WalletService.getAmount(payload)
        if (response.status === 200) {
            commit(types.GET_AMOUNT_SUCCESS, response.data)
        } else {
            commit(types.GET_AMOUNT_FAIL, response.status)
        }
    },

    // Get Bonus
    async getBonus({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getBonus(payload)
        if (response.status === 200) {
            commit(types.GET_BONUS_SUCCESS, response.data)
        } else {
            commit(types.GET_BONUS_FAIL, response.status)
        }
    },

    // Deposit
    async deposit({ commit }, formData) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, formData, exp }
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
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, toBank, accountNumber, amount, exp }
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
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, from, amount, to, exp }
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