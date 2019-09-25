class Language {
    static getLanguage() {
        return window.localStorage.getItem('LANGUAGE') || 'en-US'
    }
}

export default Language