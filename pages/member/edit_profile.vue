<template>
	<main class="member-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<div class="member-container">
			<!-- Title -->
			<h2>{{ $t('edit_profile.title') }}</h2>

			<!-- Full Name -->
			<h3>{{ $t('member.fullname') }}</h3>
			<div class="form-wrapper">
				<input
					class="form-fullname"
					type="text"
					v-model="myFullname"
					:placeholder="$t('edit_profile.fullname')"
					:disabled="fullnameDisabled"
				/>
			</div>

			<!-- Mobile Number -->
			<h3>{{ $t('edit_profile.mobile_number') }}</h3>
			<div class="form-wrapper">
				<input
					class="form-mobile"
					type="number"
					v-model="myMobile"
					:placeholder="$t('edit_profile.mobile_number')"
					:disabled="mobileDisabled"
				/>
			</div>

			<!-- Line ID -->
			<h3>LINE ID</h3>
			<div class="form-wrapper">
				<input type="text" v-model="myLineID" placeholder="Line ID" />
			</div>

			<!-- Email -->
			<h3>{{ $t('edit_profile.email') }}</h3>
			<div class="form-wrapper">
				<input type="email" v-model="myEmail" :placeholder="$t('edit_profile.email')" />
			</div>

			<!-- Birthday -->
			<h3>{{ $t('edit_profile.birthday') }}</h3>
			<div class="form-wrapper">
				<base-date-selector class="form-long" :birthday="myBirthday"></base-date-selector>
			</div>

			<!-- Gender -->
			<h3>{{ $t('edit_profile.gender') }}</h3>
			<div class="gender-wrapper">
				<button class="gender-male" type="button" @click="changeGender(1)">{{ $t('edit_profile.male') }}</button>
				<button class="gender-female" type="button" @click="changeGender(2)">{{ $t('edit_profile.female') }}</button>
			</div>

			<!-- Save Button -->
			<button type="button" @click="saveChange()">{{ $t('common.submit') }}</button>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import BaseDateSelector from '@/components/member/BaseDateSelector';
	import ModalMessage from '@/components/modal/ModalMessage';

	export default {
		components: {
			BaseDateSelector,
			ModalMessage,
		},
		computed: {
			...mapGetters('user', {
				httpStatus: 'GetHttpStatus',
				profileErrorMsg: 'GetProfileErrorMsg',
			}),
		},
		data() {
			return {
				myFullname: null,
				myMobile: null,
				myLineID: null,
				myEmail: null,
				myBirthday: null,
				myGender: 1,
				fullnameDisabled: false,
				mobileDisabled: false,
			};
		},
		beforeMount() {
			this.setUserData();
		},
		mounted() {
			// Set Gender CSS
			$('.gender-wrapper > button').removeClass('active');
			if (this.myGender === 1) {
				$('.gender-male').addClass('active');
			} else if (this.myGender === 2) {
				$('.gender-female').addClass('active');
			}

			// If "fullname" has a value, set "input" to "disabled", otherwise cancel "disabled
			if (!this.myFullname) {
				this.fullnameDisabled = false;
			} else {
				this.fullnameDisabled = true;
			}

			// If "mobile" has a value, set "input" to "disabled", otherwise cancel "disabled
			if (!this.myMobile) {
				this.mobileDisabled = false;
			} else {
				this.mobileDisabled = true;
			}
		},
		methods: {
			// Set User Data
			setUserData() {
				let userData = JSON.parse(localStorage.getItem('userData'));

				this.myFullname = userData.fullname;
				this.myMobile = userData.mobile;
				this.myLineID = userData.line_id;
				this.myBirthday = userData.birthday;
				this.myEmail = userData.email;
				this.myGender = userData.gender;
			},

			// Change Gender
			changeGender(gender) {
				$('.gender-wrapper > button').removeClass('active');
				if (gender === 1) {
					$('.gender-male').addClass('active');
					this.myGender = 1;
				} else if (gender === 2) {
					$('.gender-female').addClass('active');
					this.myGender = 2;
				}
			},

			// Edit Profile Submit
			saveChange() {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.myBirthday = $('.date-selector-container input').val();

				this.$store
					.dispatch('user/editProfile', {
						line_id: this.myLineID,
						email: this.myEmail,
						birthday: this.myBirthday,
						gender: this.myGender,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();

						$('.msg-list').html('');
						if (this.httpStatus === 204) {
							$('.msg-list').append(`<li>${this.$t('edit_profile.success_msg')}</li>`);
						} else {
							$('.msg-list').append(`<li>${this.profileErrorMsg}</li>`);
						}
						$('#modalMessage').modal('show');
					});
			},
		},
	};
</script>
<style lang="scss">
	@import '@/assets/scss/PageMember.scss';
</style>