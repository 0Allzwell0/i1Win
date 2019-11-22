const state = () => ({
    userData: {
        cui: null,
        username: null,
        fullname: null,
        birthday: null,
        mobile: null,
        email: null,
        gender: null,
        line_id: null,
        uid: null
    },
    errorMessage: {
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