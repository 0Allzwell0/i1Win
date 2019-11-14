const getters = {
    GetLogined: state => state.isLogined,
    GetUserData: state => state.userData,
    GetIsUsed: state => state.isUsed,
    GetHttpStatus: state => state.httpStatus,
    GetFailMessage: state => state.failMessage
}

export default getters