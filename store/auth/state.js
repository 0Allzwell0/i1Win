const state = () => ({
    isLogined: false,
    accessToken: null,
    userData: {
        username: 'Alexander',
        fullname: "Allzwell",
        birthday: "1990-09-16",
        email: "jxfrontend@gmail.com",
        lineID: 'jiexun@line_id',
        mobile: "0800956956",
        gender: "1"
    },
    httpStatus: null,
    failMessage: null
})

export default state