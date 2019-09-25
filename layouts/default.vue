<template>
    <div class="body-wrapper">
        <Header />
        <Menu />
        <nuxt />
        <Footer />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Header from '~/components/MyHeader';
import Menu from '~/components/MyMenu';
import Footer from '~/components/MyFooter';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined',
            accessToken: 'GetAccessToken'
        })
    },
    components: {
        Header,
        Menu,
        Footer
    },
    mounted() {
        // Show Loading Animation
        this.$nextTick(() => {
            this.$nuxt.$loading.start();

            setTimeout(() => this.$nuxt.$loading.finish(), 500);
        });

        // If Is Logined, Set Data
        if (window.localStorage.getItem('isLogined') === 'true') {
            this.$store.commit('auth/SUCCESS_AUTH', {
                data: window.localStorage.getItem('accessToken'),
                status: 200
            });
        }
    }
};
</script>
<style lang="scss">
body {
    width: 100%;
    height: 100%;
}
.body-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
