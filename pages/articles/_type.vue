<template>
    <main class="article-wrapper">
        <!-- Title -->
        <h1 class="article-title">{{ articleHTML.name }}</h1>

        <!-- Content -->
        <div class="article-html">{{ articleHTML.mobile }}</div>
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
        let articleCode = null;
        let routeParams = this.$route.params.type;

        switch (routeParams) {
            case 'about-us': {
                articleCode = 'ABOUTUS_EN';
                break;
            }
            case 'how-to-join': {
                articleCode = 'HOWTOJOIN';
                break;
            }
            case 'support': {
                articleCode = 'SUPPORT';
                break;
            }
            case 'responsible-gaming': {
                articleCode = 'RESPONSIBLE';
                break;
            }
            case 'terms-of-use': {
                articleCode = 'TERM';
                break;
            }
            case 'privacy-policy': {
                articleCode = 'PRIVACY';
                break;
            }
        }

        this.$store.dispatch('user/getArticles', articleCode);
    }
};
</script>
<style lang="scss" scoped>
.article-wrapper {
    min-height: calc(100vh - 100px);
    background-image: $background_img;
    background-size: cover;
    overflow: auto;
    padding: 0 10px 0 20px;
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
        margin: 35px 10px 90px 10px;

        h4,
        h3 {
            font-size: 20px;
            text-align: center;
            margin: 20px 0 10px 0;
        }

        p {
            text-indent: 30px;
        }
    }
}
</style>