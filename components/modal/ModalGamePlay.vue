<template>
    <div class="game-modal-wrapper" id="freeModal">
        <div class="game-modal-container">
            <fa :icon="['fas', 'times']" class="modal-close" @click="closeModal()" />
            <div class="game-modal">
                <img :src="gameImg" :alt="gameName" />
                <span>{{ gameName }}</span>
                <!-- 已登入時才顯示 -->
                <button class="btn-play-now" v-if="isLogined">{{ $t('common.play_now') }}</button>

                <!-- 尚未登入時顯示 -->
                <button class="btn-login" v-if="!isLogined">{{ $t('common.login') }}</button>
                <button class="btn-register" v-if="!isLogined">{{ $t('common.register') }}</button>
                <button class="btn-try-now" v-if="showButton">{{ $t('common.try_now') }}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        gameImg: {
            type: String,
            default: ''
        },
        gameName: {
            type: String,
            default: ''
        },
        showButton: {
            type: Boolean,
            default: true
        },
        nowPosition: {
            type: Number,
            default: null
        }
    },
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        })
    },
    mounted() {
        // When Click Button, Close Modal
        $('.game-modal > button').click(() => {
            this.closeModal();
        });

        // When Click "Login" Button, Go To "Login" Page
        $('.btn-login').click(() => {
            setTimeout(() => {
                this.$router.push({ path: this.$i18n.path('login') });
            }, 200);
        });

        // When Click "Register" Button, Go To "Register" Page
        $('.btn-register').click(() => {
            setTimeout(() => {
                this.$router.push({ path: this.$i18n.path('register') });
            }, 200);
        });
    },
    methods: {
        // Close Modal
        closeModal() {
            $('.game-modal-container').removeClass('show');
            setTimeout(() => {
                $('#freeModal').css('display', 'none');
            }, 100);
            $('html, body').removeClass('freezePage');

            // Scroll To Record Position
            $('html, body').animate({ scrollTop: this.nowPosition + 'px' }, 0);
        }
    }
};
</script>
<style lang="scss" scoped>
    .game-modal-wrapper {
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

        .game-modal-container {
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

            .game-modal {
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

                    &.btn-play-now {
                        color: $color-white;
                        background: $color-yellow-linear-unpress;

                        &:active {
                            background: $color-yellow-linear;
                        }
                    }

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

                    &.btn-try-now {
                        color: $color-white;
                        background: $color-black-linear;
                        border: none;
                    }
                }
            }
        }
    }
</style>