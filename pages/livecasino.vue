<template>
    <main class="livecasino-wrapper">
        <!-- Carousel -->
        <the-carousel></the-carousel>

        <!-- Announcement -->
        <the-announcement></the-announcement>

        <!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <the-game-nav-bar></the-game-nav-bar>

        <!-- Games -->
        <ul class="livecasino-container">
            <li>
                <!-- Dream Gaming -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_dg.png" alt="Dream Gaming" />
                    <span>Dream Gaming</span>
                    <p>{{ $t('livecasino.dg_msg') }}</p>
                    <button type="button" @click="openGame('dg')">{{ $t('common.play_now') }}</button>
                </div>

                <!-- AE Sexy -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_sg.png" alt="AE Sexy" />
                    <span>AE Sexy</span>
                    <p>{{ $t('livecasino.sg_msg') }}</p>
                    <button type="button" @click="openGame('sb')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li>
                <!-- Evolution Gaming -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_evo.png" alt="Evolution Gaming" />
                    <span>Evolution Gaming</span>
                    <p>{{ $t('livecasino.evo_msg') }}</p>
                    <button type="button" @click="openGame('evo')">{{ $t('common.play_now') }}</button>
                </div>

                <!-- Microgaming -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_mg.png" alt="Microgaming" />
                    <span>Microgaming</span>
                    <span>{{ $t('livecasino.mg_msg') }}</span>
                    <button type="button" @click="openGame('mg')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li>
                <!-- Asia Gaming -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_ag.png" alt="Asia Gaming" />
                    <span>Asia Gaming</span>
                    <p>{{ $t('livecasino.ag_msg') }}</p>
                    <button type="button" @click="openGame('ag')">{{ $t('common.play_now') }}</button>
                </div>

                <!-- Gameplay Interactive -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_gpi.png" alt="Gameplay Interactive" />
                    <span>Gameplay Interactive</span>
                    <p>{{ $t('livecasino.gpi_msg') }}</p>
                    <button type="button" @click="openGame('gpi')">{{ $t('common.play_now') }}</button>
                </div>
            </li>
            <li>
                <!-- Playtech -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_plt.png" alt="Playtech" />
                    <span>Playtech</span>
                    <p>{{ $t('livecasino.plt_msg') }}</p>
                    <nuxt-link :to="$i18n.path('livecasino_plt')">{{ $t('common.play_now') }}</nuxt-link>
                </div>

                <!-- SA Gaming -->
                <div class="item-wrapper">
                    <img src="/images/livecasino/gm_sa.png" alt="SA Gaming" />
                    <span>SA Gaming</span>
                    <p>{{ $t('livecasino.sa_msg') }}</p>
                    <button type="button" @click="openGame('sa')">{{ $t('common.play_now') }}</button>
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
        // Open Live Casino Games
        openGame(productCode) {
            if (this.isLogined) {
                this.$store
                    .dispatch('game/getGameURL', {
                        category: 'Livecasino',
                        productCode,
                        is_mobile: 1
                    })
                    .then(() => {
                        window.open(this.gameURL);
                    });
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

            > li {
                display: flex;
                padding: 7px;
                color: $color-black;

                &:nth-child(odd) {
                    background: rgba(173, 173, 173, 0.4);
                }

                .item-wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 100%;
                    padding: 7px 7px 0 7px;
                    background: transparent;

                    > img {
                        width: 100%;
                    }

                    > span {
                        font-size: 15px;
                        font-weight: bold;
                        margin: 10px 0 5px 0;
                    }

                    > p {
                        height: 100%;
                        color: #575757;
                    }

                    > button {
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
                    }

                    > a {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 95px;
                        min-height: 35px;
                        color: $color-black;
                        font-weight: bold;
                        background: $color-yellow-linear-unpress;
                        border: $border-style;
                        border-radius: 5px;
                        margin-top: 15px;
                    }
                }
            }
        }
    }
</style>