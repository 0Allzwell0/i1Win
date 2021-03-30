<template>
	<main class="livecasino-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<ul class="livecasino-container">
			<li v-for="(item, index) in gameList" :key="`casino-${index}`">
				<img :src="`/images/livecasino/${item[0]}.png`" :alt="item[1]" />
				<span>{{ item[1] }}</span>
				<p>{{ $t(`livecasino.${item[0]}_msg`) }}</p>
				<button type="button" @click="openGame(item[0])">{{ $t('common.play_now') }}</button>
			</li>
		</ul>
	</main>
</template>
<script>
	import { LIVE_CASINO } from '~/environment';
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
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
			TheGameNavBar,
			ModalMessage,
		},
		data() {
			return {
				gameList: LIVE_CASINO,
			};
		},
		methods: {
			// Open Live Casino Games
			openGame(product_code) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (this.isLogined) {
					this.$store
						.dispatch('game/getGameURL', {
							category: 'live',
							product_code,
						})
						.then(() => {
							// Hide Loading Animation
							this.$nuxt.$loading.finish();

							$('.msg-list').html('');
							if (this.httpStatus === 200) {
								window.open(this.gameURL);
							} else {
								if (this.httpStatus === 403) {
									$('.msg-list').append(`<li>${this.$t('common.error_403')}</li>`);
								} else {
									$('.msg-list').append(`<li>${this.errorMsg}</li>`);
								}
								$('#modalMessage').modal('show');
							}
						});
				} else {
					this.$router.push({ path: this.$i18n.path('login') });
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.livecasino-wrapper {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 110px);
		font-size: 12px;
		font-family: $font-family;
		background: $background_img;
		background-size: cover;
		padding-bottom: 90px;

		.livecasino-container {
			display: flex;
			flex-wrap: wrap;
			width: 100%;

			> li {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: calc(100% / 2);
				padding: 2% 2% 2% 4%;

				&:nth-child(4n + 1),
				&:nth-child(4n + 2) {
					background: rgba(0, 0, 0, 0.1);
				}

				&:nth-child(2n) {
					padding: 2% 4% 2% 2%;
				}

				> img {
					width: 100%;
				}

				> span {
					font-size: 15px;
					font-weight: bold;
					padding: 10px 0 5px 0;
				}

				> p {
					color: #575757;
					line-height: 14px;
					height: 100%;
				}

				> button {
					width: 95px;
					min-height: 35px;
					font-weight: bold;
					background: $color-yellow-linear-unpress;
					border: $border-style;
					border-radius: 5px;
					margin-top: 10px;

					&:active {
						background: $color-yellow-linear;
					}
				}
			}
		}
	}
</style>