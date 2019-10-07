const getters = {
    GetLogined: state => state.isLogined,
    GetAccessToken: state => state.accessToken,
    GetUserData: state => state.userData,
    GetHttpStatus: state => state.httpStatus,
    GetFailMessage: state => state.failMessage
}

export default getters