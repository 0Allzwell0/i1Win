class Language {
    static getLanguage() {
        return window.localStorage.getItem('LANGUAGE') || 'en'
    }
}

export default Language