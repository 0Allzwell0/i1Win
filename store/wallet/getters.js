const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetRequestState: state => state.requestState,
    GetNetworkError: state => state.networkError,
    GetLimits: state => state.limits,
    GetWallets: state => state.wallets,
    GetBanksList: state => state.banksList,
    GetMainWallet: state => state.mainWallet,
    GetBalance: state => state.balance,
    GetBonus: state => state.bonus,
    GetResponseMsg: state => state.responseMsg,
    GetThirdPartyURL: state => state.thirdpartyURL
}

export default getters