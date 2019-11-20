const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetRequestState: state => state.requestState,
    GetLimits: state => state.limits,
    GetWallets: state => state.wallets,
    GetBanksList: state => state.banksList,
    GetBalance: state => state.balance,
    GetBonus: state => state.bonus,
    GetShowPromptMsg: state => state.showPromptMsg
}

export default getters