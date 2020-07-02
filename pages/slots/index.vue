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
                <li class="slots-game-wrapper" v-for="(item, index) in games" :key="`slots-${index}`">
                    <nuxt-link class="slots-game-container" :to="$i18n.path(`slots/${item.code}`)">
                        <div class="slots-game-name-wrapper">
                            <span class="slots-game-name">{{ item.name }}</span>
                            <span class="slots-game-type">SLOTS</span>
                        </div>
                        <img class="slots-game-img" :src="`/images/slots/${item.code}.png`" />
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </main>
</template>
<script>
import MyCarousel from '~/components/MyCarousel';
import MyAnnouncement from '~/components/MyAnnouncement';
import MyGameTab from '~/components/MyGameTab';

export default {
    components: {
        MyCarousel,
        MyAnnouncement,
        MyGameTab
    },
    data() {
        return {
            games: [
                { code: 'ygg', name: 'YGG' },
                { code: 'spg', name: 'SPG' },
                { code: 'jili', name: 'JILI' },
                { code: 'bng', name: 'BNG' },
                { code: 'plt', name: 'PLT' },
                { code: 'gpi', name: 'GPI' },
                { code: 'cq9', name: 'CQ9' },
                { code: 'joker', name: 'JOKER' },
                { code: 'mg', name: 'MG' },
                { code: 'dt', name: 'DT' },
                { code: 'ifun', name: 'iFun' },
                { code: 'ks9', name: '918Kiss' },
                { code: 'sp', name: 'SP' },
                { code: 'maja', name: 'MaJa' },
                { code: 'pplay', name: 'PPlay' }
            ]
        };
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