<template>
    <main class="register-wrapper">
        <section class="register-container">
            <fa :icon="['fas', 'times']" class="register-close" @click="$router.push({path: $i18n.path('')})" />

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
                <ul class="error-msg" id="errorUsername">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.username" :key="`usn-${index}`">{{ item }}</li>
                </ul>

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
                <ul class="error-msg" id="errorPassword">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.password" :key="`psw-${index}`">{{ item }}</li>
                </ul>

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
                <ul class="error-msg" id="errorConfirmPSW">
                    <li class="msg-text"></li>
                    <li
                        class="response-msg"
                        v-for="(item, index) in regErrorMsg.password_confirmation"
                        :key="`confirm-psw-${index}`"
                    >{{ item }}</li>
                </ul>

                <!-- Full Name -->
                <div class="input-container">
                    <img class="fullname-img" src="/images/fullname_img.png" :alt="$t('common.fullname')" />
                    <input id="inputFullname" type="text" :placeholder="$t('common.fullname')" v-model="myFullname" />
                </div>
                <ul class="error-msg" id="errorFullname">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.fullname" :key="`fullname-${index}`">{{ item }}</li>
                </ul>

                <!-- Mobile Number -->
                <div class="input-container">
                    <img class="mobile-img" src="/images/mobile_img.png" :alt="$t('register.mobile_number')" />
                    <input id="inputMobile" type="number" :placeholder="$t('register.mobile_number')" v-model="myMobile" />
                </div>
                <ul class="error-msg" id="errorMobile">
                    <li class="msg-text"></li>
                    <li class="response-msg" v-for="(item, index) in regErrorMsg.mobile" :key="`mobile-${index}`">{{ item }}</li>
                </ul>

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
        // Change CSS When "Input" Occurs With "keyup" Event
        $('.input-container > input').keyup(el => {
            let elTarget = el.target;
            let elementID = elTarget.id;
            let errorEl = null;
            let errElementID = null;

            // If Is Not "Line ID" input, Get The input's Error Message Element Class Name
            if (elementID !== 'inputLine') {
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
                if (elementID === 'inputUsername') {
                    if ((inputValue.length > 0 && inputValue.length < 6) || inputValue.length > 10) {
                        $(`#${errElementID} .msg-text`).text(this.$t('register.username_error1'));
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                    }
                }

                // Password
                if (elementID === 'inputPassword') {
                    if ((inputValue.length < 6 && inputValue.length > 0) || inputValue.length > 12) {
                        $(`#${errElementID} .msg-text`).text(this.$t('register.password_error'));
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                    }

                    let confirmInput = $('#inputConfirmPSW').val();

                    if (confirmInput.length > 0) {
                        if (confirmInput === inputValue) {
                            $('#errorConfirmPSW .msg-text').text(this.$t('register.confirm_psw_ok'));
                            $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-invalid');
                            $('#inputConfirmPSW, #errorConfirmPSW').addClass('is-valid');
                        } else if (confirmInput !== inputValue) {
                            $('#errorConfirmPSW .msg-text').text(this.$t('register.confirm_psw_error'));
                            $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-valid');
                            $('#inputConfirmPSW, #errorConfirmPSW').addClass('is-invalid');
                        }
                    } else {
                        $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-invalid is-valid');
                    }
                }

                // Confirm Password
                if (elementID === 'inputConfirmPSW') {
                    let passwordInput = $('#inputPassword').val();

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
                if (elementID === 'inputFullname') {
                }

                // Mobile
                if (elementID === 'inputMobile') {
                    if ((inputValue.length < 9 && inputValue.length > 0) || inputValue.length > 10) {
                        $(`#${errElementID} .msg-text`).text(this.$t('register.mobile_error1'));
                        $(elTarget).addClass('is-invalid');
                        $(errorEl).addClass('is-invalid');
                    }
                }
            }
        });

        // Change CSS When "Input" Occurs With "keyup" Event
        $('.input-container > input').blur(el => {
            let elTarget = el.target;
            let elementID = elTarget.id;
            let errorEl = null;
            let errElementID = null;

            // If Is Not "Line ID" input, Get The input's Error Message Element Class Name
            if (elementID !== 'inputLine') {
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
                if (elementID === 'inputUsername') {
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
                if (elementID === 'inputPassword') {
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

                    let confirmInput = $('#inputConfirmPSW').val();

                    if (confirmInput.length > 0) {
                        if (confirmInput === inputValue) {
                            $(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_ok'));
                            $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-invalid');
                            $('#inputConfirmPSW, #errorConfirmPSW').addClass('is-valid');
                        } else if (confirmInput !== inputValue) {
                            $(`#${errElementID} .msg-text`).text(this.$t('register.confirm_psw_error'));
                            $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-valid');
                            $('#inputConfirmPSW, #errorConfirmPSW').addClass('is-invalid');
                        }
                    }
                }

                // Confirm Password
                if (elementID === 'inputConfirmPSW') {
                    let passwordInput = $('#inputPassword').val();

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
                if (elementID === 'inputFullname') {
                    if (inputValue.length > 0) {
                        $(`#${errElementID} .msg-text`).text(this.$t('register.fullname_ok'));
                        $(elTarget).removeClass('is-invalid');
                        $(elTarget).addClass('is-valid');
                        $(errorEl).removeClass('is-invalid');
                        $(errorEl).addClass('is-valid');
                    }
                }

                // Mobile
                if (elementID === 'inputMobile') {
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
                if (elementID === 'inputLine') {
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
            $('#errorUsername .response-msg').show();
            if (status === 422) {
                if (this.regErrorMsg.username) {
                    this.usernameError = true;
                    $('#inputUsername, #errorUsername').removeClass('is-valid');
                    $('#inputUsername, #errorUsername').addClass('is-invalid');
                } else {
                    this.usernameError = false;
                    $('#inputUsername, #errorUsername').removeClass('is-valid is-invalid');
                }

                if (this.regErrorMsg.password) {
                    this.passwordError = true;
                    $('#inputPassword, #errorPassword').removeClass('is-valid');
                    $('#inputPassword, #errorPassword').addClass('is-invalid');
                } else {
                    this.passwordError = false;
                    $('#inputPassword, #errorPassword').removeClass('is-valid is-invalid');
                }

                if (this.regErrorMsg.password_confirmation) {
                    this.confirmPSWError = true;
                    $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-valid');
                    $('#inputConfirmPSW, #errorConfirmPSW').addClass('is-invalid');
                } else {
                    this.confirmPSWError = false;
                    $('#inputConfirmPSW, #errorConfirmPSW').removeClass('is-valid is-invalid');
                }

                if (this.regErrorMsg.fullname) {
                    this.fullnameError = true;
                    $('#inputFullname, #errorFullname').removeClass('is-valid');
                    $('#inputFullname, #errorFullname').addClass('is-invalid');
                } else {
                    this.fullnameError = false;
                    $('#inputFullname, #errorFullname').removeClass('is-valid is-invalid');
                }

                if (this.regErrorMsg.mobile) {
                    this.mobileError = true;
                    $('#inputMobile, #errorMobile').removeClass('is-valid');
                    $('#inputMobile, #errorMobile').addClass('is-invalid');
                } else {
                    this.mobileError = false;
                    $('#inputMobile, #errorMobile').removeClass('is-valid is-invalid');
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