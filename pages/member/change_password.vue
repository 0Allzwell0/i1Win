<template>
    <main class="member-wrapper">
        <!-- Message Modal -->
        <modal-message></modal-message>

        <div class="member-container">
            <!-- Title -->
            <h2>{{ $t('change_psw.title') }}</h2>

            <!-- Currrent Password -->
            <h3>{{ $t('change_psw.current_psw') }}</h3>
            <div class="input-wrapper">
                <input class="current-input" type="password" :placeholder="$t('change_psw.current_psw')" v-model="myCurrentPSW" />
                <img class="current-eye" src="/images/close_eye.png" @click="showPassword('current')" alt="Eye" />
            </div>

            <!-- New Password -->
            <h3>{{ $t('change_psw.new_psw') }}</h3>
            <div class="input-wrapper">
                <input class="new-input" type="password" :placeholder="$t('change_psw.new_psw')" v-model="myNewPSW" />
                <img class="new-eye" src="/images/close_eye.png" @click="showPassword('new')" alt="Eye" />
            </div>

            <!-- Confirm New Password -->
            <h3>{{ $t('change_psw.confirm_psw') }}</h3>
            <div class="input-wrapper">
                <input class="confirm-input" type="password" :placeholder="$t('change_psw.confirm_psw')" v-model="myConfirmNewPSW" />
                <img class="confirm-eye" src="/images/close_eye.png" @click="showPassword('confirm')" alt="Eye" />
            </div>

            <!-- Change Button -->
            <button type="button" @click="changePassword()">{{ $t('common.submit') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import ModalMessage from '@/components/modal/ModalMessage';

export default {
    components: {
        ModalMessage
    },
    computed: {
        ...mapGetters('user', {
            httpStatus: 'GetHttpStatus',
            changePSWErrorMsg: 'GetChangePSWErrorMsg'
        })
    },
    data() {
        return {
            showCurrent: false,
            showNew: false,
            showConfirm: false,
            myCurrentPSW: null,
            myNewPSW: null,
            myConfirmNewPSW: null
        };
    },
    mounted() {},
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
            if (this.myNewPSW === this.myConfirmNewPSW) {
                this.$store.dispatch('user/changePassword', this.myNewPSW).then(() => {
                    this.showResponseMsg();
                });
            } else if (this.myNewPSW !== this.myConfirmNewPSW) {
                $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('change_psw.no_match_msg')}</div>`);
            }
        },

        // Show Error Message Modal
        showResponseMsg() {
            if (this.httpStatus === 204) {
                $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('change_psw.success_msg')}</div>`);
            } else if (this.httpStatus === 422) {
                $('#errorMsg .error-msg-container').html('');
                if (this.changePSWErrorMsg.password) {
                    let arrayLength = this.changePSWErrorMsg.password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(`<div class="error-msg">${this.changePSWErrorMsg.password[i]}</div>`);
                    }
                }

                if (this.changePSWErrorMsg.new_password) {
                    let arrayLength = this.changePSWErrorMsg.new_password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(
                            `<div class="error-msg">${this.changePSWErrorMsg.new_password[i]}</div>`
                        );
                    }
                }

                if (this.changePSWErrorMsg.confirm_new_password) {
                    let arrayLength = this.changePSWErrorMsg.confirm_new_password.length;
                    for (let i = 0; i < arrayLength; i++) {
                        $('#errorMsg .error-msg-container').append(
                            `<div class="error-msg">${this.changePSWErrorMsg.confirm_new_password[i]}</div>`
                        );
                    }
                }
            } else {
                $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.changePSWErrorMsg.others}</div>`);
            }

            $('#errorMsg').modal('show');
        }
    }
};
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/PageMember.scss';
</style>