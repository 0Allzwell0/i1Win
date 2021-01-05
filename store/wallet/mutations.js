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
        state.balance = 0.00
        state.httpStatus = status
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
    },

    // Despoit、Withdrawal、Transfer Success
    [type.DWT_SUCCESS](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        state.responseMsg = data
    },

    // Deposit、Withdrawal、Transfer Fail
    [type.DWT_FAIL](state, { data, status }) {
        state.requestState = false
        state.httpStatus = status
        if (status === 401) {
            state.responseMsg = data.msg
        } else if (status === 422) {
            state.responseMsg = data.errors
        } else {
            state.responseMsg = data
        }
    }
}

export default mutations