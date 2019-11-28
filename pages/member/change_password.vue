<template>
    <main class="change-password-wrapper">
        <!-- Error Message Modal -->
        <my-message-modal />

        <div class="change-password-container">
            <!-- Title -->
            <h2 class="change-password-title">{{ $t('change_password.title') }}</h2>

            <!-- Currrent Password -->
            <h3 class="change-password-samall-title">{{ $t('change_password.current_password') }}</h3>
            <div class="change-password-input-wrapper">
                <input
                    class="change-password-input current-input"
                    type="password"
                    :placeholder="$t('change_password.current_password')"
                    v-model="myCurrentPSW"
                />
                <img class="change-password-eye current-eye" src="/images/close_eye.png" @click="showPassword('current')" />
            </div>

            <!-- New Password -->
            <h3 class="change-password-samall-title">{{ $t('change_password.new_password') }}</h3>
            <div class="change-password-input-wrapper">
                <input
                    class="change-password-input new-input"
                    type="password"
                    :placeholder="$t('change_password.new_password')"
                    v-model="myNewPSW"
                />
                <img class="change-password-eye new-eye" src="/images/close_eye.png" @click="showPassword('new')" />
            </div>

            <!-- Confirm New Password -->
            <h3 class="change-password-samall-title">{{ $t('change_password.confirm_password') }}</h3>
            <div class="change-password-input-wrapper">
                <input
                    class="change-password-input confirm-input"
                    type="password"
                    :placeholder="$t('change_password.confirm_password')"
                    v-model="myConfirmNewPSW"
                />
                <img class="change-password-eye confirm-eye" src="/images/close_eye.png" @click="showPassword('confirm')" />
            </div>

            <!-- Change Button -->
            <button
                class="change-password-btn"
                type="submit"
                @click="changePassword()"
                :disabled="!allowClick"
            >{{ $t('common.submit') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMessageModal from '~/components/MyMessageModal';

export default {
    components: {
        MyMessageModal
    },
    computed: {
        ...mapGetters('user', {
            httpStatus: 'GetHttpStatus',
            errorMessage: 'GetErrorMessage'
        })
    },
    data() {
        return {
            showCurrent: false,
            showNew: false,
            showConfirm: false,
            myCurrentPSW: null,
            myNewPSW: null,
            myConfirmNewPSW: null,
            allowClick: false
        };
    },
    mounted() {
        $('.change-password-input').on('keyup blur', () => {
            let currentPSWLength = null;
            let newPSWLength = null;
            let confirmNewPSWLength = null;

            if (this.myCurrentPSW) {
                currentPSWLength = this.myCurrentPSW.length;
            }
            if (this.myNewPSW) {
                newPSWLength = this.myNewPSW.length;
            }
            if (this.myConfirmNewPSW) {
                confirmNewPSWLength = this.myConfirmNewPSW.length;
            }

            if (currentPSWLength > 0 && newPSWLength > 0 && confirmNewPSWLength) {
                this.allowClick = true;
            } else {
                this.allowClick = false;
            }
        });
    },
    methods: {
        // Show or Hide Password
        showPassword(type) {
            if (type === 'current') {
                if (!this.showCurrent) {
                    $('.current-input').attr('type', 'text');
                    $('.current-eye').attr('src', '/images/open_eye.png');
                    this.showCurrent = true;
                } else {
                    $('.current-input').attr('type', 'password');
                    $('.current-eye').attr('src', '/images/close_eye.png');
                    this.showCurrent = false;
                }
            } else if (type === 'new') {
                if (!this.showNew) {
                    $('.new-input').attr('type', 'text');
                    $('.new-eye').attr('src', '/images/open_eye.png');
                    this.showNew = true;
                } else {
                    $('.new-input').attr('type', 'password');
                    $('.new-eye').attr('src', '/images/close_eye.png');
                    this.showNew = false;
                }
            } else if (type === 'confirm') {
                if (!this.showConfirm) {
                    $('.confirm-input').attr('type', 'text');
                    $('.confirm-eye').attr('src', '/images/open_eye.png');
                    this.showConfirm = true;
                } else {
                    $('.confirm-input').attr('type', 'password');
                    $('.confirm-eye').attr('src', '/images/close_eye.png');
                    this.showConfirm = false;
                }
            }
        },

        // Change Password Submit
        changePassword() {
            this.$store.dispatch('user/changePassword', this.myNewPSW).then(() => {
                this.showErrorMessage();
            });
        },

        // Show Error Message Modal
        showErrorMessage() {
            if (this.httpStatus === 204) {
                $('#errorMsg .error-msg-container').text(this.$t('change_password.success_msg'));
            } else if (this.httpStatus === 422) {
                if (this.errorMessage.password) {
                    let arrayLength = this.errorMessage.password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(this.errorMessage.password[i]);
                    }
                }

                if (this.errorMessage.new_password) {
                    let arrayLength = this.errorMessage.new_password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(this.errorMessage.new_password[i]);
                    }
                }

                if (this.errorMessage.confirm_new_password) {
                    let arrayLength = this.errorMessage.confirm_new_password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(this.errorMessage.confirm_new_password[i]);
                    }
                }
            } else {
                $('#errorMsg .error-msg-container').text(this.errorMessage.others);
            }

            $('#errorMsg').modal('show');
        }
    }
};
</script>
<style lang="scss" scoped>
.change-password-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 50px);
    font-size: 12px;
    font-weight: bold;
    font-family: $font-family;
    background-image: $background_img;
    background-size: cover;
    padding: 0 30px 90px 30px;

    .change-password-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 414px;
        height: 100%;

        .change-password-title {
            font-size: 24px;
            margin: 25px 0 15px 0;
        }
        .change-password-samall-title {
            width: 100%;
            font-size: 18px;
            margin: 30px 0 10px 0;
        }
        .change-password-input-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            border-radius: 5px;
            border: 1px solid $color-gray;

            .change-password-input {
                width: 100%;
                height: 38px;
                font-size: 14px;
                background: $color-white;
                border-radius: 5px;
                padding-left: 13px;
            }
            .change-password-eye {
                position: absolute;
                top: 13px;
                right: 8px;
                height: 12px;
                filter: brightness(50%);
            }
        }
        .change-password-btn {
            width: 100%;
            min-height: 52px;
            font-size: 18px;
            border: $border-style;
            background: $color-yellow-linear-unpress;
            border-radius: 5px;
            margin-top: 50px;

            &:active {
                background: $color-yellow-linear;
            }
        }
    }
}
</style>