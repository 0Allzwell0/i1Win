<template>
    <main class="edit-profile-wrapper">
        <div class="edit-profile-container">
            <!-- Title -->
            <h2 class="edit-profile-title">{{ $t('edit_profile.title') }}</h2>

            <!-- Full Name -->
            <h3 class="edit-profile-small-title">{{ $t('common.fullname') }}</h3>
            <p class="edit-profile-unchange-text">{{ fullname }}</p>

            <!-- Mobile Number -->
            <h3 class="edit-profile-small-title">{{ $t('edit_profile.mobile_number') }}</h3>
            <p class="edit-profile-unchange-text">{{ mobile }}</p>

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
                <button class="edit-profile-gender gender-male active" @click="changeGender('male')">{{ $t('edit_profile.male') }}</button>
                <button class="edit-profile-gender gender-female" @click="changeGender('female')">{{ $t('edit_profile.female') }}</button>
            </div>

            <!-- Save Button -->
            <button class="edit-profile-save-btn" type="submit">{{ $t('common.submit') }}</button>
        </div>
    </main>
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined',
            mobile: 'GetMobile',
            line_id: 'GetLineID',
            fullname: 'GetFullname',
            birthday: 'GetBirthday',
            email: 'GetEmail',
            gender: 'GetGender'
        })
    },
    data() {
        return {
            format: 'yyyy-MM-dd',
            language: this.$i18n.locale === 'th-TH' ? th : en,
            myLineID: null,
            myEmail: null,
            myBirthday: null
        };
    },
    mounted() {
        this.myLineID = this.line_id;
        this.myEmail = this.email;
        this.myBirthday = this.birthday;

        this.changeGender(this.gender);
    },
    methods: {
        // Change Gender
        changeGender(gender) {
            $('.edit-profile-gender').removeClass('active');
            if (gender === 'male') {
                $('.gender-male').addClass('active');
            } else if (gender === 'female') {
                $('.gender-female').addClass('active');
            }
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