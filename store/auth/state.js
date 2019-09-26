const state = () => ({
    isLogined: true,
    accessToken: null,
    userData: {
        username: 'Alexander',
        fullname: "Allzwell",
        birthday: "1990-09-16",
        email: "jxfrontend@gmail.com",
        mobile: "0800956956",
        gender: "Male"
    },
    httpStatus: null,
    failMessage: null
})

export default state