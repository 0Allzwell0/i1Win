<template>
	<div class="bank-input-wrapper">
		<button class="bank-btn" type="button" @click.stop="expandBankList()">{{ $t('common.please_select') }}</button>
		<fa :icon="['fas', 'caret-down']" class="bank-down" />
		<!-- Deposit -->
		<ul v-show="showBankList" v-if="isDeposit">
			<li class="please-select" @click.stop="selectDepositBank(null, null, null)">{{ $t('common.please_select') }}</li>
			<li
				v-for="(item, index) in banks"
				:key="`deposit-bank-${index}`"
				@click.stop="selectDepositBank(item.accountNumber, item.name, item.bank)"
			>
				<img :src="`/images/member/bank/${item.bank}.png`" :alt="item.bank" />
			</li>
		</ul>

		<!-- Withdrawal -->
		<ul v-show="showBankList" v-if="isWithdrawal">
			<li class="please-select" @click.stop="selectWithdrawalBank(null, null)">{{ $t('common.please_select') }}</li>
			<li
				v-for="(item, index) in banks"
				:key="`withdrawal-bank-${index}`"
				@click.stop="selectWithdrawalBank(item.code.toLowerCase())"
			>
				<img :src="`/images/member/bank/${item.code.toLowerCase()}.png`" :alt="item.code" />
			</li>
		</ul>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('wallet', {
				banksList: 'GetBanksList',
			}),
		},
		data() {
			return {
				accountNumber: null,
				bankOK: false,
				showBankList: false,
				banks: null,
				isDeposit: false,
				isWithdrawal: false,
			};
		},
		mounted() {
			let routeName = this.$route.name;

			if (routeName.indexOf('deposit') !== -1) {
				this.isDeposit = true;
				this.isWithdrawal = false;
				this.$store.dispatch('wallet/getDepositBanks').then(() => {
					this.banks = this.banksList.bankAccounts;
				});
			} else if (routeName.indexOf('withdrawal') !== -1) {
				this.isDeposit = false;
				this.isWithdrawal = true;
				this.$store.dispatch('wallet/getWithdrawalBanks').then(() => {
					this.banks = this.banksList.banks;
				});
			}

			// When Touch Others Place, "Bank" List Will Close
			$(document).click((el) => {
				let touchEl = el.target.className;

				if (touchEl !== 'bank-btn' && touchEl !== 'bank-mg') {
					this.showBankList = false;
				}
			});
		},
		methods: {
			// Expand Or Close Bank List
			expandBankList() {
				this.showBankList = !this.showBankList;
			},

			// Select Deposit Bank
			selectDepositBank(accountNumber, name, bank) {
				if (bank) {
					$('.bank-input-wrapper > button').html(`<img class="bank-img" src="/images/member/bank/${bank}.png" alt="${bank}" />`);
				} else {
					$('.bank-input-wrapper > button').text(this.$t('common.please_select'));
				}

				this.showBankList = false;
				this.$emit('selectedBank', accountNumber, name);
			},

			// Select Withdrawal Bank
			selectWithdrawalBank(code) {
				if (code) {
					$('.bank-input-wrapper > button').html(`<img class="bank-img" src="/images/member/bank/${code}.png" alt="${code}" />`);
				} else {
					$('.bank-input-wrapper > button').text(this.$t('common.please_select'));
				}

				this.showBankList = false;
				this.$emit('selectedBank', code);
			},
		},
	};
</script>
<style lang="scss">
	.bank-input-wrapper {
		position: relative;
		display: flex;
		width: 100%;
		height: 39px;
		border-radius: 5px;
		border: 1px solid #cecece;
		background: $color-white;

		> button {
			width: 100%;
			font-size: 14px;
			background: $color-white;
			border-radius: 5px;
			text-align: left;
			padding-left: 10px;

			> img {
				width: auto;
				max-width: 119px;
			}
		}

		.bank-down {
			position: absolute;
			z-index: 1;
			top: 9px;
			right: 9px;
			font-size: 20px;
			color: $color-black;
		}

		> ul {
			position: absolute;
			z-index: 10;
			top: 38px;
			left: 0;
			width: 100%;
			max-height: 230px;
			font-weight: normal;
			font-size: 14px;
			border: 1px solid #cecece;
			background: $color-white;
			overflow-y: scroll;

			> li {
				font-size: 15px;
				width: 100%;
				border-bottom: 1px solid #cecece;
				padding: 10px 0 10px 10px;

				&.please-select {
					padding: 12px 0 12px 10px;
				}

				> img {
					width: auto;
					max-width: 119px;
				}
			}
		}
	}
</style>