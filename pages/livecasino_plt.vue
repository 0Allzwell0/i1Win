<template>
	<main class="livecasino-plt-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Logo -->
		<img src="/images/livecasino/plt_logo.png" alt />

		<!-- Games -->
		<ul>
			<li>
				<img src="/images/livecasino/plt_7bal.png" alt="Live 7 Seat Baccarat" />
				<span>Live 7 Seat Baccarat</span>
				<button type="button" @click="openGame('7bal')">{{ $t('common.play_now') }}</button>
			</li>
			<li>
				<img src="/images/livecasino/plt_bal.png" alt="Baccarat Live" />
				<span>Baccarat Live</span>
				<button type="button" @click="openGame('bal')">{{ $t('common.play_now') }}</button>
			</li>
			<li>
				<img src="/images/livecasino/plt_rofl.png" alt="Live French Roulette" />
				<span>Live French Roulette</span>
				<button type="button" @click="openGame('rofl')">{{ $t('common.play_now') }}</button>
			</li>
			<li>
				<img src="/images/livecasino/plt_rol.png" alt="Roulette Live" />
				<span>Roulette Live</span>
				<button type="button" @click="openGame('rol')">{{ $t('common.play_now') }}</button>
			</li>
		</ul>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';

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
			ModalMessage,
		},
		methods: {
			// Open Live Casino Playtech Games
			openGame(productCode) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

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
					this.$router.push(this.$i18n.path('login'));
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.livecasino-plt-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: calc(100vh - 20px);
		font-family: $font-family;
		background: $background_img;
		background-size: cover;
		padding-bottom: 70px;

		> img {
			width: 70%;
			margin: 4% 0 5% 0;
		}

		> ul {
			display: inline-block;
			width: 100%;
			height: 100%;

			> li {
				display: inline-block;
				width: calc((100% - 45px) / 2);
				text-align: center;
				margin: 10px;

				> img {
					width: 100%;
				}

				> span {
					width: 100%;
					font-size: 13px;
					font-weight: bold;
					padding: 7px 0 7px 0;
				}

				> button {
					width: 80%;
					min-height: 35px;
					font-size: 16px;
					font-weight: bold;
					border: $border-style;
					background: $color-yellow-linear-unpress;
					border-radius: 5px;
					margin: 5px 0 8px 0;

					&:active {
						background: $color-yellow-linear;
					}
				}
			}
		}
	}
</style>