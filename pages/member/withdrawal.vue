<template>
	<main class="member-wrapper">
		<!-- Message Modal-->
		<modal-message></modal-message>

		<!-- Member Nav -->
		<the-member-nav></the-member-nav>

		<!-- Wallet List -->
		<the-wallet-list></the-wallet-list>

		<!-- Content -->
		<div class="member-container member-withdrawal">
			<!-- Available Balance -->
			<h3>{{ $t('member.available_balance') }}</h3>
			<div class="form-wrapper">
				<input type="text" v-model="availableBalance" :placeholder="$t('member.available_balance')" disabled />
			</div>

			<!-- Withdrawal Bank -->
			<h3>{{ $t('withdrawal.withdrawal_to') }}</h3>
			<base-bank-selector v-on:selectedBank="getBank"></base-bank-selector>

			<!-- Fullname -->
			<h3>{{ $t('member.fullname') }}</h3>
			<div class="form-wrapper">
				<input type="text" v-model="myFullname" :placeholder="$t('member.fullname')" disabled />
			</div>

			<!-- Account Number -->
			<h3>{{ $t('withdrawal.account_number') }}</h3>
			<div class="form-wrapper">
				<input class="input-account-number" v-model="myAccountNumber" :placeholder="$t('withdrawal.account_num_placeholder')" />
			</div>

			<!-- Amount -->
			<h3>{{ $t('member.amount') }} (THB)</h3>
			<div class="form-wrapper">
				<input class="form-amount" type="number" v-model="myAmount" :placeholder="amountPlaceholder" :disabled="amountAllowed" />
			</div>

			<!-- Descriptions -->
			<p>{{ $t('withdrawal.withdrawal_msg') }}</p>

			<!-- Withdrawal Button -->
			<button type="button" @click="withdrawal()" :disabled="isDisabled">{{ $t('member.withdrawal') }}</button>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheMemberNav from '@/components/member/TheMemberNav';
	import TheWalletList from '@/components/member/TheWalletList';
	import BaseBankSelector from '@/components/member/BaseBankSelector';

	export default {
		computed: {
			...mapGetters('wallet', {
				httpStatus: 'GetHttpStatus',
				requestState: 'GetRequestState',
				responseMsg: 'GetResponseMsg',
				wallets: 'GetWallets',
				balance: 'GetBalance',
				limits: 'GetLimits',
			}),
		},
		components: {
			ModalMessage,
			TheMemberNav,
			TheWalletList,
			BaseBankSelector,
		},
		data() {
			return {
				userData: null,
				availableBalance: null,
				myFullname: null,
				myAccountNumber: null,
				myAmount: null,
				accountNumberOK: false,
				amountOK: false,
				bankOK: false,
				amountAllowed: false,
				amountPlaceholder: this.$t('withdrawal.amount_placeholder') + '50',
				isDisabled: true,
			};
		},
		mounted() {
			this.availableBalance = `THB ${this.balance.toFixed(2) || '0.00'}`;
			this.userData = JSON.parse(localStorage.getItem('userData'));
			this.myFullname = this.userData.fullname || this.$t('member.fullname');

			this.checkAmount();

			// Check Account Number
			$('.input-account-number').keyup(() => {
				let accountNumLeng = this.myAccountNumber.length;
				if (accountNumLeng > 0) {
					this.accountNumberOK = true;
				} else {
					this.accountNumberOK = false;
				}
				this.checkInfo();
			});

			// Check Amount
			$('.form-amount').keyup(() => {
				if (this.myAmount > 0) {
					this.amountOK = true;
				} else {
					this.amountOK = false;
				}
				this.checkInfo();
			});
		},
		methods: {
			// Check Amount Is Availabled To Input And Change "Placeholder"
			// 1. The number of withdrawals per day has exceeded the limit
			// 2. The amount of one-day withdrawal has exceeded the limit
			// 3. Insufficient balance
			// 4. The minimum withdrawal amount is "minWithdraw" or 50
			checkAmount() {
				this.$store.dispatch('wallet/getLimits').then(() => {
					if (this.limits) {
						if (this.limits.todayWithdrawTotal >= this.limits.maxDailyWithdraw) {
							this.amountAllowed = true;
							this.amountPlaceholder = this.$t('withdrawal.today_withdraw_total');
						} else if (this.limits.todayCount >= this.limits.maxDaily) {
							this.amountAllowed = true;
							this.amountPlaceholder = this.$t('withdrawal.today_count');
						} else if (this.balance < this.limits.minWithdraw || this.balance <= 0) {
							this.amountAllowed = true;
							this.amountPlaceholder = this.$t('withdrawal.insufficient_balance');
						} else {
							this.amountAllowed = false;
							this.amountPlaceholder = this.$t('withdrawal.amount_placeholder') + this.limits.minWithdraw;
						}
					} else {
						this.amountAllowed = false;
						this.amountPlaceholder = this.$t('withdrawal.amount_placeholder') + '50';
					}
				});
			},

			// Get Selected Bank
			getBank(bank) {
				if (bank) {
					this.selectedBank = bank;
					this.bankOK = true;
				} else {
					this.bankOK = false;
				}
				this.checkInfo();
			},

			// Cheeck Information To Allow "Withdrawal" Button
			checkInfo() {
				if (this.bankOK && this.accountNumberOK && this.amountOK) {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			},

			// Withdrawal Submit
			withdrawal() {
				this.isDisabled = true;

				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('wallet/withdrawal', {
						toBank: this.selectedBank,
						accountNumber: this.myAccountNumber,
						amount: this.myAmount,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();

						if (this.httpStatus === 422) {
							let msgArray = [];
							$('.msg-list').html('');
							for (let i in this.responseMsg) {
								msgArray.push(this.responseMsg[i]);
							}
							for (let j = 0; j < msgArray.length; j++) {
								$('.msg-list').append(`<li>${msgArray[j]}</li>`);
							}
						} else if (this.httpStatus === 403) {
							$('.msg-list').html(`<li>${this.responseMsg}</li>`);
						} else if (this.httpStatus === 204) {
							$('.msg-list').html(`<li>${this.$t('withdrawal.success_msg')}</li>`);
						} else {
							$('.msg-list').html(`<li>${this.$t('withdrawal.error_msg')}</li>`);
						}
						$('#modalMessage').modal('show');
					});
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/scss/PageMember.scss';
</style>