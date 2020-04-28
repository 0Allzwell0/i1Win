<template>
    <main class="fishing-wrapper">
        <!-- Carousel
        <my-carousel />-->

        <!-- Announcement
        <my-announcement />-->
        <img src="/images/fishing/banner.jpg" />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Content -->
        <div class="fishing-container">
            <ul>
                <!-- Bombing Fishing -->
                <li @click="openGame('', 'bf')">
                    <img src="/images/fishing/bf.png" alt="Bombing Fishing" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- Jackpot Fishing -->
                <li @click="openGame('', 'jf')">
                    <img src="/images/fishing/jf.png" alt="Jackpot Fishing" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- League Of Bird Hunting -->
                <li @click="openGame(1773, 'bh')">
                    <img src="/images/fishing/lobh.png" alt="League Of Bird Hunting" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- Dragon Assault Be A Dragon King -->
                <li @click="openGame('', 'badk')">
                    <img src="/images/fishing/badk.png" alt="Dragon Assault Be A Dragon King" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- Chain Long Fishing -->
                <li @click="openGame('', 'clf')">
                    <img src="/images/fishing/clf.png" alt="Chain Long Fishing" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- Fishing God -->
                <li @click="openGame(421, 'fg')">
                    <img src="/images/fishing/fg.png" alt="Fishing God" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- League Of Fishing Joy -->
                <li @click="openGame(1774, 'fj')">
                    <img src="/images/fishing/lofj.png" alt="League Of Fishing Joy" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
                <!-- Fishermen Gold -->
                <li @click="openGame('', 'fmg')">
                    <img src="/images/fishing/fmg.png" alt="Fishermen Gold" />
                    <button type="bytton">{{ $t('common.play_now') }}</button>
                </li>
            </ul>
        </div>
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
        $('.tab-fishing').addClass('active');
    },
    methods: {
        // Open Fishing Games
        openGame(gameID, productCode) {
            if (this.isLogined) {
                this.$store
                    .dispatch('game/getGameURL', {
                        category: 'Fishing',
                        productCode,
                        gameID,
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
    .fishing-wrapper {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: $font-family;

        > img {
            width: 100%;
        }

        .fishing-container {
            width: 100%;
            min-height: 62vh;
            background: url('../static/images/fishing/bg.jpg');
            background-size: cover;
            padding-bottom: 70px;

            > ul {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                height: 100%;
                padding: 10px 10px 0 10px;

                > li {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 50%;
                    margin-bottom: 5%;

                    > img {
                        width: 100%;
                    }

                    > button {
                        width: 54%;
                        background: linear-gradient(to bottom, #f6c200, #ce5700);
                        border-radius: 0 0 20px 20px;
                        padding: 2px 0;
                        margin-top: -15%;
                    }
                }
            }
        }
    }
</style>