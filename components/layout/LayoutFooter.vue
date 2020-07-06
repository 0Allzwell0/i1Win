<template>
    <footer :class="{'hidden': $route.name.indexOf('register') !== -1 || $route.name.indexOf('login') !== -1}">
        <!-- Home -->
        <div class="footer-btn-wrapper">
            <nuxt-link :to="$i18n.path('')" :class="{'active': $route.name === 'index' || $route.name === 'lang'}">
                <img src="/images/footer/home.png" alt />
                <span>{{ $t('footer.home') }}</span>
            </nuxt-link>
        </div>

        <!-- Promotions -->
        <div class="footer-btn-wrapper">
            <nuxt-link :to="$i18n.path('promotions')" :class="{'active': $route.name.indexOf('promotions') != -1}">
                <img src="/images/footer/promotion.png" alt />
                <span>{{ $t('footer.promotions') }}</span>
            </nuxt-link>
        </div>

        <!-- Wallet -->
        <div class="footer-btn-wrapper">
            <div
                @click="gotoTransfer()"
                :class="{'active': $route.name.indexOf('deposit') != -1 || $route.name.indexOf('withdrawal') != -1 ||
                        $route.name.indexOf('transfer') != -1 || $route.name.indexOf('history') != -1 }"
            >
                <img src="/images/footer/wallet.png" alt />
                <span>{{ $t('footer.wallet') }}</span>
            </div>
        </div>

        <!-- Line -->
        <div class="footer-btn-wrapper">
            <a href="https://line.me/R/ti/p/%40y3thai">
                <img class="line-img" src="/images/footer/line.svg" alt />
            </a>
        </div>

        <!-- Blank -->
        <div class="footer-btn-wrapper">
            <div></div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        })
    },
    methods: {
        // Got To Tansfer Page
        gotoTransfer() {
            if (this.isLogined) {
                this.$router.push(this.$i18n.path('member/transfer'));
            } else {
                this.$router.push(this.$i18n.path('login'));
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    footer {
        position: fixed;
        z-index: 10;
        bottom: 0;
        display: flex;
        width: 100%;
        font-family: $font-family;
        font-size: 12px;
        background: $color-black-linear;

        &.hidden {
            display: none;
        }

        .footer-btn-wrapper {
            flex: 1;

            > a,
            > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                color: $color-gray;

                &.active {
                    background: -webkit-linear-gradient(#000000, #343131);
                }

                > img {
                    width: 28px;
                    margin-top: 7px;
                }

                > span {
                    color: $color-yellow;
                    font-size: 14px;
                    padding: 6px 0 3px 0;
                }

                .line-img {
                    width: 35px;
                    margin: 10px 10px 0 0;
                }
            }
        }
    }
</style>
