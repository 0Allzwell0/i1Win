<template>
    <main class="register-wrapper">
        <section class="register-container">
            <fa :icon="['fas', 'times']" class="register-close" @click="$router.push({path: $i18n.path('')})" />

            <h2 class="register-title">{{ $t('register.registration') }}</h2>

            <div class="register-input-wrapper">
                <!-- Username -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/username_image.png" />
                    <input
                        class="register-input-text"
                        id="input-username"
                        type="text"
                        :placeholder="$t('common.username')"
                        minlength="6"
                        maxlength="10"
                        v-model="myUsername"
                    />
                </div>
                <ul class="error-msg" id="error-username">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.username" :key="`usn-${index}`">{{ item }}</li>
                </ul>

                <!-- Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text"
                        id="input-password"
                        type="password"
                        :placeholder="$t('common.password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myPassword"
                    />
                    <img class="register-eye-icon" :src="passwordEyes" @click="showPassword()" />
                </div>
                <ul class="error-msg" id="error-password">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.password" :key="`psw-${index}`">{{ item }}</li>
                </ul>

                <!-- Confirm Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text"
                        id="input-confirm-psw"
                        type="password"
                        :placeholder="$t('register.confirm_password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myConfirmPassword"
                    />
                    <img class="register-eye-icon" :src="confirmPasswordEyes" @click="showConfirmPassword()" />
                </div>
                <ul class="error-msg" id="error-confirm-psw">
                    <li class="msg-text"></li>
                    <li
                        class="response-msg"
                        v-for="(item, index) in regErrorMsg.password_confirmation"
                        :key="`confirm-psw-${index}`"
                    >{{ item }}</li>
                </ul>

                <!-- Full Name -->
                <div class="register-input-container">
                    <img class="register-input-img fullname-img" src="/images/fullname_image.png" />
                    <input
                        class="register-input-text"
                        id="input-fullname"
                        type="text"
                        :placeholder="$t('common.fullname')"
                        v-model="myFullname"
                    />
                </div>
                <ul class="error-msg" id="error-fullname">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.fullname" :key="`fullname-${index}`">{{ item }}</li>
                </ul>

                <!-- Mobile Number -->
                <div class="register-input-container">
                    <img class="register-input-img mobile-img" src="/images/mobile_image.png" />
                    <input
                        class="register-input-text"
                        id="input-mobile"
                        type="number"
                        :placeholder="$t('register.mobile_number')"
                        v-model="myMobile"
                    />
                </div>
                <ul class="error-msg" id="error-mobile">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.mobile" :key="`mobile-${index}`">{{ item }}</li>
                </ul>

                <!-- Line ID -->
                <div class="register-input-container">
                    <img class="register-input-img line-img" src="/images/line_image.png" />
                    <input class="register-input-text" id="input-line" type="text" placeholder="LINE ID" v-model="myLineID" />
                </div>
            </div>

            <!-- Remind Message -->
            <p class="register-remind-message1">
                {{ $t('register.register_msg1_1') }}
                <nuxt-link class="register-remind-terms" :to="$i18n.path('articles/terms-of-use')">{{ $t('register.terms_of_use') }}</nuxt-link>
                {{ $t('register.register_msg1_2') }}
            </p>

            <!-- Register Button -->
            <button class="register-button" type="submit" @click="register()">{{ $t('common.register') }}</button>

            <!-- Remind Message -->
            <p class="register-remind-message2">
                {{ $t('register.register_msg2') }}
                <nuxt-link class="register-remind-login" :to="$i18n.path('login')">{{ $t('common.login') }}</nuxt-link>
            </p>
        </section>
    </main>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
				isUsed: 'GetIsUsed',
				httpStatus: 'GetHttpStatus',
				regErrorMsg: 'GetRegErrorMsg'
			})
		},
		data() {
			return {
				myUsername: null,
				myPassword: null,
				myConfirmPassword: null,
				myFullname: null,
				myMobile: null,
				myLineID: null,
				usernameError: false,
				passwordError: false,
				confirmPSWError: false,
				fullnameError: false,
				mobileError: false,
				othersError: false,
				passwordEyes: '/images/close_eye.png',
				confirmPasswordEyes: '/images/close_eye.png',
				expandBanksList: false,
				registerFail: false
			};
		},
		mounted() {
			_this = this;

			// Change CSS When "Input" Occurs With "keyup" Event
			$('.register-input-text').keyup(el => {
				let elTarget = el.target;
				let elementID = elTarget.id;
				let errorEl = null;
				let errElementID = null;

				// If Is Not "Line ID" input, Get The input's Error Message Element Class Name
				if (elementID !== 'input-line') {
					errorEl = $(elTarget.parentNode).next();
					errElementID = errorEl[0].id;
				}

				let inputValue = $(elTarget).val(); // Get input Value
				let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?

				$(elTarget).removeClass('is-valid is-invalid');
				$(errorEl).removeClass('is-valid is-invalid');
				$(`#${errElementID} .response-msg`).hide();

				if (inputOK !== -1) {
					$(`#${errElementID} .msg-text`).text(this.$t('register.special_symbols'));
					$(elTarget).addClass('is-invalid');
					$(errorEl).addClass('is-invalid');
				} else {
					// Username
					if (elementID === 'input-username') {
						if ((inputValue.length > 0 && inputValue.length < 6) || inputValue.length > 10) {
							$(`#${errElementID} .msg-text`).text(this.$t('register.username_error1'));
							$(elTarget).addClass('is-invalid');
							$(errorEl).addClass('is-invalid');
						}
					}

					// Password
					if (elementID === 'input-password') {
						if ((inputValue.length < 6 && inputValue.length > 0) || inputValue.length > 12) {
							$(`#${errElementID} .msg-text`).text(this.$t('register.password_error'));
							$(elTarget).addClass('is-invalid');
							$(errorEl).addClass('is-invalid');
						}

						let confirmInput = $('#input-confirm-psw').val();

						if (confirmInput.length > 0) {
							if (confirmInput === inputValue) {
								$('#error-confirm-psw .msg-text').text(this.$t('register.confirm_psw_ok'));
								$('#input-confirm-psw, #error-confirm-psw').removeClass('is-invalid');
								$('#input-confirm-psw, #error-confirm-psw').addClass('is-valid');
							} else if (confirmInput !== inputValue) {
								$('#error-confirm-psw .msg-text').text(this.$t('register.confirm_psw_error'));
								$('#input-confirm-psw, #error-confirm-psw').removeClass('is-valid');
								$('#input-confirm-psw, #error-confirm-psw').addClass('is-invalid');
							}
						} else {
							$('#input-confirm-psw, #error-confirm-psw').removeClass('is-invalid is-valid');
						}
					}

					// Confirm Password
					if (elementID === 'input-confirm-psw') {
						let passwordInput = $('#input-password').val();

						if (inputValue.length > 0) {
							if (inputValue === passwordInput) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_ok'));
								$(elTarget).removeClass('is-invalid');
								$(elTarget).addClass('is-valid');
								$(errorEl).removeClass('is-invalid');
								$(errorEl).addClass('is-valid');
							} else if (inputValue !== passwordInput) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_error'));
								$(elTarget).removeClass('is-valid');
								$(elTarget).addClass('is-invalid');
								$(errorEl).removeClass('is-valid');
								$(errorEl).addClass('is-invalid');
							}
						}
					}

					// Fullname
					if (elementID === 'input-fullname') {
					}

					// Mobile
					if (elementID === 'input-mobile') {
						if ((inputValue.length < 9 && inputValue.length > 0) || inputValue.length > 10) {
							$(`#${errElementID} .msg-text`).text(this.$t('register.mobile_error1'));
							$(elTarget).addClass('is-invalid');
							$(errorEl).addClass('is-invalid');
						}
					}
				}
			});

			// Change CSS When "Input" Occurs With "keyup" Event
			$('.register-input-text').blur(el => {
				let elTarget = el.target;
				let elementID = elTarget.id;
				let errorEl = null;
				let errElementID = null;

				// If Is Not "Line ID" input, Get The input's Error Message Element Class Name
				if (elementID !== 'input-line') {
					errorEl = $(elTarget.parentNode).next();
					errElementID = errorEl[0].id;
				}

				let inputValue = $(elTarget).val(); // Get input Value
				let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?

				if ((inputOK = !-1)) {
					$(errorEl).html(`<li class="msg-text">${this.$t('register.special_symbols')}</li>`);
					$(elTarget).addClass('is-invalid');
					$(errorEl).addClass('is-invalid');
				} else if (inputValue.length <= 0) {
					$(elTarget).removeClass('is-valid is-invalid');
					$(errorEl).removeClass('is-valid is-invalid');
				} else {
					// Username
					if (elementID === 'input-username') {
						if (inputValue.length >= 6 && inputValue.length <= 10) {
							this.checkUsername(elTarget, errElementID);
						} else {
							$(`#${errElementID} .msg-text`).text(this.$t('register.username_error1'));
							$(elTarget).removeClass('is-valid');
							$(elTarget).addClass('is-invalid');
							$(errorEl).removeClass('is-valid');
							$(errorEl).addClass('is-invalid');
						}
					}

					// Password
					if (elementID === 'input-password') {
						if (inputValue.length >= 6 && inputValue.length <= 12) {
							$(`#${errElementID} .msg-text`).text(this.$t('register.password_ok'));
							$(elTarget).removeClass('is-invalid');
							$(elTarget).addClass('is-valid');
							$(errorEl).removeClass('is-invalid');
							$(errorEl).addClass('is-valid');
						} else {
							$(`#${errElementID} .msg-text`).text(this.$t('register.password_error'));
							$(elTarget).removeClass('is-valid');
							$(elTarget).addClass('is-invalid');
							$(errorEl).removeClass('is-valid');
							$(errorEl).addClass('is-invalid');
						}

						let confirmInput = $('#input-confirm-psw').val();

						if (confirmInput.length > 0) {
							if (confirmInput === inputValue) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_ok'));
								$('#input-confirm-psw, #error-confirm-psw').removeClass('is-invalid');
								$('#input-confirm-psw, #error-confirm-psw').addClass('is-valid');
							} else if (confirmInput !== inputValue) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_error'));
								$('#input-confirm-psw, #error-confirm-psw').removeClass('is-valid');
								$('#input-confirm-psw, #error-confirm-psw').addClass('is-invalid');
							}
						}
					}

					// Confirm Password
					if (elementID === 'input-confirm-psw') {
						let passwordInput = $('#input-password').val();

						if (inputValue.length > 0) {
							if (inputValue === passwordInput) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_ok'));
								$(elTarget).removeClass('is-invalid');
								$(elTarget).addClass('is-valid');
								$(errorEl).removeClass('is-invalid');
								$(errorEl).addClass('is-valid');
							} else if (inputValue !== passwordInput) {
								$(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_error'));
								$(elTarget).removeClass('is-valid');
								$(elTarget).addClass('is-invalid');
								$(errorEl).removeClass('is-valid');
								$(errorEl).addClass('is-invalid');
							}
						}
					}

					// Fullname
					if (elementID === 'input-fullname') {
						if (inputValue.length > 0) {
							$(`#${errElementID} .msg-text`).text(this.$t('register.fullname_ok'));
							$(elTarget).removeClass('is-invalid');
							$(elTarget).addClass('is-valid');
							$(errorEl).removeClass('is-invalid');
							$(errorEl).addClass('is-valid');
						}
					}

					// Mobile
					if (elementID === 'input-mobile') {
						if (inputValue.length >= 9 && inputValue.length <= 10) {
							this.checkMobile(elTarget, errElementID);
						} else {
							$(`#${errElementID} .msg-text`).text(this.$t('register.mobile_error1'));
							$(elTarget).removeClass('is-valid');
							$(elTarget).addClass('is-invalid');
							$(errorEl).removeClass('is-valid');
							$(errorEl).addClass('is-invalid');
						}
					}

					// Line ID
					if (elementID === 'input-line') {
						$(elTarget).addClass('is-valid');
					}
				}
			});
		},
		methods: {
			// Check Username Had Be Used
			checkUsername(elTarget, errElementID) {
				this.$store.dispatch('auth/checkUsername', this.myUsername).then(() => {
					if (this.isUsed) {
						$(`#${errElementID} .msg-text`).text(this.$t('register.username_error2'));
						$(elTarget).removeClass('is-valid');
						$(elTarget).addClass('is-invalid');
						$(`#${errElementID}`).removeClass('is-valid');
						$(`#${errElementID}`).addClass('is-invalid');
					} else {
						$(`#${errElementID} .msg-text`).text(this.$t('register.username_ok'));
						$(elTarget).removeClass('is-invalid');
						$(elTarget).addClass('is-valid');
						$(`#${errElementID}`).removeClass('is-invalid');
						$(`#${errElementID}`).addClass('is-valid');
					}
				});
			},

			// Check Mobile Had Be Used
			checkMobile(elTarget, errElementID) {
				this.$store.dispatch('auth/checkMobile', this.myMobile).then(() => {
					if (this.isUsed) {
						$(`#${errElementID} .msg-text`).text(this.$t('register.mobile_ok'));
						$(elTarget).removeClass('is-invalid');
						$(elTarget).addClass('is-valid');
						$(`#${errElementID}`).removeClass('is-invalid');
						$(`#${errElementID}`).addClass('is-valid');
					} else {
						$(`#${errElementID} .msg-text`).text(this.$t('register.mobile_error2'));
						$(elTarget).removeClass('is-valid');
						$(elTarget).addClass('is-invalid');
						$(`#${errElementID}`).removeClass('is-valid');
						$(`#${errElementID}`).addClass('is-invalid');
					}
				});
			},

			// Show or Hidden Password
			showPassword() {
				let pswInputType = $('#input-password').attr('type');
				if (pswInputType === 'password') {
					this.passwordEyes = '/images/open_eye.png';
					$('#input-password').attr('type', 'text');
				} else if (pswInputType === 'text') {
					this.passwordEyes = '/images/close_eye.png';
					$('#input-password').attr('type', 'password');
				}
			},

			// Show or Hidden Confirm Password
			showConfirmPassword() {
				let pswInputType = $('#input-confirm-psw').attr('type');
				if (pswInputType === 'password') {
					this.confirmPasswordEyes = '/images/open_eye.png';
					$('#input-confirm-psw').attr('type', 'text');
				} else if (pswInputType === 'text') {
					this.confirmPasswordEyes = '/images/close_eye.png';
					$('#input-confirm-psw').attr('type', 'password');
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
						mobile: this.myMobile
					})
					.then(() => {
						// If Register Success, Go To "Home" Page.
						if (this.isLogined) {
							this.$router.push(this.$i18n.path(''));
						}

						// If Register Fail, Show Error Message
						if (this.httpStatus && this.httpStatus !== 200) {
							this.$nuxt.$loading.finish();
							this.showErrorMessage(this.httpStatus);
						} else {
							this.usernameError = false;
							this.passwordError = false;
							this.confirmPSWError = false;
							this.fullnameError = false;
							this.mobileError = false;
						}
					});
			},

			// Sort And Display Error Messages
			showErrorMessage(status) {
				$('#error-username .response-msg').show();
				if (status === 422) {
					if (this.regErrorMsg.username) {
						this.usernameError = true;
						$('#error-username .msg-text').text(this.regErrorMsg.username);
						$('#input-username, #error-username').removeClass('is-valid');
						$('#input-username, #error-username').addClass('is-invalid');
					} else {
						this.usernameError = false;
						$('#input-username, #error-username').removeClass('is-valid is-invalid');
					}

					if (this.regErrorMsg.password) {
						this.passwordError = true;
						$('#error-password .msg-text').text(this.regErrorMsg.password);
						$('#input-password, #error-password').removeClass('is-valid');
						$('#input-password, #error-password').addClass('is-invalid');
					} else {
						this.passwordError = false;
						$('#input-password, #error-password').removeClass('is-valid is-invalid');
					}

					if (this.regErrorMsg.password_confirmation) {
						this.confirmPSWError = true;
						$('#error-confirm-psw .msg-text').text(this.regErrorMsg.password_confirmation);
						$('#input-confirm-psw, #error-confirm-psw').removeClass('is-valid');
						$('#input-confirm-psw, #error-confirm-psw').addClass('is-invalid');
					} else {
						this.confirmPSWError = false;
						$('#input-confirm-psw, #error-confirm-psw').removeClass('is-valid is-invalid');
					}

					if (this.regErrorMsg.fullname) {
						this.fullnameError = true;
						$('#error-fullname .msg-text').text(this.regErrorMsg.fullname);
						$('#input-fullname, #error-fullname').removeClass('is-valid');
						$('#input-fullname, #error-fullname').addClass('is-invalid');
					} else {
						this.fullnameError = false;
						$('#input-fullname, #error-fullname').removeClass('is-valid is-invalid');
					}

					if (this.regErrorMsg.mobile) {
						this.mobileError = true;
						$('#error-mobile .msg-text').text(this.regErrorMsg.mobile);
						$('#input-mobile, #error-mobile').removeClass('is-valid');
						$('#input-mobile, #error-mobile').addClass('is-invalid');
					} else {
						this.mobileError = false;
						$('#input-mobile, #error-mobile').removeClass('is-valid is-invalid');
					}
				}
				if (status === 401) {
					this.othersError = true;
				} else {
					this.othersError = false;
				}
			}
		}
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

            .register-title {
                width: 100%;
                font-size: 20px;
                font-weight: bold;

                text-align: center;
                border-bottom: 1px solid $color-gray;
                padding-bottom: 10px;
                margin-top: 45px;
            }

            .register-input-wrapper {
                margin-left: -5px;

                .register-input-container {
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
                        color: $color-yellow;
                    }

                    &:last-child::before {
                        content: '';
                    }

                    .register-input-img {
                        position: absolute;
                        align-self: center;
                        top: 8.3px;
                        left: 9px;
                        width: 26px;
                        height: 26px;
                    }

                    .register-input-text {
                        width: 100%;
                        height: 43px;
                        font-family: $font-family;
                        font-size: 16px;
                        line-height: normal;
                        background: $color-white;
                        border: 1.5px solid $color-black;
                        border-radius: 6px;
                        padding-left: 44px;

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

                    .register-eye-icon {
                        position: absolute;
                        top: 15px;
                        right: 10px;
                        height: 16px;
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

            .register-remind-message1 {
                width: 100%;
                font-size: 13px;
                text-align: center;
                margin-top: 15px;

                .register-remind-terms {
                    font-weight: bold;
                    color: $color-yellow;
                }
            }

            .register-button {
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

            .register-remind-message2 {
                width: 100%;
                font-size: 13px;
                text-align: center;
                margin-bottom: 20px;

                .register-remind-login {
                    display: inline-block;
                    font-weight: bold;
                    color: $color-yellow;
                    margin-top: -2px;
                }
            }
        }
    }
</style>