<template>
	<main class="fishing-wrapper">
		<!-- Message Modal -->
		<modal-message ref="child"></modal-message>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Content -->
		<ul class="fishing-container">
			<li v-for="(item, index) in gameList" :key="`fishing-${index}`" @click="openGame(item[0], item[1])">
				<img :src="`/images/fishing/${item[1]}.png`" :alt="item[2]" />
				<button type="button">{{ $t('common.play_now') }}</button>
			</li>
		</ul>
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
			openGame(game_id, product_code) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				if (this.isLogined) {
					this.$store
						.dispatch('game/getGameURL', {
							category: 'slot',
							product_code,
							game_id,
						})
						.then(() => {
							// Hide Loading Animation
							this.$nuxt.$loading.finish();

							$('.msg-list').html('');
							if (this.httpStatus === 200) {
								window.open(this.gameURL);
							} else if (this.httpStatus === 403) {
								$('.msg-list').append(`<li>${this.$t('common.error_403')}</li>`);
								$('#modalMessage').modal('show');
							} else {
								$('.msg-list').append(`<li>${this.errorMsg}</li>`);
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
	.fishing-wrapper {
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 110px);
		font-size: 12px;
		font-family: $font-family;
		background: url('../static/images/bg_black.jpg');
		background-size: cover;
		padding-bottom: 90px;

		.fishing-container {
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
</style>