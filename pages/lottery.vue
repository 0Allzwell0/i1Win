<template>
    <main class="lottery-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <ul class="lottery-container">
            <li class="lottery-item-wrapper">
                <div class="lottery-item-container">
                    <span class="lottery-item-name">{{ $t('lottery.thailottery') }}</span>
                    <span class="lottery-item-msg">{{ $t('lottery.thailottery_msg') }}</span>
                    <button class="lottery-play-now-btn" type="button" @click="openGame('thailottery')">{{ $t('common.play_now') }}</button>
                </div>
                <img class="lottery-img" src="/images/lottery/thailottery.png" />
            </li>
            <li class="lottery-item-wrapper">
                <img class="lottery-img" src="/images/lottery/diamond.png" />
                <div class="lottery-item-container">
                    <span class="lottery-item-name">{{ $t('lottery.diamond') }}</span>
                    <span class="lottery-item-msg">{{ $t('lottery.diamond_msg') }}</span>
                    <button class="lottery-play-now-btn" type="button" @click="openGame('diamond')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li class="lottery-item-wrapper">
                <div class="lottery-item-container">
                    <span class="lottery-item-name">{{ $t('lottery.ruby') }}</span>
                    <span class="lottery-item-msg">{{ $t('lottery.ruby_msg') }}</span>
                    <button class="lottery-play-now-btn" type="button" @click="openGame('ruby')">{{ $t('common.play_now') }}</button>
                </div>
                <img class="lottery-img" src="/images/lottery/ruby.png" />
            </li>
            <li class="lottery-item-wrapper">
                <img class="lottery-img" src="/images/lottery/sapphire.png" />
                <div class="lottery-item-container">
                    <span class="lottery-item-name">{{ $t('lottery.sapphire') }}</span>
                    <span class="lottery-item-msg">{{ $t('lottery.sapphire_msg') }}</span>
                    <button class="lottery-play-now-btn" type="button" @click="openGame('sapphire')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
        </ul>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyCarousel from '~/components/MyCarousel';
import MyAnnouncement from '~/components/MyAnnouncement';
import MyGameTab from '~/components/MyGameTab';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        }),
        ...mapGetters('game', {
            gameURL: 'GetGameURL'
        })
    },
    components: {
        MyCarousel,
        MyAnnouncement,
        MyGameTab
    },
    mounted() {
        // Set Game Tab CSS
        $('.tab-lottery').addClass('active');
    },
    methods: {
        // Open Lottery Games
        openGame(productCode) {
            if (this.isLogined) {
                this.$store.dispatch('game/getGameURL', {
                    category: 'Lottery',
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
    .lottery-wrapper {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: $font-family;

        .lottery-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 62vh;
            background: $background_img;
            background-size: cover;
            padding-bottom: 70px;

            .lottery-item-wrapper {
                display: flex;
                width: 100%;
                min-height: 165px;

                .lottery-img {
                    width: 57%;
                    align-self: center;
                }

                .lottery-item-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 2% 2% 2% 4%;

                    .lottery-item-name {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .lottery-item-msg {
                        color: #575757;
                        height: 100%;
                    }

                    .lottery-play-now-btn {
                        width: 95px;
                        min-height: 35px;
                        font-weight: bold;
                        border: $border-style;
                        border-radius: 5px;
                        background: $color-yellow-linear-unpress;
                        margin-top: 10px;

                        &:active {
                            background: $color-yellow-linear;
                        }
                    }
                }

                &:nth-child(odd) {
                    background: rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
</style>