<template>
	<main class="login-wrapper">
		<div class="login-container">
			<!-- Close Button -->
			<fa :icon="['fas', 'times']" class="btn-close" @click="$router.push({ path: $i18n.path('') })" />

			<!-- Title -->
			<h2 class="login-title">{{ $t('common.login') }}</h2>

			<p class="login-msg msg1">{{ $t('login.login_msg1') }}</p>
			<p class="login-msg msg2">{{ $t('login.login_msg2') }}</p>

			<!-- Username -->
			<div class="input-wrapper">
				<img src="/images/username_img.png" :alt="$t('common.username')" />
				<input type="text" :placeholder="$t('common.username')" v-model="myUsername" />
			</div>
			<!-- Username Error Message-->
			<div class="error-msg error-username"></div>

			<!-- Password -->
			<div class="input-wrapper">
				<img src="/images/password_img.png" :alt="$t('common.password')" />
				<input id="inputPassword" type="password" :placeholder="$t('common.password')" v-model="myPassword" />
				<img class="eye-icon" :src="passwordEyes" @click="showPassword()" />
			</div>
			<div class="error-msg error-password"></div>

			<!-- Forgot Password -->
			<span class="forgot-psw" @click="showMsg()">{{ $t('login.forgot_password') }}</span>
			<span class="prompt-wrapper" v-show="showForgotMsg">
				<div class="prompt-title">{{ $t('login.forgot_password') }}</div>
				<div class="prompt-msg">{{ $t('login.forgot_password_msg') }}</div>
			</span>

			<!-- Login Button -->
			<button type="button" @click="login()">{{ $t('common.login') }}</button>

			<!-- Remind Message -->
			<p class="remind-msg">
				{{ $t('login.login_msg3') }}
				<nuxt-link :to="$i18n.path('register')">{{ $t('common.register') }}</nuxt-link>
			</p>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
				httpStatus: 'GetHttpStatus',
				loginErrorMsg: 'GetLoginErrorMsg',
				networkError: 'GetNetworkError',
			}),
		},
		data() {
			return {
				myUsername: null,
				myPassword: null,
				passwordEyes: '/images/close_eye.png',
				showForgotMsg: false,
			};
		},
		mounted() {
			$(document).click((el) => {
				let touchEl = el.target.className;
				if (touchEl !== 'forgot-psw' && touchEl !== 'prompt-wrapper' && touchEl !== 'prompt-title' && touchEl !== 'prompt-msg') {
					this.showForgotMsg = false;
				}
			});
		},
		methods: {
			// Show or Hidden "Forgot Password" Message
			showMsg() {
				this.showForgotMsg = !this.showForgotMsg;
			},

			// Show or Hidden Password
			showPassword() {
				let pswInputType = $('#inputPassword').attr('type');

				if (pswInputType === 'password') {
					this.passwordEyes = '/images/open_eye.png';
					$('#inputPassword').attr('type', 'text');
				} else if (pswInputType === 'text') {
					this.passwordEyes = '/images/close_eye.png';
					$('#inputPassword').attr('type', 'password');
				}
			},

			// Login
			login() {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('auth/login', {
						username: this.myUsername,
						password: this.myPassword,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();

						$('.error-msg').text('');
						$('.error-msg').removeClass('show');

						if (this.httpStatus && !this.networkError) {
							if (this.httpStatus === 200 && this.isLogined) {
								this.$router.push(this.$i18n.path(''));
							} else if (this.httpStatus === 422) {
								if (this.loginErrorMsg.login) {
									$('.error-password').text(this.loginErrorMsg.login);
									$('.error-password').addClass('show');
								}
								if (this.loginErrorMsg.username) {
									$('.error-username').text(this.loginErrorMsg.username);
									$('.error-username').addClass('show');
								}
								if (this.loginErrorMsg.password) {
									$('.error-password').text(this.loginErrorMsg.password);
									$('.error-password').addClass('show');
								}
							} else {
								$('.error-password').text(this.loginErrorMsg.others);
								$('.error-password').addClass('show');
							}
						} else {
							$('.error-password').text(this.$t('common.network_error'));
							$('.error-password').addClass('show');
						}
					});
			},
		},
	};
</script>
<style lang="scss" scoped>
	.login-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: calc(100vh - 53px);
		width: 100%;
		font-family: $font-family;
		color: $color-gray;
		background: $color-black;

		.login-container {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 454px;
			padding: 10px 20px 0 20px;

			.btn-close {
				position: absolute;
				right: 17px;
				top: 15px;
				font-size: 26px;
			}

			> h2 {
				width: 100%;
				font-size: 20px;
				font-weight: bold;

				text-align: center;
				border-bottom: 1px solid $color-gray;
				padding-bottom: 10px;
				margin: 35px 0 30px 0;
			}

			> p {
				font-size: 14px;
				text-align: center;

				&.msg2 {
					margin: 5px 0 25px 0;
				}
			}

			.input-wrapper {
				position: relative;
				display: flex;
				justify-content: center;
				width: 100%;
				background: $color-white;
				border-radius: 5px;
				margin-bottom: 25px;

				> img {
					width: 30px;
					height: 30px;
					align-self: center;
					margin-left: 9px;
				}

				> input {
					flex: 1;
					height: 40px;
					font-size: 16px;
					border-radius: 5px;
					background: $color-white;
					padding-top: 3px;
					margin-left: 10px;
					padding-right: 40px;
				}

				.eye-icon {
					position: absolute;
					top: 13px;
					right: 10px;
					width: auto;
					height: 16px;
					margin-left: 0;
				}
			}

			.error-msg {
				width: 100%;
				line-height: 20px;
				font-size: 13px;
				color: $color-red;
				font-weight: bold;
				text-align: center;
				margin: 0 0 6px 0;

				&.show {
					margin: -25px 0 11px 0;
				}
			}

			.forgot-psw {
				font-size: 14px;
				font-weight: bold;
				align-self: flex-end;
			}

			.prompt-wrapper {
				position: absolute;
				z-index: 10;
				top: 345px;
				right: 20px;
				width: 170px;
				color: $color-black;
				border-radius: 10px;
				box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.4);
				background: $color-white;
				padding: 10px;

				&::before {
					content: '';
					display: inline-block;
					position: absolute;
					top: -15px;
					right: 20px;
					border-left: 10px solid transparent;
					border-right: 10px solid transparent;
					border-bottom: 15px solid $color-white;
				}

				.prompt-title {
					width: 100%;
					font-size: 16px;
					font-weight: bold;
					text-align: center;
					margin-bottom: 10px;
				}

				.prompt-msg {
					width: 100%;
					font-size: 12px;
					line-height: 18px;
				}

				&.show {
					display: block;
				}
			}

			> button {
				width: 100%;
				height: 45px;
				font-size: 17px;
				font-weight: bold;
				border: $border-style;
				background: $color-yellow-linear-unpress;
				border-radius: 5px;
				margin: 50px 0 30px 0;

				&:active {
					background: $color-yellow-linear;
				}
			}

			.remind-msg {
				width: 100%;
				margin-bottom: 20px;

				> a {
					display: inline-block;
					font-weight: bold;
					color: $color-yellow;
					margin-top: -3px;
				}
			}
		}
	}
</style>