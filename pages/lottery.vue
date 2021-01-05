<template>
	<main class="lottery-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Carousel -->
		<the-carousel></the-carousel>

		<!-- Announcement -->
		<the-announcement></the-announcement>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<ul class="lottery-container">
			<li v-for="(item, index) in gameList" :key="`lottery-${index}`">
				<img v-if="index % 2 === 0" :src="`/images/lottery/${item}.png`" :alt="$t(`lottery.${item}`)" />
				<div class="item-wrapper">
					<span>{{ $t(`lottery.${item}`) }}</span>
					<p>{{ $t(`lottery.${item}_msg`) }}</p>
					<button type="button" @click="openGame(item)">{{ $t('common.play_now') }}</button>
				</div>
				<img v-if="index % 2 === 1" :src="`/images/lottery/${item}.png`" :alt="$t(`lottery.${item}`)" />
			</li>
		</ul>
	</main>
</template>
<script>
	import { LOTTERY } from '~/environment';
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
				gameList: LOTTERY,
			};
		},
		methods: {
			// Open Lottery Games
			openGame(productCode) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (this.isLogined) {
					this.$store
						.dispatch('game/getGameURL', {
							category: 'Lottery',
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
					this.$router.push(this.$i18n.path('login'));
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.lottery-wrapper {
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: $font-family;

		.lottery-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			min-height: 62vh;
			background: $background_img;
			background-size: cover;
			padding-bottom: 70px;

			> li {
				display: flex;
				width: 100%;
				min-height: 165px;

				> img {
					width: 57%;
					align-self: center;
				}

				.item-wrapper {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin: 2% 2% 2% 4%;

					> span {
						font-size: 16px;
						font-weight: bold;
						margin-bottom: 5px;
					}

					> p {
						color: #575757;
						height: 100%;
					}

					> button {
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