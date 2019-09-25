import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
    let messages = {}
    let localesLength = store.state.locales.length
    let currentLocale = null

    for (let i = 0; i < localesLength; i++) {
        currentLocale = store.state.locales[i]
        messages[currentLocale] = require('~/locales/' + currentLocale + '.json')
    }

    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: store.state.fallbackLocale,
        messages
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`;
        }
        return `/${app.i18n.locale}/${link}`;
    }
}