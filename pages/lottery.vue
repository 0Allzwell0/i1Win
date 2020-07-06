<template>
    <main class="lottery-wrapper">
        <!-- Carousel -->
        <the-carousel></the-carousel>

        <!-- Announcement -->
        <the-announcement></the-announcement>

        <!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <the-game-nav-bar></the-game-nav-bar>

        <!-- Games -->
        <ul class="lottery-container">
            <li>
                <div class="item-wrapper">
                    <span>{{ $t('lottery.thailottery') }}</span>
                    <p>{{ $t('lottery.thailottery_msg') }}</p>
                    <button type="button" @click="openGame('thailottery')">{{ $t('common.play_now') }}</button>
                </div>
                <img src="/images/lottery/thailottery.png" :alt="$t('lottery.thailottery')" />
            </li>
            <li>
                <img src="/images/lottery/diamond.png" :alt="$t('lottery.diamond')" />
                <div class="item-wrapper">
                    <span>{{ $t('lottery.diamond') }}</span>
                    <p>{{ $t('lottery.diamond_msg') }}</p>
                    <button type="button" @click="openGame('diamond')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li>
                <div class="item-wrapper">
                    <span>{{ $t('lottery.ruby') }}</span>
                    <p>{{ $t('lottery.ruby_msg') }}</p>
                    <button type="button" @click="openGame('ruby')">{{ $t('common.play_now') }}</button>
                </div>
                <img src="/images/lottery/ruby.png" :alt="$t('lottery.ruby')" />
            </li>
            <li>
                <img src="/images/lottery/sapphire.png" :alt="$t('lottery.sapphire')" />
                <div class="item-wrapper">
                    <span>{{ $t('lottery.sapphire') }}</span>
                    <p>{{ $t('lottery.sapphire_msg') }}</p>
                    <button type="button" @click="openGame('sapphire')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
        </ul>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import TheCarousel from '@/components/common/TheCarousel';
import TheAnnouncement from '@/components/common/TheAnnouncement';
import TheGameNavBar from '@/components/common/TheGameNavBar';

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
        TheCarousel,
        TheAnnouncement,
        TheGameNavBar
    },
    mounted() {},
    methods: {
        // Open Lottery Games
        openGame(productCode) {
            if (this.isLogined) {
                this.$store
                    .dispatch('game/getGameURL', {
                        category: 'Lottery',
                        productCode,
                        is_mobile: 1
                    })
                    .then(() => {
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

            > li {
                display: flex;
                width: 100%;
                min-height: 165px;

                > img {
                    width: 57%;
                    align-self: center;
                }

                .item-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin: 2% 2% 2% 4%;

                    > span {
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    > p {
                        color: #575757;
                        height: 100%;
                    }

                    > button {
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