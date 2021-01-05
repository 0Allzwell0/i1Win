<template>
	<main class="member-wrapper">
		<!-- Message Modal-->
		<modal-message></modal-message>

		<!-- Member Nav -->
		<the-member-nav></the-member-nav>

		<!-- Wallet List -->
		<the-wallet-list></the-wallet-list>

		<!-- Content -->
		<div class="member-container member-transfer">
			<!-- Available Balance -->
			<h3>{{ $t('member.available_balance') }}</h3>
			<div class="form-wrapper">
				<input type="text" :value="`THB ${availableBalance}`" :placeholder="$t('member.available_balance')" />
			</div>

			<!-- Transfer From -->
			<h3>{{ $t('transfer.transfer_from') }}</h3>
			<base-wallet-selector v-on:getHideGame="getFromGame" :hideGame="toGame" :type="'from'"></base-wallet-selector>

			<!-- Transfer To -->
			<h3>{{ $t('transfer.transfer_to') }}</h3>
			<base-wallet-selector v-on:getHideGame="getToGame" :hideGame="fromGame" :type="'to'"></base-wallet-selector>

			<!-- Amount -->
			<h3>{{ $t('member.amount') }} (THB)</h3>
			<div class="form-wrapper">
				<input class="form-amount" type="text" v-model="amount" :placeholder="$t('member.amount')" :disabled="!isEnough" />
			</div>

			<!-- Transfer Button -->
			<button type="button" @click="transfer()" :disabled="isDisabled">{{ $t('member.transfer') }}</button>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheMemberNav from '@/components/member/TheMemberNav';
	import TheWalletList from '@/components/member/TheWalletList';
	import BaseWalletSelector from '@/components/member/BaseWalletSelector';

	export default {
		computed: {
			...mapGetters('wallet', {
				httpStatus: 'GetHttpStatus',
				responseMsg: 'GetResponseMsg',
				wallets: 'GetWallets',
				balance: 'GetBalance',
			}),
		},
		components: {
			ModalMessage,
			TheMemberNav,
			TheWalletList,
			BaseWalletSelector,
		},
		data() {
			return {
				availableBalance: 0,
				fromGame: null,
				fromGameOK: false,
				toGame: null,
				toGameOK: false,
				amount: null,
				amountOK: false,
				isEnough: false,
				isDisabled: true,
			};
		},
		beforeMount() {
			this.availableBalance = this.balance;
		},
		mounted() {
			// Check Amount
			$('.form-amount').keyup(() => {
				this.checkAmount();
			});
		},
		methods: {
			// Get From Game
			getFromGame(game) {
				this.fromGame = game;
				if (this.fromGame === 'none') {
					this.fromGameOK = false;
					this.amount = null;
					this.checkAmount();
					this.checkInfo();
				} else {
					this.fromGameOK = true;
					this.$store.dispatch('wallet/getBalance', game).then(() => {
						this.amount = this.balance;
						this.checkAmount();
						this.checkInfo();
					});
				}
			},

			// Get To Game
			getToGame(game) {
				this.toGame = game;
				if (this.toGame === 'none') {
					this.toGameOK = false;
				} else {
					this.toGameOK = true;
				}
				this.checkInfo();
			},

			// Check Amount
			checkAmount() {
				if (this.amount) {
					if (this.amount > 0 && this.amount <= this.availableBalance) {
						this.isEnough = true;
						this.amountOK = true;
					} else {
						this.isEnough = false;
						this.amountOK = false;
					}
				} else {
					this.isEnough = false;
					this.amountOK = false;
				}
				this.checkInfo();
			},

			// Check information to allow "Deposit" button
			checkInfo() {
				if (this.fromGameOK && this.toGameOK && this.amountOK) {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			},

			// Transfer Submit
			transfer() {
				this.isDisabled = true;

				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('wallet/transfer', {
						from: this.fromGame,
						to: this.toGame,
						amount: this.amount,
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
							$('.msg-list').html(`<li>${this.$t('transfer.success_msg')}</li>`);
						} else {
							$('.msg-list').html(`<li>${this.$t('transfer.error_msg')}</li>`);
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