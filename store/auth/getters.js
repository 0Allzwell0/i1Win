const getters = {
    GetLogined: state => state.isLogined,
    GetUsername: state => state.username,
    GetMobile: state => state.mobile,
    GetLineID: state => state.line_id,
    GetFullname: state => state.fullname,
    GetBirthday: state => state.birthday,
    GetEmail: state => state.email,
    GetGender: state => state.gender
}

export default getters