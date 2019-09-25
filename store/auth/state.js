const state = () => ({
    isLogined: false,
    accessToken: null,
    userData: {
        username: null,
        password: null,
        mobile: null,
        line_id: null,
        fullname: null,
        birthday: null,
        email: null,
        gender: null
    },
    /*userData: {
    	username: 'alexander',
    	password: null,
    	mobile: '0800956956',
    	line_id: 'Y3club',
    	fullname: 'Allzwell',
    	birthday: '1990-09-16',
    	email: 'jiexun@gamil.com',
    	gender: 'male'
    },*/
    httpStatus: null,
    failMessage: null
})

export default state