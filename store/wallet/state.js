const state = () => ({
    networkError: false,
    httpStatus: null,
    requestState: false,
    responseMsg: false,
    thirdpartyURL: null,
    wallets: null,
    banksList: null,
    limits: null,
    mainWallet: 0.00,
    balance: 0.00,
    bonus: null
})

export default state