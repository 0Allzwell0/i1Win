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
                        id="reg-username"
                        type="text"
                        :placeholder="$t('common.username')"
                        minlength="6"
                        maxlength="10"
                        v-model="myUsername"
                    />
                </div>
                <p class="register-error-msg" id="err-username"></p>

                <!-- Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text"
                        id="reg-password"
                        type="password"
                        :placeholder="$t('common.password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myPassword"
                    />
                    <img class="register-eye-icon" :src="passwordEyes" @click="showPassword()" />
                </div>
                <p class="register-error-msg" id="err-password"></p>

                <!-- Confirm Password -->
                <div class="register-input-container">
                    <img class="register-input-img" src="/images/password_image.png" />
                    <input
                        class="register-input-text"
                        id="reg-confirm-password"
                        type="password"
                        :placeholder="$t('register.confirm_password')"
                        minlength="6"
                        maxlength="12"
                        v-model="myConfirmPassword"
                    />
                    <img class="register-eye-icon" :src="confirmPasswordEyes" @click="showConfirmPassword()" />
                </div>
                <p class="register-error-msg" id="err-password_confirmation"></p>

                <!-- Full Name -->
                <div class="register-input-container">
                    <img class="register-input-img fullname-img" src="/images/fullname_image.png" />
                    <input
                        class="register-input-text"
                        id="reg-fullname"
                        type="text"
                        :placeholder="$t('common.fullname')"
                        v-model="myFullname"
                    />
                </div>
                <p class="register-error-msg" id="err-fullname"></p>

                <!-- Mobile Number -->
                <div class="register-input-container">
                    <img class="register-input-img mobile-img" src="/images/mobile_image.png" />
                    <input
                        class="register-input-text"
                        id="reg-mobileno"
                        type="number"
                        :placeholder="$t('register.mobile_number')"
                        v-model="myMobile"
                    />
                </div>
                <p class="register-error-msg" id="err-mobileno"></p>

                <!-- Line ID -->
                <div class="register-input-container">
                    <img class="register-input-img line-img" src="/images/line_image.png" />
                    <input class="register-input-text" id="reg-line" type="text" placeholder="LINE ID" v-model="myLineID" />
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
export default {
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
            expandBanksList: false
        };
    },
    mounted() {
        
    },
    methods: {
        // Show or Hidden Password
        showPassword() {
            let pswInputType = $('#reg-password').attr('type');
            if (pswInputType === 'password') {
                this.passwordEyes = '/images/open_eye.png';
                $('#reg-password').attr('type', 'text');
            } else if (pswInputType === 'text') {
                this.passwordEyes = '/images/close_eye.png';
                $('#reg-password').attr('type', 'password');
            }
        },

        // Show or Hidden Confirm Password
        showConfirmPassword() {
            let pswInputType = $('#reg-confirm-password').attr('type');
            if (pswInputType === 'password') {
                this.confirmPasswordEyes = '/images/open_eye.png';
                $('#reg-confirm-password').attr('type', 'text');
            } else if (pswInputType === 'text') {
                this.confirmPasswordEyes = '/images/close_eye.png';
                $('#reg-confirm-password').attr('type', 'password');
            }
        },

        // Register
        register() {
            this.$store.dispatch('auth/register', {
                username: this.myUsername,
                password: this.myPassword,
                fullname: this.myFullname,
                mobile: this.myMobile
            });
        }
    }
};
</script>
<style lang="scss" scoped>
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
            .register-error-msg {
                display: none;
                width: 100%;
                margin: 0 0 -19px 10px;

                &.is-valid {
                    display: block;
                    color: #63c203;
                }
                &.is-invalid {
                    display: block;
                    color: #ad040a;
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