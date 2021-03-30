const getters = {
    GetLogined: state => state.isLogined,
    GetUserData: state => state.userData,
    GetIsRegister: state => state.isRegister,
    GetIsExisted: state => state.isExisted,
    GetHttpStatus: state => state.httpStatus,
    GetLoginErrorMsg: state => state.loginErrorMsg,
    GetRegErrorMsg: state => state.regErrorMsg,
    GetNetworkError: state => state.networkError
}

export default getters