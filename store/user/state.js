const state = () => ({
    networkError: null,
    httpStatus: null,
    profileData: {
        birthday: null,
        email: null,
        gender: null,
        line_id: null
    },
    profileErrorMsg: null,
    changePSWErrorMsg: {
        password: null,
        new_password: null,
        confirm_new_password: null,
        others: null
    },
    downloadData: null,
    popupData: null,
    banners: null,
    announcements: null,
    jackpot: parseFloat(1830082162),
    promotionsList: null,
    articles: [{
        name: null,
        mobile: null
    }]
})

export default state