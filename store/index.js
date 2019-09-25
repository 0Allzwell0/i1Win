import {
    LOCALES,
    DEFAULT_LOCALE
} from '../environment.js'

export const state = () => ({
    locales: LOCALES,
    locale: DEFAULT_LOCALE, // 當前語系
    fallbackLocale: DEFAULT_LOCALE // 預設語系
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