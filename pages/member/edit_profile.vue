<template>
    <main class="edit-profile-wrapper">
        <!-- Error Message Modal -->
        <my-message-modal />

        <div class="edit-profile-container">
            <!-- Title -->
            <h2 class="edit-profile-title">{{ $t('edit_profile.title') }}</h2>

            <!-- Full Name -->
            <h3 class="edit-profile-small-title">{{ $t('common.fullname') }}</h3>
            <p class="edit-profile-unchange-text">{{ myFullname }}</p>

            <!-- Mobile Number -->
            <h3 class="edit-profile-small-title">{{ $t('edit_profile.mobile_number') }}</h3>
            <p class="edit-profile-unchange-text">{{ myMobile }}</p>

            <!-- Line ID -->
            <h3 class="edit-profile-small-title">LINE ID</h3>
            <div class="edit-profile-input-wrapper">
                <input class="edit-profile-input" type="text" placeholder="Line ID" v-model="myLineID" />
            </div>

            <!-- Email -->
            <h3 class="edit-profile-small-title">{{ $t('edit_profile.email') }}</h3>
            <div class="edit-profile-input-wrapper">
                <input class="edit-profile-input" type="email" :placeholder="$t('edit_profile.email')" v-model="myEmail" />
            </div>

            <!-- Birthday -->
            <h3 class="edit-profile-small-title">{{ $t('edit_profile.birthday') }}</h3>
            <div class="edit-profile-input-wrapper">
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
            <h3 class="edit-profile-small-title">{{ $t('edit_profile.gender') }}</h3>
            <div class="edit-profile-gender-wrapper">
                <button class="edit-profile-gender gender-male" @click="changeGender('1')">{{ $t('edit_profile.male') }}</button>
                <button class="edit-profile-gender gender-female" @click="changeGender('2')">{{ $t('edit_profile.female') }}</button>
            </div>

            <!-- Save Button -->
            <button class="edit-profile-save-btn" type="submit" @click="editProfile()">{{ $t('common.submit') }}</button>
        </div>
    </main>
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';
import { mapGetters } from 'vuex';
import MyMessageModal from '~/components/MyMessageModal';

export default {
    components: {
        MyMessageModal
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

        $('.edit-profile-gender').removeClass('active');
        if (this.myGender === 1) {
            $('.gender-male').addClass('active');
        } else if (this.myGender === 2) {
            $('.gender-female').addClass('active');
        }
    },
    methods: {
        // Change Gender
        changeGender(gender) {
            $('.edit-profile-gender').removeClass('active');
            if (gender === '1') {
                $('.gender-male').addClass('active');
                this.myGender = 1;
            } else if (gender === '2') {
                $('.gender-female').addClass('active');
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
.edit-profile-wrapper {
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

    .edit-profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 414px;
        height: 100%;

        .edit-profile-title {
            font-size: 24px;
            margin: 25px 0 15px 0;
        }
        .edit-profile-small-title {
            width: 100%;
            font-size: 18px;
            margin: 20px 0 5px 0;
        }
        .edit-profile-unchange-text {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            opacity: 0.5;
            border-radius: 5px;
            border: 1px solid $color-gray;
            padding-left: 13px;
        }
        .edit-profile-input-wrapper {
            display: flex;
            width: 100%;
            border-radius: 5px;
            border: 1px solid $color-gray;

            .edit-profile-input {
                width: 100%;
                height: 38px;
                font-size: 14px;
                background: $color-white;
                border-radius: 5px;
                padding-left: 13px;
            }

            .vdp-datepicker {
                width: 100%;

                input {
                    width: 100%;
                    height: 38px;
                    font-size: 14px;
                    border-radius: 5px;
                    padding-left: 13px;
                }

                .vdp-datepicker__calendar {
                    width: 100%;
                    max-width: 313px;
                    margin-bottom: 20px;
                }
            }
        }
        .edit-profile-gender-wrapper {
            display: flex;
            width: 100%;

            .edit-profile-gender {
                width: 80px;
                min-height: 35px;
                color: $color-gray;
                font-size: 14px;
                font-weight: bold;
                border-radius: 5px;
                background: rgba(53, 53, 53, 0.9);

                &.gender-male {
                    margin-right: 8px;
                }
                &.active {
                    color: $color-black;
                    background: $color-yellow-linear;
                }
            }
        }
        .edit-profile-save-btn {
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