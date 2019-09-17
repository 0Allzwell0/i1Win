<template>
    <main class="fishing-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <ul class="fishing-container">
            <li class="fishing-item-wrapper">
                <div class="fishing-item-container">
                    <span class="fishing-item-name">Fishing God</span>
                    <span class="fishing-item-msg">{{ $t('fishing.fg_msg') }}</span>
                    <button
                        class="fishing-play-now-btn"
                        type="button"
                        @click="openGame(521, 'Fishing God', '/images/gm_fishing_god.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
                <img class="fishing-img" src="/images/gm_fishing_god.png" />
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
        })
    },
    components: {
        MyCarousel,
        MyAnnouncement,
        MyGameTab
    },
    mounted() {
        // Set Game Tab CSS
        $('.tab-container').removeClass('active');
        $('.tab-fishing').addClass('active');
    },
    methods: {
        // Open Fishing Games
        openGame(id, gameName, imgURL) {
            if (this.isLogined) {
                window.open('');
            } else {
                this.$router.push({ path: this.$i18n.path('login') });
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

    .fishing-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 62vh;
        background: $background_img;
        background-size: cover;
        padding-bottom: 70px;

        .fishing-item-wrapper {
            display: flex;
            width: 100%;
            min-height: 165px;

            .fishing-img {
                width: 57%;
                align-self: center;
            }
            .fishing-item-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin: 2% 2% 2% 4%;

                .fishing-item-name {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .fishing-item-msg {
                    color: #575757;
                    height: 100%;
                }
                .fishing-play-now-btn {
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