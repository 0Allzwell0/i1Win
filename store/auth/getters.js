const getters = {
    GetLogined: state => state.isLogined,
    GetUserData: state => state.userData,
    GetIsUsed: state => state.isUsed,
    GetHttpStatus: state => state.httpStatus,
    GetLoginErrorMsg: state => state.loginErrorMsg,
    GetRegErrorMsg: state => state.regErrorMsg
}

export default getters