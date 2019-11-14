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
                        class="register-input-text input-username"
                        type="text"
                        :placeholder="$t('common.username')"
                        minlength="6"
                        maxlength="10"
                        v-model="myUsername"
                    />
                </div>
                <p class="error-msg error-username"></p>

                <!-- Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text input-password"
                        type="password"
                        :placeholder="$t('common.password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myPassword"
                    />
                    <img class="register-eye-icon" :src="passwordEyes" @click="showPassword()" />
                </div>
                <p class="error-msg error-password"></p>

                <!-- Confirm Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text input-confirm-psw"
                        type="password"
                        :placeholder="$t('register.confirm_password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myConfirmPassword"
                    />
                    <img class="register-eye-icon" :src="confirmPasswordEyes" @click="showConfirmPassword()" />
                </div>
                <p class="error-msg error-confirm-psw"></p>

                <!-- Full Name -->
                <div class="register-input-container">
                    <img class="register-input-img fullname-img" src="/images/fullname_image.png" />
                    <input
                        class="register-input-text input-fullname"
                        type="text"
                        :placeholder="$t('common.fullname')"
                        v-model="myFullname"
                    />
                </div>
                <p class="error-msg error-fullname"></p>

                <!-- Mobile Number -->
                <div class="register-input-container">
                    <img class="register-input-img mobile-img" src="/images/mobile_image.png" />
                    <input
                        class="register-input-text input-mobile"
                        type="number"
                        :placeholder="$t('register.mobile_number')"
                        v-model="myMobile"
                    />
                </div>
                <p class="error-msg error-mobile"></p>

                <!-- Line ID -->
                <div class="register-input-container">
                    <img class="register-input-img line-img" src="/images/line_image.png" />
                    <input class="register-input-text input-line" type="text" placeholder="LINE ID" v-model="myLineID" />
                </div>
            </div>

            <!-- Remind Message -->
            <p class="register-remind-message1">
                {{ $t('register.register_msg1_1') }}
                <nuxt-link
                    class="register-remind-terms"
                    :to="$i18n.path('articles/terms-of-use')"
                >{{ $t('register.terms_of_use') }}</nuxt-link>
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
            failMessage: 'GetFailMessage'
        })
    },
    data() {
        return {
            myUsername: null,
            usernameOK: false,
            myPassword: null,
            passwordOK: false,
            myConfirmPassword: null,
            confirmOK: false,
            myFullname: null,
            fullnameOK: false,
            myMobile: null,
            mobileOK: false,
            myLineID: null,
            lineIDOK: false,
            passwordEyes: '/images/close_eye.png',
            confirmPasswordEyes: '/images/close_eye.png',
            expandBanksList: false,
            registerFail: false
        };
    },
    mounted() {
        // Change CSS When "Input" Occurs With "keyup" Event
        $('.register-input-text').keyup(el => {
            let elTarget = el.target;
            let elClassName = elTarget.className;
            let errorEl = null;
            let errElClassName = null;

            // If Is Not "Line ID" input, Get The input's Error Message Element Class Name
            if (elClassName.indexOf('line') === -1) {
                errorEl = $(elTarget.parentNode).next();
                errElClassName = errorEl[0].className;
            }

            let inputValue = $(elTarget).val(); // Get input Value
            let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?

            if ((inputOK = !-1)) {
                $(elTarget).addClass('is-invalid');
                $(errorEl).addClass('is-invalid');
                $(errorEl).text(this.$t(`register.special_symbols`));
            } else {
                // Username
                if (elClassName.indexOf('username') !== -1) {
                    if (inputValue.length >= 6 && inputValue.length <= 10) {
                        $(elTarget).removeClass('is-valid is-invalid');
                        $(errorEl).removeClass('is-valid is-invalid');
                    } else {
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                        $(errorEl).text(this.$t('register.username_error1'));
                    }
                }

                // Password
                if (elClassName.indexOf('password') !== -1) {
                    if (inputValue.length >= 6 && inputValue.length <= 12) {
                        $(elTarget).removeClass('is-valid is-invalid');
                        $(errorEl).removeClass('is-valid is-invalid');
                    } else {
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                        $(errorEl).text(this.$t('register.password_error'));
                    }

                    let confirmInput = $('.input-confirm-psw').val();

                    if (confirmInput.length > 0) {
                        if (confirmInput === inputValue) {
                            $('.input-confirm-psw, .error-confirm-psw')
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $('.error-confirm-psw').text(this.$t('register.confirm_psw_ok'));
                        } else if (confirmInput !== inputValue) {
                            $('.input-confirm-psw, .error-confirm-psw')
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $('.error-confirm-psw').text(this.$t('register.confirm_psw_error'));
                        }
                    } else {
                        $('.input-confirm-psw, .error-confirm-psw').removeClass('is-invalid is-valid');
                    }
                }

                // Confirm Password
                if (elClassName.indexOf('confirm-psw') !== -1) {
                    let passwordInput = $('.input-password').val();

                    if (inputValue.length > 0) {
                        if (inputValue === passwordInput) {
                            $(elTarget)
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $(errorEl)
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $(errorEl).text(this.$t('register.confirm_psw_ok'));
                        } else if (inputValue !== passwordInput) {
                            $(elTarget)
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $(errorEl)
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $(errorEl).text(this.$t('register.confirm_psw_error'));
                        }
                    }
                }

                // Fullname
                if (elClassName.indexOf('fullname') !== -1) {
                    if (inputValue.length > 0) {
                        $(elTarget).removeClass('is-valid is-invalid');
                        $(errorEl).removeClass('is-valid is-invalid');
                    }
                }

                // Mobile
                if (elClassName.indexOf('mobile') !== -1) {
                    if (inputValue.length >= 9 && inputValue.length <= 10) {
                        $(elTarget).removeClass('is-valid is-invalid');
                        $(errorEl).removeClass('is-valid is-invalid');
                    } else {
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                        $(errorEl).text(this.$t('register.mobile_error1'));
                    }
                }
            }
        });

        // Change CSS When "Input" Occurs With "keyup" Event
        $('.register-input-text').blur(el => {
            let elTarget = el.target;
            let elClassName = elTarget.className;
            let errorEl = null;
            let errElClassName = null;

            // If Is Not "Line ID" input, Get The input's Error Message Element Class Name
            if (elClassName.indexOf('line') === -1) {
                errorEl = $(elTarget.parentNode).next();
                errElClassName = errorEl[0].className;
            }

            let inputValue = $(elTarget).val(); // Get input Value
            let inputOK = inputValue.search(/[-~!@#$%^&*(){}_+*/`\[\];',.]/); // Determine Have Special Characters ?

            if ((inputOK = !-1)) {
                $(elTarget).addClass('is-invalid');
                $(errorEl).addClass('is-invalid');
                $(errorEl).text(this.$t(`register.special_symbols`));
            } else if (inputValue.length <= 0) {
                $(elTarget).removeClass('is-valid is-invalid');
                $(errorEl).removeClass('is-valid is-invalid');
            } else {
                // Username
                if (elClassName.indexOf('username') !== -1) {
                    if (inputValue.length >= 6 && inputValue.length <= 10) {
                        checkUsername(elTarget, errorEl);
                    } else {
                        $(elTarget)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl).text(this.$t('register.username_error1'));
                    }
                }

                // Password
                if (elClassName.indexOf('password') !== -1) {
                    if (inputValue.length >= 6 && inputValue.length <= 12) {
                        $(elTarget)
                            .removeClass('is-invalid')
                            .addClass('is-valid');
                        $(errorEl)
                            .removeClass('is-invalid')
                            .addClass('is-valid');
                        $(errorEl).text(this.$t('register.password_ok'));
                    } else {
                        $(elTarget)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl).text(this.$t('register.password_error'));
                    }

                    let confirmInput = $('.input-confirm-psw').val();

                    if (confirmInput.length > 0) {
                        if (confirmInput === inputValue) {
                            $('.input-confirm-psw, .error-confirm-psw')
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $('.error-confirm-psw').text(this.$t('register.confirm_psw_ok'));
                        } else if (confirmInput !== inputValue) {
                            $('.input-confirm-psw, .error-confirm-psw')
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $('.error-confirm-psw').text(this.$t('register.confirm_psw_error'));
                        }
                    }
                }

                // Confirm Password
                if (elClassName.indexOf('confirm-psw') !== -1) {
                    let passwordInput = $('.input-password').val();

                    if (inputValue.length > 0) {
                        if (inputValue === passwordInput) {
                            $(elTarget)
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $(errorEl)
                                .removeClass('is-invalid')
                                .addClass('is-valid');
                            $(errorEl).text(this.$t('register.confirm_psw_ok'));
                        } else if (inputValue !== passwordInput) {
                            $(elTarget)
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $(errorEl)
                                .removeClass('is-valid')
                                .addClass('is-invalid');
                            $(errorEl).text(this.$t('register.confirm_psw_error'));
                        }
                    }
                }

                // Fullname
                if (elClassName.indexOf('fullname') !== -1) {
                    if (inputValue.length > 0) {
                        $(elTarget)
                            .removeClass('is-invalid')
                            .addClass('is-valid');
                        $(errorEl)
                            .removeClass('is-invalid')
                            .addClass('is-valid');
                        $(errorEl).text(this.$t('register.fullname_ok'));
                    }
                }

                // Mobile
                if (elClassName.indexOf('mobile') !== -1) {
                    if (inputValue.length >= 9 && inputValue.length <= 10) {
                        checkMobile(elTarget, errorEl);
                    } else {
                        $(elTarget)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl)
                            .removeClass('is-valid')
                            .addClass('is-invalid');
                        $(errorEl).text(this.$t('register.mobile_error1'));
                    }
                }

                // Line ID
                if (elClassName.indexOf('line') !== -1) {
                    $(elTarget).addClass('is-valid');
                }
            }
        });
    },
    methods: {
        // Check Username Had Be Used
        checkUsername(elTarget, errorEl) {
            this.$store.dispatch('user/checkUsername', this.myUsername).then(function() {
                if (isUsed) {
                    $(elTarget)
                        .removeClass('is-invalid')
                        .addClass('is-valid');
                    $(errorEl)
                        .removeClass('is-invalid')
                        .addClass('is-valid');
                    $(errorEl).text(this.$t('register.username_ok'));
                } else {
                    $(elTarget)
                        .removeClass('is-valid')
                        .addClass('is-invalid');
                    $(errorEl)
                        .removeClass('is-valid')
                        .addClass('is-invalid');
                    $(errorEl).text(this.$t('register.username_error2'));
                }
            });
        },

        // Check Mobile Had Be Used
        checkMobile(elTarget, errorEl) {
            this.$store.dispatch('user/checkMobile', this.myMobile).then(function() {
                if (isUsed) {
                    $(elTarget)
                        .removeClass('is-invalid')
                        .addClass('is-valid');
                    $(errorEl)
                        .removeClass('is-invalid')
                        .addClass('is-valid');
                    $(errorEl).text(this.$t('register.mobile_ok'));
                } else {
                    $(elTarget)
                        .removeClass('is-valid')
                        .addClass('is-invalid');
                    $(errorEl)
                        .removeClass('is-valid')
                        .addClass('is-invalid');
                    $(errorEl).text(this.$t('register.mobile_error2'));
                }
            });
        },

        // Show or Hidden Password
        showPassword() {
            let pswInputType = $('.input-password').attr('type');
            if (pswInputType === 'password') {
                this.passwordEyes = '/images/open_eye.png';
                $('.input-password').attr('type', 'text');
            } else if (pswInputType === 'text') {
                this.passwordEyes = '/images/close_eye.png';
                $('.input-password').attr('type', 'password');
            }
        },

        // Show or Hidden Confirm Password
        showConfirmPassword() {
            let pswInputType = $('.input-confirm-psw').attr('type');
            if (pswInputType === 'password') {
                this.confirmPasswordEyes = '/images/open_eye.png';
                $('.input-confirm-psw').attr('type', 'text');
            } else if (pswInputType === 'text') {
                this.confirmPasswordEyes = '/images/close_eye.png';
                $('.input-confirm-psw').attr('type', 'password');
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
                        this.showErrorMessage();
                    }
                });
        },

        // Sort And Display Error Messages
        showErrorMessage() {
            // Username
            if (this.failMessage.username) {
                $('.input-username, .error-username').addClass('is-invalid');
                this.usernameErrorMsg = this.failMessage.username[0];
            }

            // Password
            if (this.failMessage.password) {
                $('.input-password, .error-password').addClass('is-invalid');
                this.passwordErrorMsg = this.failMessage.password[0];
            }

            // Confirm Password
            if (this.failMessage.password_confirmation) {
                $('.input-confirm-psw, .error-confirm-psw').addClass('is-invalid');
                this.psw_confirmErrorMsg = this.failMessage.password_confirmation[0];
            }

            // Fullname
            if (this.failMessage.fullname) {
                $('.input-fullname, .error-fullname').addClass('is-invalid');
                this.fullnameErrorMsg = this.failMessage.fullname[0];
            }

            // Mobile
            if (this.failMessage.mobile) {
                $('.input-mobile, .error-mobile').addClass('is-invalid');
                this.mobileErrorMsg = this.failMessage.mobile[0];
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