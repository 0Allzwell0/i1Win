<template>
    <div class="body-wrapper" :check="checkStatus()">
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
            authStatus: 'GetHttpStatus'
        }),
        ...mapGetters('user', {
            userStatus: 'GetHttpStatus'
        }),
        ...mapGetters('game', {
            gameStatus: 'GetHttpStatus'
        }),
        ...mapGetters('wallet', {
            walletStatus: 'GetHttpStatus'
        }),
        ...mapGetters('history', {
            historyStatus: 'GetHttpStatus'
        })
    },
    components: {
        Header,
        Menu,
        Footer
    },
    mounted() {
        // Loading Animation
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => {
                this.$nuxt.$loading.finish();
            }, 1500);
        });

        if (localStorage.getItem('isLogined')) {
            this.$store.commit('auth/GET_LOGIN_STATE');
        }
    },
    methods: {
        // If Any Response Status Is "401", Logout And Go To Home Page
        checkStatus() {
            if (
                this.authStatus === 401 ||
                this.userStatus === 401 ||
                this.gameStatus === 401 ||
                this.walletStatus === 401 ||
                this.historyStatus === 401
            ) {
                this.$store.commit('auth/INITIAL_STATE');
                this.$router.push(this.$i18n.path(''));
            }
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
