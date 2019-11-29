const state = () => ({
    httpStatus: null,
    profileData: {
        birthday: null,
        email: null,
        gender: null,
        line_id: null,
    },
    profileErrorMsg: null,
    changePSWErrorMsg: {
        password: null,
        new_password: null,
        confirm_new_password: null,
        others: null
    },
    banners: null,
    announcements: null,
    jackpot: parseFloat(1830082162),
    promotions: null,
    articles: [{
        name: null,
        mobile: null
    }]
})

export default state