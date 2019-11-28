import * as type from './type'

const mutations = {
    // ================================================================ Transaction
    // Request Transaction Data
    [type.REQUEST_TRANSACTION_DATA](state) {
        state.transactionData = null
        state.requestState = true
        state.httpStatus = null
        state.failMessage = null
    },

    // Get Transaction Data Success
    [type.GET_TRANSACTION_DATA_SUCCESS](state, { data, status }) {
        state.transactionData = data
        state.requestState = false
        state.httpStatus = status
        state.failMessage = null
    },

    // Get Transaction Data Fail
    [type.GET_TRANSACTION_DATA_FAIL](state, { data, status }) {
        state.transactionData = null
        state.requestState = false
        state.httpStatus = status
        state.failMessage = data
    },

    // ================================================================ Statement
    // Request Statement Data
    [type.REQUEST_STATEMENT_DATA](state) {
        state.statementData = null
        state.requestState = true
        state.httpStatus = null
        state.failMessage = null
    },

    // Get Statment Data Success
    [type.GET_STATEMENT_DATA_SUCCESS](state, { data, status }) {
        state.statementData = data
        state.requestState = false
        state.httpStatus = status
        state.failMessage = null
    },

    // Get Statement Data Fail
    [type.GET_STATEMENT_DATA_FAIL](state, { data, status }) {
        state.statementData = null
        state.requestState = false
        state.httpStatus = status
        state.failMessage = data
    },

    // ================================================================ Transfer
    // Requset Transfer Data
    [type.REQUEST_TRANSFER_DATA](state) {
        state.transferData = null
        state.requestState = true
        state.httpStatus = null
        state.failMessage = null
    },

    // Get Transfer Data Success
    [type.GET_TRANSFER_DATA_SUCCESS](state, { data, status }) {
        state.transferData = data
        state.requestState = false
        state.httpStatus = status
        state.failMessage = null
    },

    // Get Transfer Data Fail
    [type.GET_TRANSFER_DATA_FAIL](state, { data, status }) {
        state.transferData = null
        state.requestState = false
        state.httpStatus = status
        state.failMessage = data
    }
}

export default mutations