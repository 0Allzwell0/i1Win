<template>
	<main class="member-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<div class="member-container">
			<!-- Title -->
			<h2>{{ $t('change_psw.title') }}</h2>

			<!-- Currrent Password -->
			<h3>{{ $t('change_psw.current_psw') }}</h3>
			<div class="form-wrapper">
				<input
					:type="showCurrentPSW ? 'text' : 'password'"
					v-model="currentPSW"
					:placeholder="$t('change_psw.current_psw')"
					autocomplete="off"
				/>
				<img :src="showCurrentPSW ? '/images/open_eye.png' : '/images/close_eye.png'" @click="showPassword('current')" alt="Eye" />
			</div>

			<!-- New Password -->
			<h3>{{ $t('change_psw.new_psw') }}</h3>
			<div class="form-wrapper">
				<input
					:type="showNewPSW ? 'text' : 'password'"
					v-model="newPSW"
					:placeholder="$t('change_psw.new_psw')"
					autocomplete="off"
				/>
				<img :src="showNewPSW ? '/images/open_eye.png' : '/images/close_eye.png'" @click="showPassword('new')" alt="Eye" />
			</div>

			<!-- Confirm New Password -->
			<h3>{{ $t('change_psw.confirm_psw') }}</h3>
			<div class="form-wrapper">
				<input
					:type="showConfirmPSW ? 'text' : 'password'"
					v-model="confirmPSW"
					:placeholder="$t('change_psw.confirm_psw')"
					autocomplete="off"
				/>
				<img :src="showConfirmPSW ? '/images/open_eye.png' : '/images/close_eye.png'" @click="showPassword('confirm')" alt="Eye" />
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
			ModalMessage,
		},
		computed: {
			...mapGetters('user', {
				httpStatus: 'GetHttpStatus',
				changePSWErrorMsg: 'GetChangePSWErrorMsg',
				networkError: 'GetNetworkError',
			}),
		},
		data() {
			return {
				showCurrentPSW: false,
				showNewPSW: false,
				showConfirmPSW: false,
				currentPSW: null,
				newPSW: null,
				confirmPSW: null,
			};
		},
		methods: {
			// Show or Hide Password
			showPassword(type) {
				if (type === 'current') {
					this.showCurrentPSW = !this.showCurrentPSW;
				} else if (type === 'new') {
					this.showNewPSW = !this.showNewPSW;
				} else if (type === 'confirm') {
					this.showConfirmPSW = !this.showConfirmPSW;
				}
			},

			// Change Password Submit
			changePassword() {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('user/changePassword', {
						password: this.currentPSW,
						new_password: this.newPSW,
						new_password_confirmation: this.confirmPSW,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();

						$('.msg-list').html('');
						if (this.httpStatus && !this.networkError) {
							if (this.httpStatus === 204 || this.httpStatus === 200) {
								$('.msg-list').append(`<li>${this.$t('change_psw.success_msg')}</li>`);
							} else {
								if (this.changePSWErrorMsg.password) $('.msg-list').append(`<li>${this.changePSWErrorMsg.password}</li>`);
								if (this.changePSWErrorMsg.new_password)
									$('.msg-list').append(`<li>${this.changePSWErrorMsg.new_password}</li>`);
								if (this.changePSWErrorMsg.confirm_new_password)
									$('.msg-list').append(`<li>${this.changePSWErrorMsg.confirm_new_password}</li>`);
								if (this.changePSWErrorMsg.others) $('.msg-list').append(`<li>${this.changePSWErrorMsg.others}</li>`);
							}
							$('#modalMessage').modal('show');
						} else {
							$('.msg-list').append(`<li>${this.$t('common.network_error')}</li>`);
							$('#modalMessage').modal('show');
						}
					});
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/scss/PageMember.scss';
</style>