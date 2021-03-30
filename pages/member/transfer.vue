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
				<input type="text" :value="`THB ${mainWallet}`" :placeholder="$t('member.available_balance')" disabled />
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
				<input class="form-amount" type="text" v-model="amount" :placeholder="$t('member.amount')" />
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
		inject: ['reload'],
		computed: {
			...mapGetters('wallet', {
				httpStatus: 'GetHttpStatus',
				responseMsg: 'GetResponseMsg',
				networkError: 'GetNetworkError',
				wallets: 'GetWallets',
				mainWallet: 'GetMainWallet',
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
				fromGame: null,
				fromGameOK: false,
				toGame: null,
				toGameOK: false,
				amount: null,
				isEnough: false,
				isDisabled: true,
			};
		},
		methods: {
			// Get From Game
			getFromGame(game) {
				this.fromGame = game;
				if (this.fromGame === 'none') {
					this.fromGameOK = false;
					this.amount = null;
					this.checkInfo();
				} else {
					this.fromGameOK = true;
					this.$store.dispatch('wallet/getBalance', game).then(() => {
						this.amount = this.balance;
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

			// Check information to allow "Deposit" button
			checkInfo() {
				if (this.fromGameOK && this.toGameOK) {
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

						this.isDisabled = false;

						$('.msg-list').html('');
						if (this.httpStatus && !this.networkError) {
							if (this.httpStatus === 204 || this.httpStatus === 200) {
								this.reload();
							} else if (this.httpStatus === 403) {
								$('.msg-list').html(`<li>${this.responseMsg}</li>`);
								$('#modalMessage').modal('show');
							} else if (this.httpStatus === 422) {
								this.showErrorMessage();
								$('#modalMessage').modal('show');
							}
						} else {
							$('.msg-list').append(`<li>${this.$t('common.network_error')}</li>`);
							$('#modalMessage').modal('show');
						}
					});
			},

			// Sort And Display Error Messages
			showErrorMessage() {
				let msgArray = [];
				for (let error of this.responseMsg) {
					if (error.from) {
						msgArray.push(error.from[0]);
					}
					if (error.to) {
						msgArray.push(error.to[0]);
					}
					if (error.wallet) {
						msgArray.push(error.wallet[0]);
					}
				}
				for (let j = 0; j < msgArray.length; j++) {
					$('.msg-list').append(`<li>${msgArray[j]}</li>`);
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/scss/PageMember.scss';
</style>