const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetRequestState: state => state.requestState,
    GetLimits: state => state.limits,
    GetWallets: state => state.wallets,
    GetBanksList: state => state.banksList,
    GetBalance: state => state.balance,
    GetBonus: state => state.bonus,
    GetResponseMsg: state => state.responseMsg
}

export default getters