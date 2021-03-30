const getters = {
    GetHttpStatus: state => state.httpStatus,
    GetGamesList: state => state.gamesList,
    GetGameURL: state => state.gameURL,
    GetErrorMsg: state => state.errorMsg,
    GetNetworkError: state => state.networkError
}

export default getters