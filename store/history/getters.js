const getters = {
    GetTransactionData: state => state.transactionData,
    GetStatementData: state => state.statementData,
    GetTransferData: state => state.transferData,
    GetHttpStatus: state => state.httpStatus,
    GetRequestState: state => state.requestState,
    GetFailMessage: state => state.failMessage
}

export default getters