const state = () => ({
    gamesList: null,
    gameURL: null,
    downloadType: null,
    downloadPLT: {
        url: null,
        loginID: 'null'
    },
    downloadAG: {
        url: null,
        loginID: 'null'
    },
    downloadDT: {
        url: null,
        loginID: 'null'
    },
    downloadJOKER: {
        url: null,
        loginID: 'null'
    },
    download918KISS: {
        url: null,
        loginID: 'null'
    },
    /*pltData: {
        domain: '',
        params: {
            username: '',
            password: '',
            game: '',
            loginURL: '',
            gameURLH5: ''
        }
    },
    jokerData: {
        domain: '',
        params: {
            token: '',
            redirectURL: '',
            game: '',
            loginID: ''
        }
    },*/
    httpStatus: null,
})

export default state