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
			<!-- Deposit Bank -->
			<h3>{{ $t('deposit.deposit_to') }}</h3>
			<base-bank-selector v-on:selectedBank="getBank"></base-bank-selector>

			<!-- Bank Detail -->
			<h3>{{ $t('deposit.bank_detail') }}</h3>
			<div class="detail-wrapper">
				<div class="detail-container">
					<div class="name-wrapper">
						<span>{{ $t('deposit.name') }}</span>
						<span class="name-value"></span>
					</div>
					<div class="account-wrapper">
						<span>{{ $t('member.account_number') }}</span>
						<span class="account-value"></span>
					</div>
				</div>
				<div class="copy-wrapper">
					<fa :icon="['fas', 'copy']" class="copy-icon" />
					<span>{{ $t('deposit.copy_account_number') }}</span>
				</div>
			</div>

			<!-- Amount -->
			<h3>{{ $t('member.amount') }} (THB)</h3>
			<div class="amount-wrapper">
				<button type="button" @click="setAmount(250)">฿ 250</button>
				<button type="button" @click="setAmount(500)">฿ 500</button>
				<button type="button" @click="setAmount(1000)">฿ 1000</button>
				<button type="button" @click="setAmount(2000)">฿ 2000</button>
			</div>
			<div class="amount-wrapper second">
				<button type="button" @click="setAmount(3000)">฿ 3000</button>
				<button type="button" @click="setAmount(5000)">฿ 5000</button>
				<input type="number" placeholder="THB" v-model="totalAmount" />
			</div>

			<!-- Transfer Time -->
			<h3>{{ $t('deposit.transfer_time') }}</h3>
			<div class="form-wrapper form-transfer-time">
				<base-date-selector></base-date-selector>
				<base-time-selector></base-time-selector>
			</div>

			<!-- Reference Number -->
			<h3>{{ $t('deposit.reference_number') }}</h3>
			<div class="form-wrapper">
				<input type="text" :placeholder="$t('deposit.reference_msg')" v-model="referenceNo" />
			</div>

			<!-- Upload File -->
			<h3>{{ $t('deposit.file_input') }}</h3>
			<form class="form-wrapper" action="upload" enctype="multipart/form-data">
				<input class="form-upload" type="file" :placeholder="$t('deposit.no_file_select')" @change="getFile" />
			</form>

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
			<p>{{ $t('deposit.agree_certify') }}</p>

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
	import BaseBankSelector from '@/components/member/BaseBankSelector';
	import BaseDateSelector from '@/components/member/BaseDateSelector';
	import BaseTimeSelector from '@/components/member/BaseTimeSelector';

	export default {
		computed: {
			...mapGetters('wallet', {
				httpStatus: 'GetHttpStatus',
				responseMsg: 'GetResponseMsg',
				bonusList: 'GetBonus',
				limits: 'GetLimits',
			}),
		},
		components: {
			ModalMessage,
			TheMemberNav,
			TheWalletList,
			BaseBankSelector,
			BaseDateSelector,
			BaseTimeSelector,
		},
		data() {
			return {
				accountNumber: null,
				choiceAmount: null,
				totalAmount: 0,
				depositDate: null,
				depositTime: null,
				referenceNo: null,
				upLoadFile: null,
				formData: null,
				newBonusList: null,
				selectedBonus: null,
				isShowBonusList: false,
				bankOK: false,
				amountOK: false,
				upLoadFileOK: false,
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

			// Get UpLoad File
			getFile(e) {
				if (e.target.files[0]) {
					if (e.target.files[0].size < 2097152) {
						this.upLoadFile = e.target.files[0];
						this.upLoadFileOK = true;
					} else {
						this.upLoadFile = null;
						this.upLoadFileOK = false;
					}
				} else {
					this.upLoadFile = null;
					this.upLoadFileOK = false;
				}

				this.checkInfo();
			},

			// Get selected bank
			getBank(accountNumber, name) {
				if (accountNumber && name) {
					$('.name-value').text(name);
					$('.account-value').text(accountNumber);
					$('.detail-container').addClass('show');
					this.accountNumber = accountNumber;
					this.bankOK = true;
				} else {
					$('.detail-container').removeClass('show');
					this.accountNumber = null;
					this.bankOK = false;
				}
			},

			// Set deposit amount
			setAmount(amount) {
				if (this.choiceAmount != amount) {
					this.totalAmount = amount;
					this.choiceAmount = amount;
				} else {
					this.totalAmount = this.totalAmount + amount;
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

			// Get date value
			getDate() {
				this.depositDate = $('.date-selector-container input').val();
			},

			// Get time value
			getTime() {
				this.depositTime = $('.time-selector-container input').val();
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
				if (this.bankOK && this.amountOK && this.upLoadFileOK) {
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

				this.getDate();
				this.getTime();

				this.$store
					.dispatch('wallet/deposit', {
						accountNumber: this.accountNumber,
						amount: this.totalAmount,
						time: this.depositDate + ' ' + this.depositTime,
						reference: this.referenceNo,
						receipt: this.upLoadFile,
						bonus: this.selectedBonus,
					})
					.then(() => {
						// Hide loading animation
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
							$('.msg-list').html(`<li>${this.$t('deposit.success_msg')}</li>`);
						} else {
							$('.msg-list').html(`<li>${this.$t('deposit.error_msg')}</li>`);
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