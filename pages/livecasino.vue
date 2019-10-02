<template>
    <main class="livecasino-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <ul class="livecasino-container">
            <li class="livecasino-item-wrapper">
                <!-- Asia Gaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_asia_gaming.png" />
                    <span class="livecasino-item-name">Asia Gaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.ag_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('ag', 'Asia Gaming', '/images/gm_asia_gaming.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
                <!-- SA Gaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_sa_gaming.png" />
                    <span class="livecasino-item-name">SA Gaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.sa_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('sa', 'SA Gaming', '/images/gm_sa_gaming.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li class="livecasino-item-wrapper">
                <!-- Gameplay Interactive -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_gameplay_interactive.png" />
                    <span class="livecasino-item-name">Gameplay Interactive</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.gpi_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('gpi', 'Gameplay Interactive', '/images/gm_gameplay_interactive.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
                <!-- Evolution Gaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_evolution_gaming.png" />
                    <span class="livecasino-item-name">Evolution Gaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.evo_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('evo', 'Evolution Gaming', '/images/gm_evolution_gaming.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li class="livecasino-item-wrapper">
                <!-- Playtech -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_playtech.png" />
                    <span class="livecasino-item-name">Playtech</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.plt_msg') }}</span>
                    <nuxt-link
                        class="livecasino-play-now-btn plt-btn"
                        :to="$i18n.path('livecasino_plt')"
                    >{{ $t('common.play_now') }}</nuxt-link>
                </div>
                <!-- Dream Gaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_dream_gaming.png" />
                    <span class="livecasino-item-name">Dream Gaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.dg_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('dg', 'Dream Gaming', '/images/gm_dream_gaming.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li class="livecasino-item-wrapper">
                <!-- Sexy Gaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_sexy_gaming.png" />
                    <span class="livecasino-item-name">Sexy Gaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.sg_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('sb', 'Sexy Gaming', '/images/gm_sexy_gaming.png')"
                    >{{ $t('common.play_now') }}</button>
                </div>
                <!-- Microgaming -->
                <div class="livecasino-item-container">
                    <img class="livecasino-item-img" src="/images/gm_microgaming.png" />
                    <span class="livecasino-item-name">Microgaming</span>
                    <span class="livecasino-item-msg">{{ $t('livecasino.mg_msg') }}</span>
                    <button
                        class="livecasino-play-now-btn"
                        type="button"
                        @click="openGame('mg', 'Microgaming', '/images/gm_microgaming.png')"
                    >{{ $t('common.play_now') }}</button>
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
            accesstoken: 'GetAccessToken',
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
        $('.tab-livecasino').addClass('active');
    },
    methods: {
        // Open Live Casino Games
        openGame(vendor, gameName, imgURL) {
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
.livecasino-wrapper {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: $font-family;

    .livecasino-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 62vh;
        background: $background_img;
        background-size: cover;
        padding-bottom: 70px;

        .livecasino-item-wrapper {
            display: flex;
            padding: 7px;
            color: $color-black;

            &:nth-child(odd) {
                background: rgba(173, 173, 173, 0.4);
            }

            .livecasino-item-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
                padding: 7px 7px 0 7px;
                background: transparent;

                .livecasino-item-img {
                    width: 100%;
                }
                .livecasino-item-name {
                    font-size: 15px;
                    font-weight: bold;
                    margin: 10px 0 5px 0;
                }
                .livecasino-item-msg {
                    height: 100%;
                    color: #575757;
                }
                .livecasino-play-now-btn {
                    width: 95px;
                    min-height: 35px;
                    font-weight: bold;
                    background: $color-yellow-linear-unpress;
                    border: $border-style;
                    border-radius: 5px;
                    margin-top: 15px;

                    &:active {
                        background: $color-yellow-linear;
                    }
                    &.plt-btn {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: $color-black;
                    }
                }
            }
        }
    }
}
</style>