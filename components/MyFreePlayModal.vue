<template>
    <div class="free-modal-wrapper" id="freeModal">
        <div class="free-modal-container">
            <fa :icon="['fas', 'times']" class="free-modal-close" @click="closeModal()" />
            <div class="free-modal">
                <img class="free-game-img" />
                <span class="free-game-name"></span>
                <!-- 已登入時才顯示 -->
                <button class="free-btn free-play-now" v-if="false">{{ $t('common.play_now') }}</button>
                <!-- 尚未登入時顯示 -->
                <button class="free-btn free-login" v-if="true">{{ $t('common.login') }}</button>
                <button class="free-btn free-register" v-if="true">{{ $t('common.register') }}</button>
                <button class="free-btn free-try-now" v-if="showButton">{{ $t('common.try_now') }}</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        showButton: {
            type: Boolean,
            default: true
        },
        nowPosition: {
            type: Number,
            default: null
        }
    },
    mounted() {
        // When Click Button, Close Modal
        $('.free-btn').click(() => {
            this.closeModal();
        });

        // When Click "Login" Button, Go To "Login" Page
        $('.free-login').click(() => {
            setTimeout(() => {
                this.$router.push({ path: this.$i18n.path('login') });
            }, 200);
        });

        // When Click "Register" Button, Go To "Register" Page
        $('.free-register').click(() => {
            setTimeout(() => {
                this.$router.push({ path: this.$i18n.path('register') });
            }, 200);
        });
    },
    methods: {
        // Close Modal
        closeModal() {
            $('.free-modal-container').removeClass('show');
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
.free-modal-wrapper {
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

    .free-modal-container {
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
        .free-modal-close {
            position: absolute;
            top: 10px;
            right: 14px;
            color: $color-black;
            font-size: 26px;
        }
        .free-modal {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 290px;
            height: 500px;
            background: $color-white;
            border-radius: 5px;
            box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2);

            .free-game-img {
                width: 150px;
                border-radius: 10px;
            }
            .free-game-name {
                text-align: center;
                margin: 20px 0;
            }
            .free-btn {
                width: 150px;
                height: 44px;
                font-weight: bold;
                border: 1.5px solid #feaa06;
                border-radius: 5px;
                margin-top: 10px;

                &.free-play-now {
                    color: $color-white;
                    background: $color-yellow-linear-unpress;

                    &:active {
                        background: $color-yellow-linear;
                    }
                }
                &.free-login {
                    color: #feaa06;
                    background: transparent;
                }
                &.free-register {
                    border: solid 1.5px #feaa06;
                    background: $color-yellow-linear-unpress;

                    &:active {
                        background: $color-yellow-linear;
                    }
                }
                &.free-try-now {
                    color: $color-white;
                    background: $color-black-linear;
                    border: none;
                }
            }
        }
    }
}
</style>