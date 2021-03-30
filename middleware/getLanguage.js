class LANGUAGE {
    static getLanguage() {
        let language = localStorage.getItem('LANGUAGE') || 'th-TH';
        if (language === 'en-US') {
            return 'en'
        } else if (language === 'th-TH') {
            return 'th'
        }
    }
}

export default LANGUAGE