<template>
	<main class="member-wrapper">
		<!-- Message Modal-->
		<modal-message></modal-message>

		<!-- Member Nav -->
		<the-member-nav></the-member-nav>

		<!-- Wallet List -->
		<the-wallet-list></the-wallet-list>

		<!-- Content -->
		<div class="member-container member-deposit">
			<!-- Deposit Methods -->
			<h3>{{ $t('deposit.deposit_methods') }}</h3>
			<div class="form-wrapper method-form">
				<button type="button" @click.stop="expandMethodList()">{{ $t('common.please_select') }}</button>
				<fa :icon="['fas', 'caret-down']" class="icon-down" />
				<ul v-show="showMethodList">
					<li @click.stop="selectMethod(null)">{{ $t('common.please_select') }}</li>
					<li @click.stop="selectMethod('BANK')">
						<img src="/images/member/thirdparty/bank.png" alt="" />
					</li>
					<li @click.stop="selectMethod('QR_CODE')">
						<img src="/images/member/thirdparty/qr_code.png" alt="" />
					</li>
				</ul>
			</div>

			<!-- Amount -->
			<h3>{{ $t('member.amount') }} (THB)</h3>
			<div class="amount-wrapper">
				<button type="button" @click="setAmount(100)">฿ 100</button>
				<button type="button" @click="setAmount(500)">฿ 500</button>
				<button type="button" @click="setAmount(1000)">฿ 1000</button>
				<button type="button" @click="setAmount(2000)">฿ 2000</button>
			</div>
			<div class="amount-wrapper second">
				<button type="button" @click="setAmount(3000)">฿ 3000</button>
				<button type="button" @click="setAmount(5000)">฿ 5000</button>
				<input type="number" placeholder="THB" v-model="totalAmount" />
			</div>
			<!-- Amount Remind -->
			<p class="amount-remind-msg" v-if="limits">{{ $t('deposit.minimum_deposit') }} {{ limits.minDeposit }}</p>

			<!-- Bonus -->
			<h3>{{ $t('footer.promotions') }}</h3>
			<div class="form-wrapper">
				<button class="form-bonus" type="button" @click="showBonusList()">{{ $t('common.please_select') }}</button>
				<fa :icon="['fas', 'caret-down']" class="icon-down" />
				<ul v-show="isShowBonusList">
					<li class="item-select" @click="selectBonus(null, null)">{{ $t('common.please_select') }}</li>
					<li class="item-type" v-for="(typeItem, index) in newBonusList" :key="`bonus_type_${index}`">
						{{ typeItem.type }}
						<ul>
							<li v-for="(item, index) in typeItem.bonus" :key="`bonus-${index}`" @click="selectBonus(item.name, item.code)">
								{{ item.name }}
							</li>
						</ul>
					</li>
				</ul>
			</div>

			<!-- Descriptions -->
			<p class="remind-msg">{{ $t('deposit.agree_certify') }}</p>

			<!-- Deposit Button -->
			<button type="button" @click="deposit()" :disabled="isDisabled">{{ $t('member.deposit') }}</button>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheMemberNav from '@/components/member/TheMemberNav';
	import TheWalletList from '@/components/member/TheWalletList';

	export default {
		computed: {
			...mapGetters('wallet', {
				httpStatus: 'GetHttpStatus',
				responseMsg: 'GetResponseMsg',
				networkError: 'GetNetworkError',
				thirdpartyURL: 'GetThirdPartyURL',
				bonusList: 'GetBonus',
				limits: 'GetLimits',
			}),
		},
		components: {
			ModalMessage,
			TheMemberNav,
			TheWalletList,
		},
		data() {
			return {
				showMethodList: false,
				choiceAmount: null,
				totalAmount: 0,
				newBonusList: null,
				selectedBonus: null,
				selectedMethod: null,
				isShowBonusList: false,
				methodOK: false,
				amountOK: false,
				isDisabled: true,
			};
		},
		mounted() {
			// Get Limits
			this.$store.dispatch('wallet/getLimits');

			// Get Bonus
			this.$store.dispatch('wallet/getBonus').then(() => {
				if (this.bonusList) {
					this.calculateType();
				}
			});

			// When Touch Others Place, "Promotion" List Will Close
			$(document).click((el) => {
				let touchEl = $(el.target)[0].className;

				if (touchEl !== 'form-bonus') {
					this.isShowBonusList = false;
				}
			});

			$('.amount-wrapper > input').keyup(() => {
				this.checkAmount();
				this.checkInfo();
			});
		},
		methods: {
			// Expand Or Close Methods List
			expandMethodList() {
				this.showMethodList = !this.showMethodList;
			},

			// Select Method
			selectMethod(method) {
				if (method) {
					if (method === 'BANK') {
						$('.method-form > button').html('<img src="/images/member/thirdparty/bank.png" alt="" />');
						this.selectedMethod = 'bank';
					} else if (method === 'QR_CODE') {
						$('.method-form > button').html('<img src="/images/member/thirdparty/qr_code.png" alt="" />');
						this.selectedMethod = 'qr';
					}
					this.methodOK = true;
				} else {
					$('.method-form > button').text(this.$t('common.please_select'));
					this.methodOK = false;
				}

				this.showMethodList = false;
				this.checkInfo();
			},

			// Calculate the number of tpe
			calculateType() {
				let count = 1;
				let haveSame = false;
				for (let i = 1; i < this.bonusList.length; i++) {
					for (let j = 0; j < i; j++) {
						if (this.bonusList[j].type === this.bonusList[i].type) {
							haveSame = true;
						}
					}

					if (!haveSame) {
						count++;
					}

					haveSame = false;
				}

				this.newBonusList = new Array(count);

				// Set a default value for each item in the "newBonus List" array
				for (let k = 0; k < this.newBonusList.length; k++) {
					this.newBonusList[k] = {
						type: null,
						bonus: [],
					};
				}

				this.classifyBonus();
			},

			// Classify the bonus and save it to "newBonusList"
			classifyBonus() {
				let noSame = false;

				this.newBonusList[0].type = this.bonusList[0].type;

				for (let i = 0; i < this.newBonusList.length; i++) {
					for (let j = 0; j < this.bonusList.length; j++) {
						if (this.newBonusList[i].type === null) {
							noSame = true;
							for (let k = 0; k < i; k++) {
								if (this.newBonusList[k].type === this.bonusList[j].type) {
									noSame = false;
									break;
								}
							}

							if (noSame) {
								this.newBonusList[i].type = this.bonusList[j].type;
							}
						}
						if (this.newBonusList[i].type === this.bonusList[j].type) {
							this.newBonusList[i].bonus.push(this.bonusList[j]);
						}
					}
				}
			},

			// Set deposit amount
			setAmount(amount) {
				if (this.totalAmount) {
					this.totalAmount = parseFloat(this.totalAmount) + amount;
				} else {
					this.totalAmount = amount;
				}

				this.checkAmount();
				this.checkInfo();
			},

			// Check deposit amount
			checkAmount() {
				if (this.totalAmount > 0) {
					if (this.limits) {
						if (this.totalAmount <= this.limits.maxDeposit) {
							this.amountOK = true;
						} else {
							this.amountOK = false;
						}

						if (this.totalAmount >= this.limits.minDeposit) {
							this.amountOK = true;
						} else {
							this.amountOK = false;
						}
					} else {
						if (this.totalAmount > 50000) this.amountOK = true;
						else this.amountOK = false;
						if (this.totalAmount < 30) this.amountOK = true;
						else this.amountOK = false;
					}
				} else {
					this.amountOK = false;
				}
			},

			// Show or close bonus list
			showBonusList() {
				this.isShowBonusList = !this.isShowBonusList;
			},

			// Select bonus
			selectBonus(name, code) {
				if (name && code) {
					$('.form-bonus').text(name);
					this.selectedBonus = code;
				} else {
					$('.form-bonus').text(this.$t('common.please_select'));
					this.selectedBonus = null;
				}

				this.isShowBonusList = false;
				this.checkInfo();
			},

			// Check information to allow "Deposit" button
			checkInfo() {
				if (this.methodOK && this.amountOK) {
					this.isDisabled = false;
				} else {
					this.isDisabled = true;
				}
			},

			// Deposit submit
			deposit() {
				this.isDisabled = true;

				// Show loading animation
				this.$nuxt.$loading.start();

				this.$store
					.dispatch('wallet/thirdpartyPayment', {
						method: this.selectedMethod,
						amount: this.totalAmount,
						bonus: this.selectedBonus,
					})
					.then(() => {
						// Hide loading animation
						this.$nuxt.$loading.finish();

						this.isDisabled = false;

						$('.msg-list').html('');
						if (this.httpStatus && !this.networkError) {
							if (this.httpStatus === 204 || this.httpStatus === 200) {
								if (this.thirdpartyURL) {
									window.open(this.thirdpartyURL);
									this.reload();
								}
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
					if (error.amount) {
						for (let i = 0; i < error.amount.length; i++) {
							msgArray.push(error.amount[i]);
						}
					}
					if (error.bank) {
						for (let i = 0; i < error.bank.length; i++) {
							msgArray.push(error.bank[i]);
						}
					}
					if (error.bonus) {
						for (let i = 0; i < error.bonus.length; i++) {
							msgArray.push(error.bonus[i]);
						}
					}
					if (error.ledger) {
						for (let i = 0; i < error.ledger.length; i++) {
							msgArray.push(error.ledger[i]);
						}
					}
				}
				for (let j = 0; j < msgArray.length; j++) {
					$('.msg-list').append(`<li>${msgArray[j]}</li>`);
				}
			},
		},
	};
</script>
<style lang="scss">
	@import '@/assets/scss/PageMember.scss';
</style>