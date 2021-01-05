<template>
	<main class="livecasino-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Carousel -->
		<the-carousel></the-carousel>

		<!-- Announcement -->
		<the-announcement></the-announcement>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<ul class="livecasino-container">
			<li v-for="(item, index) in gameList" :key="`casino-${index}`">
				<img v-if="item[0] === 'pplay_megawheel'" :src="`/images/livecasino/pplay_megawheel_${lang}.png`" :alt="item[1]" />
				<img v-else :src="`/images/livecasino/${item[0]}.png`" :alt="item[1]" />
				<span>{{ item[1] }}</span>
				<p>{{ $t(`livecasino.${item[0]}_msg`) }}</p>
				<button type="button" @click="openGame(item[0])">{{ $t('common.play_now') }}</button>
			</li>
		</ul>
	</main>
</template>
<script>
	import { LIVE_CASINO } from '~/environment';
	import LANGUAGE from '~/middleware/getLanguage';
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheCarousel from '@/components/common/TheCarousel';
	import TheAnnouncement from '@/components/common/TheAnnouncement';
	import TheGameNavBar from '@/components/common/TheGameNavBar';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
			}),
			...mapGetters('game', {
				gameURL: 'GetGameURL',
				httpStatus: 'GetHttpStatus',
				errorMsg: 'GetErrorMsg',
			}),
		},
		components: {
			TheCarousel,
			TheAnnouncement,
			TheGameNavBar,
			ModalMessage,
		},
		data() {
			return {
				gameList: LIVE_CASINO,
				lang: null,
			};
		},
		mounted() {
			this.lang = LANGUAGE.getLanguage();
		},
		methods: {
			// Open Live Casino Games
			openGame(productCode) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (productCode === 'plt') {
					this.$router.push({ path: this.$i18n.path('livecasino_plt') });
				} else {
					if (this.isLogined) {
						this.$store
							.dispatch('game/getGameURL', {
								category: 'Livecasino',
								productCode,
							})
							.then(() => {
								// Hide Loading Animation
								this.$nuxt.$loading.finish();

								$('.msg-list').html('');
								if (this.httpStatus === 200) {
									window.open(this.gameURL);
								} else if (this.httpStatus === 403) {
									$('.msg-list').append(`<li>${this.$t('common.error_403')}</li>`);
								} else {
									$('.msg-list').append(`<li>${this.errorMsg}</li>`);
								}
								$('#modalMessage').modal('show');
							});
					} else {
						this.$router.push({ path: this.$i18n.path('login') });
					}
				}
			},
		},
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
			flex-wrap: wrap;
			width: 100%;
			min-height: 62vh;
			background: $background_img;
			background-size: cover;
			padding-bottom: 70px;

			> li {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: calc(100% / 2);
				padding: 7px;
				background: transparent;

				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(4n + 1),
				&:nth-child(4n + 2) {
					background: rgba(0, 0, 0, 0.1);
				}

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

				// .item-wrapper {
				// 	display: flex;
				// 	flex-direction: column;
				// 	justify-content: space-between;
				// 	width: 100%;
				// 	padding: 7px 7px 0 7px;
				// 	background: transparent;

				// 	> img {
				// 		width: 100%;
				// 	}

				// 	> span {
				// 		font-size: 15px;
				// 		font-weight: bold;
				// 		margin: 10px 0 5px 0;
				// 	}

				// 	> p {
				// 		height: 100%;
				// 		color: #575757;
				// 	}

				// 	> button {
				// 		width: 95px;
				// 		min-height: 35px;
				// 		font-weight: bold;
				// 		background: $color-yellow-linear-unpress;
				// 		border: $border-style;
				// 		border-radius: 5px;
				// 		margin-top: 15px;

				// 		&:active {
				// 			background: $color-yellow-linear;
				// 		}
				// 	}

				// 	> a {
				// 		display: flex;
				// 		justify-content: center;
				// 		align-items: center;
				// 		width: 95px;
				// 		min-height: 35px;
				// 		color: $color-black;
				// 		font-weight: bold;
				// 		background: $color-yellow-linear-unpress;
				// 		border: $border-style;
				// 		border-radius: 5px;
				// 		margin-top: 15px;
				// 	}
				// }
			}
		}
	}
</style>