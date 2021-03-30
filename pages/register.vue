<template>
	<main class="register-wrapper">
		<div class="register-container">
			<fa :icon="['fas', 'times']" class="register-close" @click="$router.push({ path: $i18n.path('') })" />

			<h2>{{ $t('register.registration') }}</h2>

			<div class="input-wrapper">
				<!-- Username -->
				<div class="input-container">
					<img src="/images/username_img.png" :alt="$t('common.username')" />
					<input
						id="inputUsername"
						type="text"
						:placeholder="$t('common.username')"
						minlength="6"
						maxlength="10"
						v-model="myUsername"
					/>
				</div>
				<div class="error-msg error-username"></div>

				<!-- Password -->
				<div class="input-container">
					<img src="/images/password_img.png" :alt="$t('common.password')" />
					<input
						id="inputPassword"
						type="password"
						:placeholder="$t('common.password')"
						minlength="6"
						maxlength="12"
						v-model="myPassword"
					/>
					<img class="eye-icon" :src="passwordEyes" @click="showPassword()" />
				</div>
				<div class="error-msg error-psw"></div>

				<!-- Confirm Password -->
				<div class="input-container">
					<img src="/images/password_img.png" :alt="$t('register.confirm_psw')" />
					<input
						id="inputConfirmPSW"
						type="password"
						:placeholder="$t('register.confirm_psw')"
						minlength="6"
						maxlength="12"
						v-model="myConfirmPassword"
					/>
					<img class="eye-icon" :src="confirmPasswordEyes" @click="showConfirmPassword()" />
				</div>
				<div class="error-msg error-confirm-psw"></div>

				<!-- Full Name -->
				<div class="input-container">
					<img class="fullname-img" src="/images/fullname_img.png" :alt="$t('common.fullname')" />
					<input id="inputFullname" type="text" :placeholder="$t('common.fullname')" v-model="myFullname" />
				</div>
				<div class="error-msg error-fullname"></div>

				<!-- Mobile Number -->
				<div class="input-container">
					<img class="mobile-img" src="/images/mobile_img.png" :alt="$t('register.mobile_number')" />
					<span>66</span>
					<input id="inputMobile" type="number" :placeholder="$t('register.mobile_number')" v-model="myMobile" />
				</div>
				<div class="error-msg error-mobile"></div>

				<!-- Line ID -->
				<div class="input-container">
					<img class="line-img" src="/images/line_img.png" alt="LINE ID" />
					<input id="inputLine" type="text" placeholder="LINE ID" v-model="myLineID" />
				</div>
			</div>

			<!-- Remind Message -->
			<p>
				{{ $t('register.register_msg1_1') }}
				<nuxt-link :to="$i18n.path('articles/terms-of-use')">{{ $t('register.terms_of_use') }}</nuxt-link>
				{{ $t('register.register_msg1_2') }}
			</p>

			<!-- Register Button -->
			<button type="submit" @click="register()">{{ $t('common.register') }}</button>

			<!-- Remind Message -->
			<p class="remind-msg2">
				{{ $t('register.register_msg2') }}
				<nuxt-link class="remind-login" :to="$i18n.path('login')">{{ $t('common.login') }}</nuxt-link>
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
				isRegister: 'GetIsRegister',
				isExisted: 'GetIsExisted',
				httpStatus: 'GetHttpStatus',
				regErrorMsg: 'GetRegErrorMsg',
				networkError: 'GetNetworkError',
			}),
		},
		data() {
			return {
				myUsername: null,
				myPassword: null,
				myConfirmPassword: null,
				myFullname: null,
				myMobile: null,
				myLineID: null,
				passwordEyes: '/images/close_eye.png',
				confirmPasswordEyes: '/images/close_eye.png',
				expandBanksList: false,
				registerFail: false,
			};
		},
		mounted() {
			// Change CSS When "Input" Occurs With "keyup" Event
			$('.input-container > input').keyup((el) => {
				let elTarget = el.target;
				let elementID = elTarget.id;
				let errorEl = null;

				// If Is Not "Line ID" input, Get The input's Error Message Element Class Name
				if (elementID !== 'inputLine') {
					errorEl = $(elTarget.parentNode).next();
				}

				let inputValue = $(elTarget).val(); // Get input Value
				let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?
				$(elTarget).removeClass('is-valid is-invalid');
				$(errorEl).removeClass('is-valid is-invalid');

				if (inputOK !== -1) {
					$(errorEl).text(this.$t('register.special_symbols'));
					$(errorEl).addClass('is-invalid');
					$(elTarget).addClass('is-invalid');
				} else {
					// Username
					if (elementID === 'inputUsername') {
						if ((inputValue.length > 0 && inputValue.length < 6) || inputValue.length > 10) {
							$(errorEl).text(this.$t('register.username_error1'));
							$(errorEl).addClass('is-invalid');
							$(elTarget).addClass('is-invalid');
						}
					}

					// Password
					if (elementID === 'inputPassword') {
						if ((inputValue.length < 6 && inputValue.length > 0) || inputValue.length > 12) {
							$(errorEl).text(this.$t('register.password_error'));
							$(errorEl).addClass('is-invalid');
							$(elTarget).addClass('is-invalid');
						}

						let confirmInput = $('#inputConfirmPSW').val();
						if (confirmInput.length > 0) {
							if (confirmInput === inputValue) {
								$('.error-confirm-psw').text(this.$t('register.confirm_psw_ok'));
								$('#inputConfirmPSW, .error-confirm-psw').removeClass('is-invalid');
								$('#inputConfirmPSW, .error-confirm-psw').addClass('is-valid');
							} else if (confirmInput !== inputValue) {
								$('.error-confirm-psw').text(this.$t('register.confirm_psw_error'));
								$('#inputConfirmPSW, .error-confirm-psw').removeClass('is-valid');
								$('#inputConfirmPSW, .error-confirm-psw').addClass('is-invalid');
							}
						} else {
							$('#inputConfirmPSW, .error-confirm-psw').removeClass('is-invalid is-valid');
						}
					}

					// Confirm Password
					if (elementID === 'inputConfirmPSW') {
						let passwordInput = $('#inputPassword').val();
						if (inputValue.length > 0) {
							if (inputValue === passwordInput) {
								$(errorEl).text(this.$t('register.confirm_psw_ok'));
								$(errorEl).removeClass('is-invalid');
								$(errorEl).addClass('is-valid');
								$(elTarget).removeClass('is-invalid');
								$(elTarget).addClass('is-valid');
							} else if (inputValue !== passwordInput) {
								$(errorEl).text(this.$t('register.confirm_psw_error'));
								$(errorEl).removeClass('is-valid');
								$(errorEl).addClass('is-invalid');
								$(elTarget).removeClass('is-valid');
								$(elTarget).addClass('is-invalid');
							}
						}
					}

					// Mobile
					if (elementID === 'inputMobile') {
						if ((inputValue.length < 9 && inputValue.length > 0) || inputValue.length > 10) {
							$(errorEl).text(this.$t('register.mobile_error1'));
							$(errorEl).addClass('is-invalid');
							$(elTarget).addClass('is-invalid');
						}
					}
				}
			});

			// Change CSS When "Input" Occurs With "keyup" Event
			$('.input-container > input').blur((el) => {
				let elTarget = el.target;
				let elementID = elTarget.id;
				let errorEl = null;

				// If Is Not "Line ID" input, Get The input's Error Message Element Class Name
				if (elementID !== 'inputLine') {
					errorEl = $(elTarget.parentNode).next();
				}

				let inputValue = $(elTarget).val(); // Get input Value
				let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?
				if (inputOK != -1) {
					this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.special_symbols'));
				} else if (inputValue.length <= 0) {
					$(errorEl).removeClass('is-valid is-invalid');
					$(elTarget).removeClass('is-valid is-invalid');
				} else {
					// Username
					if (elementID === 'inputUsername') {
						if (inputValue.length >= 6 && inputValue.length <= 10) {
							this.checkUsername(elTarget, errorEl);
						} else {
							this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.username_error1'));
						}
					}

					// Password
					if (elementID === 'inputPassword') {
						if (inputValue.length >= 6 && inputValue.length <= 12) {
							this.modifyStatus(elTarget, errorEl, 'Correct', this.$t('register.password_ok'));
						} else {
							this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.password_error'));
						}

						let confirmInput = $('#inputConfirmPSW').val();
						if (confirmInput.length > 0) {
							if (confirmInput === inputValue) {
								$('.error-confirm-psw').text(this.$t('register.confirm_psw_ok'));
								$('#inputConfirmPSW, .error-confirm-psw').removeClass('is-invalid');
								$('#inputConfirmPSW, .error-confirm-psw').addClass('is-valid');
							} else if (confirmInput !== inputValue) {
								$('.error-confirm-psw').text(this.$t('register.confirm_psw_error'));
								$('#inputConfirmPSW, .error-confirm-psw').removeClass('is-valid');
								$('#inputConfirmPSW, .error-confirm-psw').addClass('is-invalid');
							}
						}
					}

					// Confirm Password
					if (elementID === 'inputConfirmPSW') {
						let passwordInput = $('#inputPassword').val();
						if (inputValue.length > 0) {
							if (inputValue === passwordInput) {
								this.modifyStatus(elTarget, errorEl, 'Correct', this.$t('register.confirm_psw_ok'));
							} else if (inputValue !== passwordInput) {
								this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.confirm_psw_error'));
							}
						}
					}

					// Fullname
					if (elementID === 'inputFullname') {
						if (inputValue.length > 0) {
							this.modifyStatus(elTarget, errorEl, 'Correct', this.$t('register.fullname_ok'));
						}
					}

					// Mobile
					if (elementID === 'inputMobile') {
						if (inputValue.length >= 9 && inputValue.length <= 10) {
							if (inputValue.indexOf(0) !== -1) {
								this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.mobile_error3'));
							} else {
								this.checkMobile(elTarget, errorEl);
							}
						} else {
							this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.mobile_error1'));
						}
					}

					// Line ID
					if (elementID === 'inputLine') {
						$(elTarget).addClass('is-valid');
					}
				}
			});
		},
		methods: {
			// Check Username Had Be Used
			checkUsername(elTarget, errorEl) {
				this.$store.dispatch('auth/checkUsername', this.myUsername).then(() => {
					if (typeof this.isRegister === 'boolean' && !this.isRegister) {
						this.modifyStatus(elTarget, errorEl, 'Correct', this.$t('register.username_ok'));
					} else if (typeof this.isRegister === 'boolean' && this.isRegister) {
						this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.username_error2'));
					} else {
						this.modifyStatus(elTarget, errorEl, 'Error', this.$t('common.network_error'));
					}
				});
			},

			// Check Mobile Had Be Used
			checkMobile(elTarget, errorEl) {
				this.$store.dispatch('auth/checkMobile', `66${this.myMobile}`).then(() => {
					if (typeof this.isExisted === 'boolean' && !this.isExisted) {
						this.modifyStatus(elTarget, errorEl, 'Correct', this.$t('register.mobile_ok'));
					} else if (typeof this.isExisted === 'boolean' && this.isExisted) {
						this.modifyStatus(elTarget, errorEl, 'Error', this.$t('register.mobile_error2'));
					} else {
						this.modifyStatus(elTarget, errorEl, 'Error', this.$t('common.network_error'));
					}
				});
			},

			// Show Message & Modify Class Name
			modifyStatus(elTarget, errorEl, type, msg) {
				$(errorEl).text(msg);

				if (type === 'Correct') {
					$(errorEl).removeClass('is-invalid');
					$(errorEl).addClass('is-valid');
					$(elTarget).removeClass('is-invalid');
					$(elTarget).addClass('is-valid');
				} else if (type === 'Error') {
					$(errorEl).removeClass('is-valid');
					$(errorEl).addClass('is-invalid');
					$(elTarget).removeClass('is-valid');
					$(elTarget).addClass('is-invalid');
				}
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

			// Show or Hidden Confirm Password
			showConfirmPassword() {
				let pswInputType = $('#inputConfirmPSW').attr('type');
				if (pswInputType === 'password') {
					this.confirmPasswordEyes = '/images/open_eye.png';
					$('#inputConfirmPSW').attr('type', 'text');
				} else if (pswInputType === 'text') {
					this.confirmPasswordEyes = '/images/close_eye.png';
					$('#inputConfirmPSW').attr('type', 'password');
				}
			},

			// Register
			register() {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('auth/register', {
						username: this.myUsername,
						password: this.myPassword,
						password_confirmation: this.myConfirmPassword,
						fullname: this.myFullname,
						mobile: this.myMobile,
						line: this.myLineID,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();

						$('.input-container > input, .error-msg').removeClass('is-valid is-invalid');

						if (this.httpStatus && !this.networkError) {
							if (this.httpStatus === 200 && this.isLogined) {
								this.$router.push(this.$i18n.path(''));
							} else {
								this.showErrorMessage(this.httpStatus);
							}
						} else {
							$('.error-username').text(this.$t('common.network_error'));
							$('#inputUsername, .error-username').addClass('is-invalid');
						}
					});
			},

			// Sort And Display Error Messages
			showErrorMessage(status) {
				if (status === 422) {
					if (this.regErrorMsg.username) {
						$('.error-username').text(this.regErrorMsg.username);
						$('#inputUsername, .error-username').addClass('is-invalid');
					}

					if (this.regErrorMsg.password) {
						$('.error-psw').text(this.regErrorMsg.password);
						$('#inputPassword, .error-psw').addClass('is-invalid');
					}

					if (this.regErrorMsg.confirm_psw) {
						$('.error-confirm-psw').text(this.regErrorMsg.confirm_psw);
						$('#inputConfirmPSW, .error-confirm-psw').addClass('is-invalid');
					}

					if (this.regErrorMsg.fullname) {
						$('.error-fullname').text(this.regErrorMsg.fullname);
						$('#inputFullname, .error-fullname').addClass('is-invalid');
					}

					if (this.regErrorMsg.mobile) {
						$('.error-mobile').text(this.regErrorMsg.mobile);
						$('#inputMobile, .error-mobile').addClass('is-invalid');
					}
				} else {
					if (this.regErrorMsg.others) {
						$('.error-username').text(this.regErrorMsg.others);
						$('#inputUsername, .error-username').addClass('is-invalid');
					}
				}
			},
		},
	};
</script>
<style lang="scss">
	.register-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: calc(100vh - 53px);
		width: 100%;
		color: $color-gray;
		font-family: $font-family;
		background: $color-black;

		.register-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 454px;
			padding: 0 20px;

			.register-close {
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
				margin-top: 45px;
			}

			.input-wrapper {
				margin-left: -5px;

				.input-container {
					position: relative;
					display: flex;
					background: $color-white;
					border-radius: 6px;
					margin: 20px 0 0 15px;

					&::before {
						content: '*';
						position: absolute;
						top: 20px;
						left: -18px;
						font-size: 30px;
						font-family: 'Catamaran', $font-family;
						color: #b01015;
					}

					&:last-child::before {
						content: '';
					}

					> img {
						position: absolute;
						align-self: center;
						top: 8.3px;
						left: 9px;
						width: 26px;
						height: 26px;
					}

					> span {
						position: absolute;
						left: 40px;
						top: auto;
						display: flex;
						align-items: center;
						height: 100%;
						font-size: 16px;
						color: #000000;
						font-family: sans-serif;
						padding: 0 10px 0 5px;
						border-right: 1px solid rgba(0, 0, 0, 0.4);
					}

					> input {
						width: 100%;
						height: 43px;
						font-family: $font-family;
						font-size: 16px;
						line-height: normal;
						background: $color-white;
						border: 1.5px solid $color-black;
						border-radius: 6px;
						padding-left: 44px;

						&#inputMobile {
							padding-left: 80px;
						}

						&:focus {
							border: 1.5px solid #fead07;
						}

						&.is-valid {
							border: 1.5px solid #63c203;
						}

						&.is-invalid {
							border: 1.5px solid #e60909;
						}
					}

					.eye-icon {
						position: absolute;
						top: 15px;
						left: auto;
						right: 10px;
						width: auto;
						height: 13px;
					}
				}

				.error-msg {
					display: none;
					width: 100%;
					font-size: 12px;
					text-align: center;
					padding: 0 20px;
					margin-bottom: -18px;

					&.is-valid {
						display: block;
						color: #63c203;
					}

					&.is-invalid {
						display: block;
						color: #e60909;
					}
				}
			}

			> p {
				width: 100%;
				font-size: 13px;
				text-align: center;
				margin-top: 15px;

				> a {
					font-weight: bold;
					color: $color-yellow;
				}

				&.remind-msg2 {
					margin-bottom: 20px;

					.remind-login {
						display: inline-block;
						color: $color-yellow;
					}
				}
			}

			> button {
				width: 100%;
				min-height: 45px;
				font-size: 17px;
				font-weight: bold;
				border: $border-style;
				background: $color-yellow-linear-unpress;
				border-radius: 5px;
				margin: 20px 0 20px 0;

				&:active {
					background: $color-yellow-linear;
				}
			}
		}
	}
</style>