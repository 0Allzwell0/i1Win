<template>
	<main class="sports-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<ul class="sports-container">
			<li v-for="(item, index) in gameList" :key="`sports-${index}`">
				<img v-if="index % 2 === 1" :src="`/images/sports/${item[0]}.png`" :alt="item[1]" />
				<div class="item-wrapper">
					<span>{{ item[1] }}</span>
					<p>{{ $t(`sports.${item[0]}_msg`) }}</p>
					<button type="button" @click="openGame(item[0])">{{ $t('common.play_now') }}</button>
				</div>
				<img v-if="index % 2 === 0" :src="`/images/sports/${item[0]}.png`" :alt="item[1]" />
			</li>
		</ul>
	</main>
</template>
<script>
	import { SPORTS } from '~/environment';
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
				gameList: SPORTS,
			};
		},
		methods: {
			// Open Sports Games
			openGame(product_code) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (this.isLogined) {
					this.$store
						.dispatch('game/getGameURL', {
							category: 'sports',
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
					this.$router.push(this.$i18n.path('login'));
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.sports-wrapper {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 110px);
		font-size: 12px;
		font-family: $font-family;
		background: $background_img;
		background-size: cover;
		padding-bottom: 90px;

		.sports-container {
			display: flex;
			flex-direction: column;
			width: 100%;

			> li {
				display: flex;
				width: 100%;
				padding: 3% 0;

				> img {
					width: 57%;
					align-self: center;
					margin-top: -8px;
				}

				.item-wrapper {
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 0 4%;

					> span {
						font-size: 15px;
						font-weight: bold;
						margin-bottom: 5px;
					}

					> p {
						color: #575757;
						line-height: 14px;
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