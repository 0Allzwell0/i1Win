import * as types from './type'
import HistoryService from '~/service/history'

// Set Timestamp
function getExpTimestamp() {
    return Math.floor(Date.now() / 1000) + (60 * 1) // 1 min
}

// Get CUI (Base64_Encode([website_id, account_id]))
function getCUI() {
    return localStorage.getItem('CUI')
}

const actions = {
    // Get Tansaction Data
    async getTransactionData({ commit }, { fromDate, toDate }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, fromDate, toDate, exp }
        commit(types.REQUEST_TRANSACTION_DATA)
        const response = await HistoryService.getTransactionData(payload)
        if (response.status === 200) {
            commit(types.GET_TRANSACTION_DATA_SUCCESS, { data: response.data.history, status: response.status })
        } else {
            commit(types.GET_TRANSACTION_DATA_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Statement Data
    async getStatementData({ commit }, { fromDate, toDate }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, fromDate, toDate, exp }
        commit(types.REQUEST_STATEMENT_DATA)
        const response = await HistoryService.getStatementData(payload)
        if (response.status === 200) {
            commit(types.GET_STATEMENT_DATA_SUCCESS, { data: response.data.history, status: response.status })
        } else {
            commit(types.GET_STATEMENT_DATA_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Transfer Data
    async getTransferData({ commit }, { fromDate, toDate }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, fromDate, toDate, exp }
        commit(types.REQUEST_TRANSFER_DATA)
        const response = await HistoryService.getTransferData(payload)
        if (response.status === 200) {
            commit(types.GET_TRANSFER_DATA_SUCCESS, { data: response.data.history, status: response.status })
        } else {
            commit(types.GET_TRANSFER_DATA_FAIL, { date: response.data, status: response.status })
        }
    }
}

export default actions