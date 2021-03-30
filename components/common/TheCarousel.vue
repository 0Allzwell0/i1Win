<template>
	<section class="carousel-wrapper">
		<div class="swiper-container">
			<ul class="swiper-wrapper">
				<li class="swiper-slide" v-for="(item, index) in bannersList" :key="`banner-${index}`">
					<nuxt-link :to="$i18n.path('promotions')">
						<img class="swiper-lazy" :src="item.image" />
						<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
					</nuxt-link>
				</li>
			</ul>
			<div class="swiper-pagination"></div>
		</div>
	</section>
</template>
<script>
	import Swiper from 'swiper/bundle';
	import SwiperCore, { Navigation, Pagination } from 'swiper/core'; // core version + navigation, pagination modules:
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('user', {
				bannersList: 'GetBanners',
			}),
		},
		mounted() {
			// configure Swiper to use modules
			SwiperCore.use([Navigation, Pagination]);

			// Get Banners
			this.$store.dispatch('user/getBanners').then(() => {
				if (this.bannersList) {
					this.runCarousel();
				}
			});
		},
		methods: {
			// Run Carousel
			runCarousel() {
				// Carouesl Setting
				const bannerCarousel = new Swiper('.swiper-container', {
					// Index Banner
					autoplay: {
						delay: 5000,
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination',
					},
					// Disable preloading of all images
					preloadImages: false,

					// Enable lazy loading
					lazy: {
						loadPrevNext: true,
						loadPrevNextAmount: 1,
					},
				});
			},
		},
	};
</script>
<style lang="scss">
	@import 'swiper/swiper-bundle.css';

	.carousel-wrapper {
		width: 100%;

		.swiper-container {
			width: 100%;

			> ul {
				width: 100%;

				> li {
					width: 100%;

					> a {
						display: block;
						width: 100%;

						> img {
							width: 100%;
							background-repeat: no-repeat;
							background-position: center center;
							background-size: cover;
							text-align: center;
						}
					}
				}
			}
		}

		.swiper-pagination {
			bottom: 0;
			text-align: center;

			.swiper-pagination-bullet {
				width: 10px;
				height: 10px;
				opacity: 0.5;
				margin: 0 4px 4px 4px;
			}

			.swiper-pagination-bullet-active {
				background: $color-yellow;
				opacity: 1;
			}
		}
	}
</style>