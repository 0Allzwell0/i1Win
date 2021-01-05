class LANGUAGE {
    static getLanguage() {
        let language = localStorage.getItem('LANGUAGE') || 'en-US';
        if (language === 'en-US') {
            return 'en'
        } else if (language === 'th-TH') {
            return 'th'
        }
    }
}

export default LANGUAGE