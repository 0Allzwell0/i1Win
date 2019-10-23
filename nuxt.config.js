const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }
    ],
    script: [

    ],
    link: [{
      href: "/favicon.png",
      rel: "icon"
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/MyLoading.vue',

  /*
   ** Global CSS
   */
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/css/swiper.min.css',
    '@/assets/css/css_reset.css',
    '@/assets/css/main.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~plugins/bootstrap.js", ssr: false },
    { src: "~plugins/jquery.marquee.js", ssr: false },
    { src: "~plugins/swiper.min.js", ssr: false },
    { src: '~plugins/font-awesome.js', ssr: false },
    { src: '~plugins/i18n.js' },
    { src: "~plugins/datepicker.js", ssr: false },
    { src: "~plugins/timepicker.js", ssr: false }
  ],

  router: {
    // customize nuxt.js router (vue-router).
    middleware: 'i18n'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-fontawesome'
  ],

  fontawesome: {
    // icon 的標籤使用 <fa>，這邊不設定就會依照 plugin 裡的設定<font-awesome-icon>
    component: 'fa',
    imports: [
      // 引入 fas 所有的icon
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    styleResources: {
      scss: './assets/scss/default.scss'
    },
    vendor: [
      'jquery',
      'bootstrap',
      'vue-i18n',
      'axios'
    ],
    /*
     ** You can extend webpack config here
     */
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    extend(config, ctx) {
      /* Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      } */
    }
  }
}
