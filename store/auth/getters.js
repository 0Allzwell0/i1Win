const getters = {
    GetLogined: state => state.isLogined,
    GetAccessToken: state => state.accessToken,
    GetUserData: state => state.userData
}

export default getters