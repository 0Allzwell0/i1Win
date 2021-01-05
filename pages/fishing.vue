<template>
	<main class="fishing-wrapper">
		<!-- Message Modal -->
		<modal-message ref="child"></modal-message>

		<!-- Banner -->
		<img src="/images/fishing/banner.jpg" alt />

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Content -->
		<div class="fishing-container">
			<ul>
				<li v-for="(item, index) in gameList" :key="`fishing-${index}`" @click="openGame(item[0], item[1])">
					<img :src="`/images/fishing/${item[1]}.png`" :alt="item[2]" />
					<button type="button">{{ $t('common.play_now') }}</button>
				</li>
			</ul>
		</div>
	</main>
</template>
<script>
	import { FISHING } from '~/environment';
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
			ModalMessage,
			TheGameNavBar,
		},
		data() {
			return {
				gameList: FISHING,
			};
		},
		methods: {
			// Open Fishing Games
			openGame(gameID, productCode) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (this.isLogined) {
					this.$store
						.dispatch('game/getGameURL', {
							category: 'Fishing',
							productCode,
							gameID,
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
	.fishing-wrapper {
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: $font-family;

		> img {
			width: 100%;
		}

		.fishing-container {
			width: 100%;
			min-height: 62vh;
			background: url('../static/images/fishing/bg.jpg');
			background-size: cover;
			padding-bottom: 70px;

			> ul {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				height: 100%;
				padding: 10px 10px 0 10px;

				> li {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 50%;
					margin-bottom: 5%;

					> img {
						width: 100%;
					}

					> button {
						width: 54%;
						background: linear-gradient(to bottom, #f6c200, #ce5700);
						border-radius: 0 0 20px 20px;
						padding: 3px 0;
						margin-top: -15%;
					}
				}
			}
		}
	}
</style>