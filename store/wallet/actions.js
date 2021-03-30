import * as types from './type'
import WalletService from '~/service/wallet'

// Set Timestamp
function getExpTimestamp() {
    let exp = Math.floor(Date.now() / 1000)
    localStorage.setItem('EXP', exp)
    return Math.floor(exp) + 600 // 10 min
}

// Get CUI
function getCUI() {
    let cui = null
    if (localStorage.getItem('userData')) {
        let userData = localStorage.getItem('userData')
        cui = JSON.parse(userData).cui
    }

    return cui
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
            commit(types.GET_BANKS_LIST_SUCCESS, { data: response.data, status: response.status })
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
            commit(types.GET_BANKS_LIST_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_BANKS_LIST_FAIL, response.status)
        }
    },

    // Get Balance
    async getBalance({ commit }, productCode) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getBalance(payload, productCode)
        if (response.status === 200) {
            commit(types.GET_BALANCE_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_BALANCE_FAIL, response.status)
        }
    },

    // Get Bonus
    async getBonus({ commit }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, exp }
        const response = await WalletService.getBonus(payload)
        if (response.status === 200) {
            commit(types.GET_BONUS_SUCCESS, { data: response.data.bonus, status: response.status })
        } else {
            commit(types.GET_BONUS_FAIL, response.status)
        }
    },

    // Deposit
    async deposit({ commit }, { accountNumber, amount, time, reference, receipt, bonus }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { exp, accountNumber, amount, time, reference, bonus, cui }

        let formData = new FormData()
        formData.append('receipt', receipt);

        commit(types.REQUEST_DWT)
        const response = await WalletService.deposit(payload, formData)
        if (response.status) {
            if (response.status === 204 || response.status === 200) {
                commit(types.DWT_SUCCESS, response.status)
            } else {
                commit(types.DWT_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    },

    // Thirdparty Payment
    async thirdpartyPayment({ commit }, { method, amount, bonus }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { exp, amount, bonus, cui }

        commit(types.REQUEST_DWT)
        const response = await WalletService.thirdpartyPayment(payload, method)
        if (response.status) {
            if (response.status === 204 || response.status === 200) {
                commit(types.THIRDPARTY_PAYMENT_SUCCESS, { data: response.data, status: response.status })
            } else {
                commit(types.THIRDPARTY_PAYMENT_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    },

    // Withdrawal
    async withdrawal({ commit }, { toBank, accountNumber, amount }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, toBank, accountNumber, amount, exp }
        commit(types.REQUEST_DWT)
        const response = await WalletService.withdrawal(payload)
        if (response.status) {
            if (response.status === 204 || response.status === 200) {
                commit(types.DWT_SUCCESS, response.status)
            } else {
                commit(types.DWT_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    },

    // Transfer
    async transfer({ commit }, { from, amount, to }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, from, amount, to, exp }
        commit(types.REQUEST_DWT)
        const response = await WalletService.transfer(payload)
        if (response.status) {
            if (response.status === 204 || response.status === 200) {
                commit(types.DWT_SUCCESS, response.status)
            } else {
                commit(types.DWT_FAIL, { data: response.data, status: response.status })
            }
        } else {
            commit(types.NETWORK_ERROR)
        }
    }
}

export default actions