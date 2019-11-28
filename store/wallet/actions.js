import { Base64 } from 'js-base64';
import { WEBSITE_ID, ACCOUNT_ID } from '~/environment'
import * as types from './type'
import WalletService from '~/service/wallet'

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
}

// Get CUI (Base64_Encode([website_id, account_id]))
function getCUI() {
    let json = JSON.stringify({
        website_id: WEBSITE_ID
    })

    let cui = null
    if (localStorage.getItem('userData')) {
        let userData = localStorage.getItem('userData')
        cui = JSON.parse(userData).cui
    }

    return cui || Base64.encode(json)
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
        const payload = { exp, accountNumber, amount, time, reference, receipt, bonus, cui }
        commit(types.REQUEST_DWT)
        const response = await WalletService.deposit(payload)
        if (response.status === 200) {
            commit(types.DWT_SUCCESS, { data: response.data, status: response.status })
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