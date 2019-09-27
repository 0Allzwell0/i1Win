import * as type from './type'

const mutations = {
    // ================================================================ Get Wallets
    // Get Wallets Success
    [type.GET_WALLETS_SUCCESS](state, { data, status }) {
        state.wallets = data
        state.httpStatus = status
    },

    // Get Wallets Fail
    [type.GET_WALLETS_FAIL](state, status) {
        state.wallets = null
        state.httpStatus = status
    },

    // ================================================================ Get Limits
    // Get Limits Success
    [type.GET_LIMITS_SUCCESS](state, { data, status }) {
        state.limits = data
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

    // ================================================================ Get Amount
    // Get Amount Success
    [type.GET_AMOUNT_SUCCESS](state, { data, status }) {
        state.amount = data.amount.toFixed(2)
        state.httpStatus = null
    },

    // Get Amount Fail
    [type.GET_AMOUNT_FAIL](state, status) {
        state.amount = null
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
        state.showPromptMsg = false
        state.httpStatus = null
        state.failMessage = null
    },

    // Despoit、Withdrawal、Transfer Success
    [type.DWT_SUCCESS](state, status) {
        state.requestState = false
        state.showPromptMsg = false
        state.httpStatus = status
        state.failMessage = null
    },

    // Deposit、Withdrawal、Transfer Fail
    [type.DWT_FAIL](state, { data, status }) {
        state.requestState = false
        state.showPromptMsg = true
        state.httpStatus = status
        state.failMessage = data.msg
    }
}

export default mutations