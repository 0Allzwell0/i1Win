<template>
    <main class="member-wrapper">
        <!-- Message Modal -->
        <modal-message></modal-message>

        <div class="member-container">
            <!-- Title -->
            <h2>{{ $t('edit_profile.title') }}</h2>

            <!-- Full Name -->
            <h3>{{ $t('member.fullname') }}</h3>
            <div class="input-wrapper">
                <input type="text" :placeholder="$t('edit_profile.fullname')" v-model="myFullname" disabled />
            </div>

            <!-- Mobile Number -->
            <h3>{{ $t('edit_profile.mobile_number') }}</h3>
            <div class="input-wrapper">
                <input type="number" :placeholder="$t('edit_profile.mobile_number')" v-model="myMobile" disabled />
            </div>

            <!-- Line ID -->
            <h3>LINE ID</h3>
            <div class="input-wrapper">
                <input type="text" placeholder="Line ID" v-model="myLineID" />
            </div>

            <!-- Email -->
            <h3>{{ $t('edit_profile.email') }}</h3>
            <div class="input-wrapper">
                <input type="email" :placeholder="$t('edit_profile.email')" v-model="myEmail" />
            </div>

            <!-- Birthday -->
            <h3>{{ $t('edit_profile.birthday') }}</h3>
            <div class="input-wrapper">
                <client-only>
                    <date-picker
                        :format="format"
                        :language="language"
                        :placeholder="$t('edit_profile.birthday')"
                        v-model="myBirthday"
                    />
                </client-only>
            </div>

            <!-- Gender -->
            <h3>{{ $t('edit_profile.gender') }}</h3>
            <div class="gender-wrapper">
                <button class="btn-male" type="button" @click="changeGender('1')">{{ $t('edit_profile.male') }}</button>
                <button class="btn-female" type="button" @click="changeGender('2')">{{ $t('edit_profile.female') }}</button>
            </div>

            <!-- Save Button -->
            <button type="button" @click="editProfile()">{{ $t('common.submit') }}</button>
        </div>
    </main>
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';
import { mapGetters } from 'vuex';

import ModalMessage from '@/components/modal/ModalMessage';

export default {
    components: {
        ModalMessage
    },
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        }),
        ...mapGetters('user', {
            httpStatus: 'GetHttpStatus',
            profileData: 'GetProfileData',
            profileErrorMsg: 'GetProfileErrorMsg'
        })
    },
    data() {
        return {
            format: 'yyyy-MM-dd',
            language: this.$i18n.locale === 'th' ? th : en,
            userData: null,
            myFullname: null,
            myMobile: null,
            myLineID: null,
            myEmail: null,
            myBirthday: null,
            myGender: '1'
        };
    },
    mounted() {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.myFullname = this.userData.fullname;
        this.myMobile = this.userData.mobile;
        this.myLineID = this.userData.line_id;
        this.myEmail = this.userData.email;
        this.myBirthday = this.userData.birthday;
        this.myGender = this.userData.gender;

        $('.gender-wrapper > button').removeClass('active');
        if (this.myGender === 1) {
            $('.btn-male').addClass('active');
        } else if (this.myGender === 2) {
            $('.btn-female').addClass('active');
        }
    },
    methods: {
        // Change Gender
        changeGender(gender) {
            $('.gender-wrapper > button').removeClass('active');
            if (gender === '1') {
                $('.btn-male').addClass('active');
                this.myGender = 1;
            } else if (gender === '2') {
                $('.btn-female').addClass('active');
                this.myGender = 2;
            }
        },

        // Edit Profile Submit
        editProfile() {
            this.$store
                .dispatch('user/editProfile', {
                    line_id: this.myLineID,
                    email: this.myEmail,
                    birthday: this.myBirthday,
                    gender: this.myGender
                })
                .then(() => {
                    if (this.httpStatus === 204) {
                        this.userData.line_id = this.myLineID;
                        this.userData.email = this.myEmail;
                        this.userData.birthday = this.myBirthday;
                        this.userData.gender = this.myGender;

                        localStorage.setItem('userData', JSON.stringify(this.userData));
                    }

                    this.showResponseMsg();
                });
        },

        // Show Response Message
        showResponseMsg() {
            if (this.httpStatus === 204) {
                $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('edit_profile.success_msg')}</div>`);
            } else {
                $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.profileErrorMsg}</div>`);
            }

            $('#errorMsg').modal('show');
        }
    }
};
</script>
<style lang="scss">
    @import '@/assets/scss/PageMember.scss';
</style>