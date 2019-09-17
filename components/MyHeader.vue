<template>
    <header class="header-wrapper">
        <!-- Menu -->
        <img class="header-menu-img" src="../static/images/menu.png" @click="showMenu()" />
        <!-- Logo -->
        <h1 class="header-logo-wrapper">
            <nuxt-link class="header-logo-container" :to="$i18n.path('')" title="Y3club Home">
                <img class="header-logo-img" src="../static/images/logo.png" alt="Y3club" />
            </nuxt-link>
        </h1>
        <!-- 尚未登入前顯示 -->
        <div class="header-button-wrapper" v-if="!isLogined">
            <nuxt-link class="header-button" :to="$i18n.path('login')">{{ $t('common.login') }}</nuxt-link>
            <nuxt-link class="header-button header-register" :to="$i18n.path('register')">{{ $t('common.register') }}</nuxt-link>
        </div>
        <!-- 已登入後顯示 -->
        <nuxt-link class="header-deposit" :to="$i18n.path('member/deposit')" v-if="isLogined">{{ $t('wallet.deposit') }}</nuxt-link>
    </header>
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
        // Show Menu
        showMenu() {
            $('.menu-background').css('display', 'block');
            setTimeout(() => {
                $('.menu-wrapper').addClass('show-menu');
            }, 100);
            $('html, body').addClass('freezePage');
        }
    }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    font-family: $font-family;
    font-size: 12px;
    width: 100%;
    background: $color-black;
    padding: 2px 0 9px 0;

    .header-menu-img {
        height: 25px;
        margin: 8px 0 0 15px;
    }
    .header-logo-wrapper {
        width: 90px;
        padding-right: 5px;
        margin-left: 11px;

        .header-logo-container {
            width: 100%;

            img {
                width: 100%;
            }
        }
    }
    .header-button-wrapper {
        position: absolute;
        right: 7px;
        top: 11px;
        font-size: 14px;

        .header-button {
            display: inline-block;
            width: 80px;
            color: $color-yellow;
            background: transparent;
            border: $border-style;
            text-align: center;
            padding: 5px 0;
            margin-right: 5px;
        }
        .header-register {
            color: $color-black;
            background: $color-yellow-linear;
            margin-right: 0;
        }
    }

    .header-deposit {
        position: absolute;
        right: 7px;
        top: 11px;
        width: 80px;
        font-size: 14px;
        color: $color-yellow;
        border: $border-style;
        text-align: center;
        padding: 5px 0;
    }
}
</style>
