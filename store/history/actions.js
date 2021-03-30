import * as types from './type'
import HistoryService from '~/service/history'

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
    // Get Tansaction Data
    async getTransactionData({ commit }, { from, to }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, from, to, exp }
        commit(types.REQUEST_TRANSACTION_DATA)
        const response = await HistoryService.getTransactionData(payload)
        if (response.status === 200) {
            commit(types.GET_TRANSACTION_DATA_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_TRANSACTION_DATA_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Statement Data
    async getStatementData({ commit }, { from, to }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, from, to, exp }
        commit(types.REQUEST_STATEMENT_DATA)
        const response = await HistoryService.getStatementData(payload)
        if (response.status === 200) {
            commit(types.GET_STATEMENT_DATA_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_STATEMENT_DATA_FAIL, { data: response.data, status: response.status })
        }
    },

    // Get Transfer Data
    async getTransferData({ commit }, { from, to }) {
        const exp = getExpTimestamp()
        const cui = getCUI()
        const payload = { cui, from, to, exp }
        commit(types.REQUEST_TRANSFER_DATA)
        const response = await HistoryService.getTransferData(payload)
        if (response.status === 200) {
            commit(types.GET_TRANSFER_DATA_SUCCESS, { data: response.data, status: response.status })
        } else {
            commit(types.GET_TRANSFER_DATA_FAIL, { date: response.data, status: response.status })
        }
    }
}

export default actions