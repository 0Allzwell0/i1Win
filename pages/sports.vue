<template>
    <main class="sports-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <ul class="sports-container">
            <li class="sports-item-wrapper">
                <img class="sports-item-img" src="/images/sports/sbo.png" />
                <div class="sports-item-container">
                    <span class="sports-item-name">SBOBET</span>
                    <span class="sports-item-msg">{{ $t('sports.sbo_msg') }}</span>
                    <button class="sports-play-now-btn" type="button" @click="openGame('sbo')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li class="sports-item-wrapper">
                <div class="sports-item-container">
                    <span class="sports-item-name">ONE BOOK</span>
                    <span class="sports-item-msg">{{ $t('sports.ibc_msg') }}</span>
                    <button class="sports-play-now-btn" type="button" @click="openGame('ibc')">{{ $t('common.play_now') }}</button>
                </div>
                <img class="sports-item-img" src="/images/sports/ibcg.png" />
            </li>
            <li class="sports-item-wrapper">
                <img class="sports-item-img" src="/images/sports/bti.png" />
                <div class="sports-item-container">
                    <span class="sports-item-name">BTi</span>
                    <span class="sports-item-msg">{{ $t('sports.bti_msg') }}</span>
                    <button class="sports-play-now-btn" type="button" @click="openGame('bti')">{{ $t('common.play_now') }}</button>
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
        $('.tab-sports').addClass('active');
    },
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

            .sports-item-wrapper {
                display: flex;
                width: 100%;
                min-height: 206px;

                .sports-item-img {
                    width: 57%;
                    align-self: center;
                    margin-top: -8px;
                }

                .sports-item-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin: 8px 8px 8px 15px;

                    .sports-item-name {
                        font-size: 15px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .sports-item-msg {
                        color: #575757;
                        height: 100%;
                    }

                    .sports-play-now-btn {
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