<template>
    <main class="article-wrapper">
        <!-- Title -->
        <h1 class="article-title">{{ articleHTML.name }}</h1>

        <!-- Content -->
        <div class="article-html" v-html="articleHTML.body" />
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', {
            articleHTML: 'GetArticles'
        })
    },
    mounted() {
        this.getHTML(this.$route.params.type);
    },
    beforeRouteUpdate(to, from, next) {
        this.getHTML(to.params.type);
        next();
    },
    methods: {
        // Get Article Content
        getHTML(articleName) {
            let articleCode = null;

            switch (articleName) {
                case 'about-us': {
                    articleCode = 'ABOUTUS_EN';
                    break;
                }
                case 'how-to-join': {
                    articleCode = 'HOWJOIN_EN';
                    break;
                }
                case 'support': {
                    articleCode = 'SUPPORT_EN';
                    break;
                }
                case 'responsible-gaming': {
                    articleCode = 'RESPONSIBLE_EN';
                    break;
                }
                case 'terms-of-use': {
                    articleCode = 'TERM_EN';
                    break;
                }
                case 'privacy-policy': {
                    articleCode = 'PRIVACY_EN';
                    break;
                }
            }

            this.$store.dispatch('user/getArticles', articleCode);
        }
    }
};
</script>
<style lang="scss">
.article-wrapper {
    min-height: calc(100vh - 100px);
    background-image: $background_img;
    background-size: cover;
    overflow: auto;

    .article-title {
        width: 100%;
        font-family: $font-family;
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        margin: 20px 0 0 0;
    }
    .article-html {
        font-family: $font-family;
        font-size: 16px;
        margin: 35px 20px 90px 20px;

        h4,
        h3 {
            font-weight: bold;
            font-size: 20px;
            text-align: center;
            margin: 20px 0 10px 0;
        }
        li {
            list-style-type: decimal;
            list-style-position: inside;
        }
        p {
            text-indent: 2em;
        }
    }
}
</style>