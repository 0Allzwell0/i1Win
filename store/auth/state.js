const state = () => ({
    isLogined: false,
    userData: null,
    requestState: null,
    httpStatus: null,
    loginErrorMsg: {
        login: null,
        username: null,
        password: null,
        others: null
    },
    regErrorMsg: {
        username: null,
        password: null,
        confirm_psw: null,
        fullname: null,
        mobile: null,
        others: null
    },
    isUsed: false
})

export default state