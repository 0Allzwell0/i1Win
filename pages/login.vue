<template>
    <main class="login-wrapper">
        <div class="login-container">
            <!-- Close Button -->
            <fa :icon="['fas', 'times']" class="login-close" @click="$router.push({path: $i18n.path('')})" />

            <!-- Title -->
            <h2 class="login-title">{{ $t('common.login') }}</h2>

            <p class="login-msg msg1">{{ $t('login.login_msg1') }}</p>
            <p class="login-msg msg2">{{ $t('login.login_msg2') }}</p>

            <!-- Username -->
            <div class="login-input-wrapper">
                <img class="login-input-img" src="/images/username_image.png" />
                <input
                    class="login-input-text"
                    id="loginUsername"
                    type="text"
                    :placeholder="$t('common.username')"
                    v-model="myUsername"
                />
            </div>
            <!-- Username Error Message-->
            <ul class="login-error-msg" v-if="usernameError">
                <li class="error-msg" v-for="(item, index) in loginErrorMsg.username" :key="`usn-${index}`">{{ item }}</li>
            </ul>

            <!-- Password -->
            <div class="login-input-wrapper">
                <img class="login-input-img" src="/images/password_image.png" />
                <input
                    class="login-input-text"
                    id="loginPassword"
                    type="password"
                    :placeholder="$t('common.password')"
                    v-model="myPassword"
                />
                <img class="login-eye-icon" :src="passwordEyes" @click="showPassword()" />
            </div>
            <ul class="login-error-msg">
                <!-- Password Error Message-->
                <li
                    class="error-msg"
                    v-show="passwordError"
                    v-for="(item, index) in loginErrorMsg.password"
                    :key="`psw-${index}`"
                >{{ item }}</li>
                <!-- Login Error Message-->
                <li
                    class="error-msg"
                    v-show="loginError"
                    v-for="(item, index) in loginErrorMsg.login"
                    :key="`login-${index}`"
                >{{ item }}</li>
            </ul>
            <!-- Others Error Message-->
            <div class="login-error-msg" v-if="othersError">{{ loginErrorMsg.others }}</div>

            <!-- Forgot Password -->
            <span class="forgot-password" @click="showMsg()">{{ $t('login.forgot_password') }}</span>
            <span class="forgot-prompt-wrapper" :class="{'show': showForgotMsg}">
                <div class="forgot-prompt-title">{{ $t('login.forgot_password') }}</div>
                <div class="forgot-prompt-msg">{{ $t('login.forgot_password_msg') }}</div>
            </span>

            <!-- Login Button -->
            <button class="login-button" type="submit" @click="login()">{{ $t('common.login') }}</button>

            <!-- Remind Message -->
            <p class="login-remind-message">
                {{ $t('login.login_msg3') }}
                <nuxt-link class="login-register" :to="$i18n.path('register')">{{ $t('common.register') }}</nuxt-link>
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
            loginErrorMsg: 'GetLoginErrorMsg'
        })
    },
    data() {
        return {
            myUsername: null,
            myPassword: null,
            passwordEyes: '/images/close_eye.png',
            showForgotMsg: false,
            usernameError: false,
            passwordError: false,
            loginError: false,
            othersError: false
        };
    },
    methods: {
        // Show or Hidden "Forgot Password" Message
        showMsg() {
            this.showForgotMsg = !this.showForgotMsg;
        },

        // Show or Hidden Password
        showPassword() {
            let pswInputType = $('#loginPassword').attr('type');

            if (pswInputType === 'password') {
                this.passwordEyes = '/images/open_eye.png';
                $('#loginPassword').attr('type', 'text');
            } else if (pswInputType === 'text') {
                this.passwordEyes = '/images/close_eye.png';
                $('#loginPassword').attr('type', 'password');
            }
        },

        // Login
        login() {
            // Show Loading Animation
            this.$nuxt.$loading.start();

            this.$store
                .dispatch('auth/login', {
                    username: this.myUsername,
                    password: this.myPassword
                })
                .then(() => {
                    // If Login Success, Go To "Home" Page.
                    if (this.isLogined) {
                        this.$router.push(this.$i18n.path(''));
                    }

                    // If Login Fail, Show Error Message
                    if (this.httpStatus && this.httpStatus !== 200) {
                        this.$nuxt.$loading.finish();
                        this.showErrorMsg(this.httpStatus);
                    } else {
                        this.usernameError = false;
                        this.passwordError = false;
                        this.loginError = false;
                        this.othersError = false;
                    }
                });
        },

        // Show Error Message
        showErrorMsg(status) {
            if (status === 400) {
                setTimeout(() => {
                    if (this.loginErrorMsg.username) {
                        this.usernameError = true;
                    } else {
                        this.usernameError = false;
                    }
                    if (this.loginErrorMsg.password) {
                        this.passwordError = true;
                    } else {
                        this.passwordError = false;
                    }
                    if (this.loginErrorMsg.login) {
                        this.loginError = true;
                    } else {
                        this.loginError = false;
                    }
                }, 200);
            }
            if (status === 401 || status === 403) {
                this.othersError = true;
            } else {
                this.othersError = false;
            }
        }
    }
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
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 454px;
        padding: 10px 20px 0 20px;

        .login-close {
            position: absolute;
            right: 17px;
            top: 15px;
            font-size: 26px;
        }
        .login-title {
            width: 100%;
            font-size: 20px;
            font-weight: bold;

            text-align: center;
            border-bottom: 1px solid $color-gray;
            padding-bottom: 10px;
            margin: 35px 0 30px 0;
        }
        .login-msg {
            font-size: 14px;
            text-align: center;

            &.msg2 {
                margin: 5px 0 25px 0;
            }
        }

        .login-input-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            width: 100%;
            background: $color-white;
            border-radius: 5px;
            margin-bottom: 25px;

            .login-input-img {
                width: 30px;
                height: 30px;
                align-self: center;
                margin-left: 9px;
            }
            .login-input-text {
                flex: 1;
                height: 40px;
                font-size: 16px;
                border-radius: 5px;
                background: $color-white;
                padding-top: 3px;
                margin-left: 10px;
                padding-right: 40px;
            }
            .login-eye-icon {
                position: absolute;
                top: 13px;
                right: 10px;
                height: 16px;
            }
        }
        .login-error-msg {
            width: 100%;
            font-size: 13px;
            color: $color-red;
            font-weight: bold;
            text-align: center;
            margin: -24px 0 6px 0;
        }
        .forgot-password {
            font-size: 14px;
            font-weight: bold;
            align-self: flex-end;
        }
        .forgot-prompt-wrapper {
            display: none;
            position: absolute;
            z-index: 10;
            top: 320px;
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
            .forgot-prompt-title {
                width: 100%;
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 10px;
            }
            .forgot-prompt-msg {
                width: 100%;
                font-size: 12px;
                line-height: 18px;
            }
            &.show {
                display: block;
            }
        }
        .login-button {
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
        .login-remind-message {
            width: 100%;
            font-size: 14px;
            text-align: center;
            margin-bottom: 20px;

            .login-register {
                display: inline-block;
                font-weight: bold;
                color: $color-yellow;
                margin-top: -3px;
            }
        }
    }
}
</style>