export const state = () => ({
    locales: ['en-US', 'th-TH'],
    locale: 'en-US'
})

export const getters = {
    GetLanguage: state => state.locale
}

export const mutations = {
    LANGUAGE(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    }
}

export const actions = {

}