<template>
    <main class="slots-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <div class="slots-container">
            <ul class="slots-games-list">
                <!-- Playtech -->
                <li class="slots-game-wrapper" id="plt">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/plt')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">PLT</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_plt.png" />
                    </nuxt-link>
                </li>
                <!-- Spadegaming -->
                <li class="slots-game-wrapper" id="spg">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/spg')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">SPG</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_spg.png" />
                    </nuxt-link>
                </li>
                <!-- Yggdrasil -->
                <li class="slots-game-wrapper" id="ygg">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/ygg')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">YGG</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_ygg.png" />
                    </nuxt-link>
                </li>
                <!-- GPI -->
                <li class="slots-game-wrapper" id="gpi">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/gpi')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">GPI</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_gpi.png" />
                    </nuxt-link>
                </li>
                <!-- Booongo -->
                <li class="slots-game-wrapper" id="bng">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/bng')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">BNG</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_bng.png" />
                    </nuxt-link>
                </li>
                <!-- Joker -->
                <li class="slots-game-wrapper" id="jok">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/jok')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">Joker</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_joker.png" />
                    </nuxt-link>
                </li>
                <!-- ifun -->
                <li class="slots-game-wrapper" id="ifun">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/ifun')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">ifun</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_ifun.png" />
                    </nuxt-link>
                </li>
                <!-- 918Kiss -->
                <li class="slots-game-wrapper" id="kiss918">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/ks9')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">918Kiss</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_918kiss.png" />
                    </nuxt-link>
                </li>
                <!-- CQ9 -->
                <li class="slots-game-wrapper" id="cq9">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/cq9')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">CQ9</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_cq9.png" />
                    </nuxt-link>
                </li>
                <!-- Microgaming -->
                <li class="slots-game-wrapper" id="mg">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/mg')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">Microgaming</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_mg.png" />
                    </nuxt-link>
                </li>
                <!-- Dreamtech -->
                <li class="slots-game-wrapper" id="dt">
                    <nuxt-link class="slots-game-container" :to="$i18n.path('slots/dt')">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">Dreamtech</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" src="/images/slots_dt.png" />
                    </nuxt-link>
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
        $('.tab-slots').addClass('active');
    }
};
</script>
<style lang="scss" scoped>
.slots-wrapper {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: $font-family;

    .slots-container {
        width: 100%;
        min-height: 62vh;
        background: $background_img;
        background-size: cover;
        padding-bottom: 70px;

        .slots-games-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
        }

        .slots-game-wrapper {
            position: relative;
            width: 28%;
            background: $color-black;
            border-radius: 10px;
            margin: 4% 0 0 4%;

            .slots-game-container {
                width: 100%;
                height: 100%;

                .slots-game-name-wrapper {
                    position: absolute;
                    top: 7px;
                    left: 7px;

                    .slots-game-name {
                        color: $color-white;
                        font-size: 16px;
                        line-height: 18px;
                    }
                    .slots-game-type {
                        color: #fdd609;
                    }
                }
                .slots-game-img {
                    width: 100%;
                    border-radius: 10px;
                }
            }
        }
    }
}
</style>