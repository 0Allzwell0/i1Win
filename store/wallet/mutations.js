import * as type from './type'

const mutations = {
    // ================================================================ Get Wallets
    // Get Wallets Success
    [type.GET_WALLETS_SUCCESS](state, { data, status }) {
        state.wallets = data.wallets
        state.httpStatus = status
    },

    // Get Wallets Fail
    [type.GET_WALLETS_FAIL](state, status) {
        state.wallets = null
        state.httpStatus = status
    },

    // ================================================================ Get Balance
    // Get Balance Success
    [type.GET_BALANCE_SUCCESS](state, { data, status }) {
        state.balance = data.amount
        state.httpStatus = status
    },

    // Get Amount Fail
    [type.GET_BALANCE_FAIL](state, status) {
        state.balance = '-'
        state.httpStatus = status
    },

    // ================================================================ Set Main Wallet Balance
    [type.SET_MAIN_WALLET_BALANCE](state, amount) {
        state.mainWallet = amount
    },

    // ================================================================ Get Limits
    // Get Limits Success
    [type.GET_LIMITS_SUCCESS](state, { data, status }) {
        if (data) {
            state.limits = data
        }
        state.httpStatus = status
    },

    // Get Limits Fail
    [type.GET_LIMITS_FAIL](state, status) {
        state.limits = null
        state.httpStatus = status
    },

    // ================================================================ Get Banks List
    // Get Banks List Success
    [type.GET_BANKS_LIST_SUCCESS](state, { data, status }) {
        state.banksList = data
        state.httpStatus = status
    },

    // Get Banks List Fail
    [type.GET_BANKS_LIST_FAIL](state, status) {
        state.banksList = null
        state.httpStatus = status
    },

    // ================================================================ Get Bonus
    // Get Bonus Success
    [type.GET_BONUS_SUCCESS](state, { data, status }) {
        state.bonus = data
        state.httpStatus = status
    },

    // Get Bonus Fail
    [type.GET_BONUS_FAIL](state, status) {
        state.bonus = null
        state.httpStatus = status
    },

    // ================================================================ Deposit、Withdrawal、Transfer
    // Request Deposit、Withdrawal、Transfer
    [type.REQUEST_DWT](state) {
        state.requestState = true
        state.httpStatus = null
        state.responseMsg = null
        state.networkError = false
    },

    // Despoit、Withdrawal、Transfer Success
    [type.DWT_SUCCESS](state, status) {
        state.requestState = false
        state.httpStatus = status
        state.responseMsg = null
        state.networkError = false
    },

    // Deposit Thirdparty Success
    [type.THIRDPARTY_PAYMENT_SUCCESS](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.responseMsg = null
        state.networkError = false
        state.thirdpartyURL = data
    },

    // Deposit Thirdparty Fail
    [type.THIRDPARTY_PAYMENT_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
        state.thirdpartyURL = null
        if (status === 422) {
            state.responseMsg = data.errors
        } else if (status === 401) {
            state.responseMsg = data.msg
        } else {
            state.responseMsg = data
        }
    },

    // Deposit、Withdrawal、Transfer Fail
    [type.DWT_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.networkError = false
        if (status === 422) {
            state.responseMsg = data.errors
        } else if (status === 401) {
            state.responseMsg = data.msg
        } else {
            state.responseMsg = data
        }
    },

    // ================================================================ Network Error
    [type.NETWORK_ERROR](state) {
        state.requestState = false
        state.httpStatus = null
        state.responseMsg = null
        state.networkError = true
    }
}

export default mutations