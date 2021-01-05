<template>
	<div class="game-play-modal" id="modalGame">
		<div class="game-play-modal-wrapper">
			<fa :icon="['fas', 'times']" class="modal-close" @click="closeModal()" />
			<div class="game-play-modal-container">
				<img :src="gameImg" :alt="gameName" />
				<span>{{ gameName }}</span>
				<button class="btn-login" type="button" @click="login()">{{ $t('common.login') }}</button>
				<button class="btn-register" type="button" @click="register()">{{ $t('common.register') }}</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			gameImg: {
				type: String,
				default: '',
			},
			gameName: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				nowPosition: null,
			};
		},
		methods: {
			// Show Modal
			showModal() {
				// Record Position
				this.nowPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

				$('html, body').addClass('freezePage');
				$('#modalGame').show();
				setTimeout(() => {
					$('.game-play-modal-wrapper').addClass('show');
				}, 100);
			},

			// Close Modal
			closeModal() {
				$('html, body').removeClass('freezePage');
				$('.game-play-modal-wrapper').removeClass('show');
				setTimeout(() => {
					$('#modalGame').hide();
				}, 100);

				// Scroll To Record Position
				$('html, body').animate({ scrollTop: this.nowPosition + 'px' }, 0);
			},

			// Login
			login() {
				this.closeModal();
				setTimeout(() => {
					this.$router.push({ path: this.$i18n.path('login') });
				}, 200);
			},

			// Regiseter
			register() {
				this.closeModal();
				setTimeout(() => {
					this.$router.push({ path: this.$i18n.path('register') });
				}, 200);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.game-play-modal {
		display: none;
		position: fixed;
		z-index: 1040;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-weight: bold;
		font-family: $font-family;
		font-size: 16px;

		.game-play-modal-wrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background: #e3e3e3;

			-webkit-transform: scale(0, 0);
			-ms-transform: scale(0, 0);
			transform: scale(0, 0);
			-webkit-transition: -webkit-transform 300ms;
			transition: transform 300ms;

			&.show {
				-webkit-transform: scale(1, 1);
				-ms-transform: scale(1, 1);
				transform: scale(1, 1);
				-webkit-transition: -webkit-transform 300ms;
				transition: transform 300ms;
			}

			.modal-close {
				position: absolute;
				top: 10px;
				right: 14px;
				color: $color-black;
				font-size: 26px;
			}

			.game-play-modal-container {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 290px;
				height: 500px;
				background: $color-white;
				border-radius: 5px;
				box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2);

				> img {
					width: 150px;
					border-radius: 10px;
				}
				> span {
					text-align: center;
					margin: 20px 0;
				}

				> button {
					width: 150px;
					height: 44px;
					font-weight: bold;
					border: 1.5px solid #feaa06;
					border-radius: 5px;
					margin-top: 10px;

					&.btn-login {
						color: #feaa06;
						background: transparent;
					}
					&.btn-register {
						border: solid 1.5px #feaa06;
						background: $color-yellow-linear-unpress;

						&:active {
							background: $color-yellow-linear;
						}
					}
				}
			}
		}
	}
</style>