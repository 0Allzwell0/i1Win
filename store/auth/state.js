const state = () => ({
    isLogined: false,
    userData: {
        cui: null,
        username: null,
        fullname: null,
        birthday: null,
        mobile: null,
        email: null,
        gender: null,
        line_id: null,
        uid: null
    },
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
    networkError: null,
    isRegister: null,
    isExisted: null
})

export default state