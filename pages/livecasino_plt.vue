<template>
    <main class="livecasino-plt-wrapper">
        <!-- Logo -->
        <img class="livecasino-plt-logo-img" src="/images/wallet_plt.png" />

        <!-- Games -->
        <ul class="livecasino-plt-container">
            <li class="livecasino-plt-item">
                <img class="livecasino-plt-item-img" src="/images/plt_live_7_seat_baccarat.png" />
                <span class="livecasino-plt-item-name">Live 7 Seat Baccarat</span>
                <button class="livecasino-plt-item-btn" @click="openGame('7bal')">{{ $t('common.play_now') }}</button>
            </li>
            <li class="livecasino-plt-item">
                <img class="livecasino-plt-item-img" src="/images/plt_baccarat_live.png" />
                <span class="livecasino-plt-item-name">Baccarat Live</span>
                <button class="livecasino-plt-item-btn" @click="openGame('bal')">{{ $t('common.play_now') }}</button>
            </li>
            <li class="livecasino-plt-item">
                <img class="livecasino-plt-item-img" src="/images/plt_live_french_roulette.png" />
                <span class="livecasino-plt-item-name">Live French Roulette</span>
                <button class="livecasino-plt-item-btn" @click="openGame('rofl')">{{ $t('common.play_now') }}</button>
            </li>
            <li class="livecasino-plt-item">
                <img class="livecasino-plt-item-img" src="/images/plt_roulette_live.png" />
                <span class="livecasino-plt-item-name">Roulette Live</span>
                <button class="livecasino-plt-item-btn" @click="openGame('rol')">{{ $t('common.play_now') }}</button>
            </li>
        </ul>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        }),
        ...mapGetters('game', {
            gameURL: 'GetGameURL'
        })
    },
    methods: {
        // Open Live Casino Playtech Games
        openGame(productCode) {
            if (this.isLogined) {
                this.$store.dispatch('game/getGameURL', {
                    category: 'Livecasino',
                    productCode,
                    is_mobile: 1
                }).then(() => {
                    window.open(this.gameURL);
                });
            } else {
                this.$router.push(this.$i18n.path('login'));
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .livecasino-plt-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 53px);
        font-family: $font-family;
        background: $background_img;
        background-size: cover;
        padding-bottom: 70px;

        .livecasino-plt-logo-img {
            width: 70%;
            margin: 4% -25% 5% 0;
        }

        .livecasino-plt-container {
            display: inline-block;
            width: 100%;
            height: 100%;

            .livecasino-plt-item {
                display: inline-block;
                width: calc((100% - 45px) / 2);
                text-align: center;
                margin: 10px;

                .livecasino-plt-item-img {
                    width: 100%;
                }

                .livecasino-plt-item-name {
                    width: 100%;
                    font-size: 13px;
                    font-weight: bold;
                    padding: 7px 0 7px 0;
                }

                .livecasino-plt-item-btn {
                    width: 80%;
                    min-height: 35px;
                    font-size: 16px;
                    font-weight: bold;
                    border: $border-style;
                    background: $color-yellow-linear-unpress;
                    border-radius: 5px;
                    margin: 5px 0 8px 0;

                    &:active {
                        background: $color-yellow-linear;
                    }
                }
            }
        }
    }
</style>