<template>
    <section class="carousel-wrapper">
        <div class="carousel-container swiper-container">
            <ul class="carousel-list swiper-wrapper">
                <li class="carousel-item-wrapper swiper-slide" v-for="(item, index) in bannerList" :key="`banner-${index}`">
                    <nuxt-link class="carousel-item" :to="$i18n.path('promotions')">
                        <img class="carousel-item-img swiper-lazy" :src="item.src" />
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </nuxt-link>
                </li>
            </ul>
            <div class="carousel-dots-wrapper swiper-container"></div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', {
            bannerList: 'GetBanner'
        })
    },
    mounted() {
        // Carouesl Setting
        let mySwiper = new Swiper('.carousel-container', {
            // Index Banner
            autoplay: {
                delay: 4000
            },
            loop: true,
            pagination: {
                el: '.carousel-dots-wrapper',
                bulletElement: 'li',
                renderBullet: function(index, className) {
                    return '<li class="' + className + '"></li>';
                },
                clickable: true
            },
            // Disable preloading of all images
            preloadImages: false,
            // Enable lazy loading
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 1
            }
        });
    }
};
</script>
<style lang="scss">
.carousel-wrapper {
    width: 100%;

    .carousel-item {
        display: block;
    }

    .carousel-item-img {
        width: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        text-align: center;
    }

    .carousel-dots-wrapper {
        bottom: 0;
        margin-top: -18px;
        text-align: center;

        .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            opacity: 0.5;
            margin: 0 4px 4px 4px;
        }
        .swiper-pagination-bullet-active {
            background: #82181c;
            opacity: 1;
        }
    }
}
</style>