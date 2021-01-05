<template>
	<div class="wallet-wrapper">
		<!-- Total Wallet -->
		<div class="total-wallet-wrapper">
			<div class="total-wallet-container">
				<span class="total-wallet-text">{{ $t('member.total') }}</span>
				<span class="total-wallet-currency">THB</span>
			</div>
			<span class="total-wallet-amount">{{ totalWallet.toFixed(2) }}</span>
			<div class="expand-close-wrapper" @click="expandWalletList()">
				<div class="expand-close-img">
					<div class="expand-close-column"></div>
					<div class="expand-close-row"></div>
				</div>
				<span class="expand-close-text">{{ $t('member.expand_wallet') }}</span>
			</div>
		</div>

		<!-- Main Wallet & Wallets List -->
		<div class="wallet-list-wrapper">
			<div class="main-wallet-container">
				<span class="main-wallet-text">{{ $t('member.main_wallet') }}</span>
				<span class="main-wallet-currency">THB</span>
				<span class="main-wallet-amount">{{ mainWallet.toFixed(2) }}</span>
			</div>
			<ul class="wallet-list-container">
				<li class="wallet-list-item-wrapper" v-for="(item, index) in wallets" :key="`wallet-${index}`">
					<span class="wallet-list-item-name">{{ item.code }}</span>
					<div class="wallet-list-item-container" :id="item.code.toLowerCase()">
						<span class="wallet-list-item-currency">THB</span>
						<span class="wallet-list-item-amount">-</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('wallet', {
				wallets: 'GetWallets',
				balance: 'GetBalance',
			}),
		},
		data() {
			return {
				mainWallet: 0,
				totalWallet: 0,
				walletList: [],
				expandWallet: false,
				scrollHeight: null,
				routeName: null,
				getBalance: null,
				temp: 0,
			};
		},
		beforeMount() {
			// Get Main Balance
			this.$store.dispatch('wallet/getBalance', 'main').then(() => {
				this.mainWallet = this.balance;
				this.totalWallet = this.totalWallet + this.mainWallet;
			});
		},
		mounted() {
			this.getRouteName();
			setTimeout(() => {
				this.getWallets();
			}, 1000);
		},
		methods: {
			// Get Wallets
			getWallets() {
				this.$store.dispatch('wallet/getWallets').then(() => {
					this.getWalletBalance();
				});
			},

			// Get Wallet Balance
			getWalletBalance() {
				this.getBalance = setInterval(() => {
					let productCode = null;
					let isActive = 1;
					let isBlocked = 1;

					isActive = this.wallets[this.temp].isActive;
					isBlocked = this.wallets[this.temp].isBlocked;
					productCode = this.wallets[this.temp].code.toLowerCase();

					if (isActive === 1 && isBlocked === 0) {
						this.$store.dispatch('wallet/getBalance', productCode).then(() => {
							if (this.balance) {
								$(`#${productCode} .wallet-list-item-amount`).text(this.balance);
								this.totalWallet = this.totalWallet + this.balance;
							}
						});
					}

					this.temp++;

					if (this.temp >= this.wallets.length) {
						clearInterval(this.getBalance);
					}
				}, 200);
			},

			// Get Route Name
			getRouteName() {
				this.routeName = this.$route.name;

				if (this.routeName.indexOf('deposit') !== -1) {
					this.routeName = 'deposit';
				} else if (this.routeName.indexOf('withdrawal') !== -1) {
					this.routeName = 'withdrawal';
				} else if (this.routeName.indexOf('transfer') !== -1) {
					this.routeName = 'transfer';
				} else {
					this.routeName = null;
				}
			},

			// Expand or Hide Wallet List
			expandWalletList() {
				this.scrollHeight = $('.wallet-list-container').height();

				if (!this.expandWallet) {
					$('.expand-close-img').addClass('expand');
					$('.expand-close-text').text(this.$t('member.close_wallet'));

					if (this.routeName === 'deposit') {
						$('.member-deposit').addClass('expand');
						$('.member-deposit').css('top', 273 + this.scrollHeight);
					} else if (this.routeName === 'withdrawal') {
						$('.member-withdrawal').addClass('expand');
						$('.member-withdrawal').css('top', 273 + this.scrollHeight);
					} else if (this.routeName === 'transfer') {
						$('.member-transfer').addClass('expand');
						$('.member-transfer').css('top', 273 + this.scrollHeight);
					}
				} else {
					$('.expand-close-img').removeClass('expand');
					$('.expand-close-text').text(this.$t('member.expand_wallet'));

					if (this.routeName === 'deposit') {
						$('.member-deposit').removeClass('expand');
						$('.member-deposit').css('top', '');
					} else if (this.routeName === 'withdrawal') {
						$('.member-withdrawal').removeClass('expand');
						$('.member-withdrawal').css('top', '');
					} else if (this.routeName === 'transfer') {
						$('.member-transfer').removeClass('expand');
						$('.member-transfer').css('top', '');
					}
				}
				this.expandWallet = !this.expandWallet;
			},
		},
	};
</script>
<style lang="scss" scoped>
	.wallet-wrapper {
		width: 100%;
		font-family: $font-family;
		font-size: 12px;
		background: rgba(25, 25, 25, 0.1);

		.total-wallet-wrapper {
			display: flex;
			align-items: center;
			width: 100%;
			background: $color-black;
			opacity: 0.8;
			border: 1.2px solid rgba(25, 25, 25, 0.2);
			margin-top: 1px;
			padding: 11.5px 12px 5px 12px;

			.total-wallet-container {
				display: flex;
				flex-direction: column;
				margin-right: 14px;

				.total-wallet-text {
					font-size: 20px;
					font-weight: bold;
					color: $color-white;
					line-height: 30px;
				}

				.total-wallet-currency {
					font-size: 14px;
					opacity: 0.4;
					color: $color-gray;
				}
			}

			.total-wallet-amount {
				flex: 1;
				width: 100%;
				font-size: 32px;
				line-height: 50px;
				color: $color-yellow;
			}

			.expand-close-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 77px;
				height: 71px;

				.expand-close-img {
					width: 46px;
					height: 46px;
					border: 1.5px solid $color-yellow;
					border-radius: 50%;
					padding: 5px;

					-webkit-transform: rotate(0turn);
					-ms-transform: rotate(0turn);
					transform: rotate(0turn);
					-webkit-transition: -webkit-transform 300ms;
					transition: transform 300ms;

					&.expand {
						-webkit-transform: rotate(0.12turn);
						-ms-transform: rotate(0.12turn);
						transform: rotate(0.12turn);
						-webkit-transition: -webkit-transform 300ms;
						transition: transform 300ms;
					}

					.expand-close-column {
						width: 30px;
						height: 2px;
						background: $color-yellow;
						margin: 15px 0 0 1.5px;
					}

					.expand-close-row {
						width: 2px;
						height: 30px;
						background: $color-yellow;
						margin: -15.5px 0 0 15px;
					}
				}

				.expand-close-text {
					width: 100%;
					color: $color-yellow;
					text-align: center;
					white-space: nowrap;
					margin-top: 5px;
				}
			}
		}

		.wallet-list-wrapper {
			width: 100%;

			.main-wallet-container {
				display: flex;
				width: 100%;
				font-weight: bold;
				border: 0.8px solid rgba(25, 25, 25, 0.2);
				background: $color-white;
				padding: 18px 12px 15px 12px;
				margin-top: 5px;

				.main-wallet-text {
					font-size: 18px;
					color: $color-black;
					opacity: 0.7;
					margin-right: 20px;
				}

				.main-wallet-currency {
					color: $color-black;
					opacity: 0.4;
					margin-right: 10px;
				}

				.main-wallet-amount {
					font-size: 22px;
					color: $color-black;
					opacity: 0.7;
				}
			}

			.wallet-list-container {
				width: 100%;
				margin-top: 5px;

				.wallet-list-item-wrapper {
					display: inline-block;
					width: calc((100% - 8px) / 3);
					background-color: $color-white;
					margin: 0 4px 5px 0;
					padding: 5px 0;

					&:nth-child(3n) {
						margin-right: 0;
					}

					.wallet-list-item-name {
						font-size: 14px;
						font-weight: bold;
						color: $color-black;
						opacity: 0.7;
						padding-left: 12px;
					}

					.wallet-list-item-container {
						padding-left: 12px;

						.wallet-list-item-currency {
							color: $color-black;
							opacity: 0.4;
						}

						.wallet-list-item-amount {
							font-size: 18px;
							color: $color-black;
							opacity: 0.7;
							text-align: center;
						}
					}
				}
			}
		}
	}

	// RWD
	// Screen: 360px ~
	@media screen and (min-width: 360px) {
		.wallet-wrapper {
			.total-wallet-wrapper {
				.total-wallet-amount {
					font-size: 40px;
				}
			}
		}
	}
</style>