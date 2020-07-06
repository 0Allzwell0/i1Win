<template>
    <main class="sports-wrapper">
        <!-- Carousel -->
        <the-carousel></the-carousel>

        <!-- Announcement -->
        <the-announcement></the-announcement>

        <!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <the-game-nav-bar></the-game-nav-bar>

        <!-- Games -->
        <ul class="sports-container">
            <!-- SBOBET -->
            <li>
                <img src="/images/sports/sbo.png" alt="SBOBET" />
                <div class="item-wrapper">
                    <span>SBOBET</span>
                    <p>{{ $t('sports.sbo_msg') }}</p>
                    <button type="button" @click="openGame('sbo')">{{ $t('common.play_now') }}</button>
                </div>
            </li>

            <!-- ONE BOOK -->
            <li>
                <div class="item-wrapper">
                    <span>ONE BOOK</span>
                    <p>{{ $t('sports.ibc_msg') }}</p>
                    <button type="button" @click="openGame('ibc')">{{ $t('common.play_now') }}</button>
                </div>
                <img src="/images/sports/ibcg.png" alt="ONE BOOK" />
            </li>

            <!-- Bti -->
            <li>
                <img src="/images/sports/bti.png" alt="BTi" />
                <div class="item-wrapper">
                    <span>BTi</span>
                    <p>{{ $t('sports.bti_msg') }}</p>
                    <button type="button" @click="openGame('bti')">{{ $t('common.play_now') }}</button>
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
        // Open Sports Games
        openGame(productCode) {
            if (this.isLogined) {
                this.$store
                    .dispatch('game/getGameURL', {
                        category: 'Sports',
                        productCode,
                        is_mobile: 1
                    })
                    .then(() => {
                        window.open(this.gameURL);
                    });
            } else {
                tthis.$router.push(this.$i18n.path('login'));
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .sports-wrapper {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: $font-family;

        .sports-container {
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
                min-height: 206px;

                > img {
                    width: 57%;
                    align-self: center;
                    margin-top: -8px;
                }

                .item-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin: 8px 8px 8px 15px;

                    > span {
                        font-size: 15px;
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