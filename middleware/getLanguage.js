class Language {
    static getLanguage() {
        return localStorage.getItem('LANGUAGE') || 'en'
    }
}

export default Language