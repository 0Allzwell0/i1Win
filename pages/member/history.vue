<template>
	<main class="history-wrapper">
		<!-- Member Nav -->
		<the-member-nav></the-member-nav>

		<!-- Primary Content -->
		<div class="history-container">
			<!-- History Tab -->
			<ul class="list-group">
				<li class="transaction-tab">
					<a class="active show" data-toggle="list" href="#historyTransaction">{{ $t('history.transaction') }}</a>
				</li>
				<li class="statement-tab">
					<a data-toggle="list" href="#historyStatement">{{ $t('history.statement') }}</a>
				</li>
				<li class="transfer-tab">
					<a data-toggle="list" href="#historyTransfer">{{ $t('history.transfer') }}</a>
				</li>
			</ul>

			<!-- Date -->
			<div class="history-date">
				<!-- From Date -->
				<base-date-selector class="from-date" v-on:getFromDate="getFromDate"></base-date-selector>
				<!-- To Date -->
				<base-date-selector class="to-date" v-on:getToDate="getToDate"></base-date-selector>
			</div>

			<!-- Search Button -->
			<button type="button" @click="search()">{{ $t('history.search') }}</button>

			<!-- Secondary Content -->
			<div class="data-list-wrapper">
				<!-- Transaction -->
				<div class="data-list-container tab-pane fade show active" id="historyTransaction">
					<!-- Transaction Title Bar -->
					<ul class="title-bar transaction-bar">
						<li class="title-date">{{ $t('history.date') }}</li>
						<li class="title-type">{{ $t('history.type') }}</li>
						<li class="title-amount">{{ $t('member.amount') }}</li>
						<li class="title-status">{{ $t('history.status') }}</li>
						<li class="title-remark">{{ $t('history.remark') }}</li>
					</ul>

					<!-- Transaction Data List -->
					<ul class="data-list transaction-list">
						<li v-for="(item, index) in transactionData" :key="`transaction-${index}`">
							<span class="item-date">{{ item.date }}</span>
							<span class="item-type">{{ item.type }}</span>
							<span class="item-amount">{{ item.amount }}</span>
							<span class="item-status">{{ item.status }}</span>
							<span class="item-remark">{{ item.remark }}</span>
						</li>
					</ul>
				</div>

				<!-- Statement -->
				<div class="data-list-container tab-pane fade" id="historyStatement">
					<!-- Statement Title Bar -->
					<ul class="title-bar statement-bar">
						<li class="title-type">{{ $t('history.type') }}</li>
						<li class="title-turnover">{{ $t('history.turnover') }}</li>
						<li class="title-winloss">{{ $t('history.winloss') }}</li>
						<li class="title-active_bet">{{ $t('history.active_bet') }}</li>
					</ul>

					<!-- Statement Data List -->
					<ul class="data-list statement-list">
						<li v-for="(item, index) in statementData" :key="`statement-${index}`">
							<span class="item-type">{{ item.type }}</span>
							<span class="item-turnover">{{ item.turnover }}</span>
							<span class="item-winloss">{{ item.winloss }}</span>
							<span class="item-active_bet">{{ item.active_bet }}</span>
						</li>
					</ul>
				</div>

				<!-- Transfer -->
				<div class="data-list-container tab-pane fade" id="historyTransfer">
					<!-- Transfer Title Bar -->
					<ul class="title-bar transfer-bar">
						<li class="title-date">{{ $t('history.date') }}</li>
						<li class="title-from">{{ $t('history.from') }}</li>
						<li class="title-to">{{ $t('history.to') }}</li>
						<li class="title-amount">{{ $t('member.amount') }}</li>
						<li class="title-status">{{ $t('history.status') }}</li>
					</ul>

					<!-- Transfer Data List -->
					<ul class="data-list transfer-list">
						<li v-for="(item, index) in transferData" :key="`transfer-${index}`">
							<span class="item-date">{{ item.date }}</span>
							<span class="item-from">{{ item.from }}</span>
							<span class="item-to">{{ item.to }}</span>
							<span class="item-amount">{{ item.amount }}</span>
							<span class="item-status">{{ item.status }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import TheMemberNav from '@/components/member/TheMemberNav';
	import BaseDateSelector from '@/components/member/BaseDateSelector';

	export default {
		computed: {
			...mapGetters('history', {
				transactionData: 'GetTransactionData',
				statementData: 'GetStatementData',
				transferData: 'GetTransferData',
			}),
		},
		components: {
			TheMemberNav,
			BaseDateSelector,
		},
		data() {
			return {
				fromDate: null,
				toDate: null,
				currentTab: 'Transaction',
			};
		},
		mounted() {
			// Judge Selected Tab
			$('.list-group > li').click((el) => {
				let type = $(el.currentTarget).attr('class');
				if (type.indexOf('transaction') !== -1) {
					this.currentTab = 'Transaction';
					this.getHistoryData('Transaction');
				} else if (type.indexOf('statement') !== -1) {
					this.currentTab = 'Statement';
					this.getHistoryData('Statement');
				} else if (type.indexOf('transfer') !== -1) {
					this.currentTab = 'Transfer';
					this.getHistoryData('Transfer');
				}
			});
		},
		methods: {
			// Get Current From Date Value
			getFromDate(date) {
				this.fromDate = date;
			},

			// Get Current To Date
			getToDate(date) {
				this.toDate = date;
			},

			// Search Submit
			search() {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.fromDate = $('.from-date .date-selector-container input').val();
				this.toDate = $('.to-date .date-selector-container input').val();
				this.getHistoryData(this.currentTab);
			},

			// Get History Data
			getHistoryData(type) {
				this.$store
					.dispatch(`history/get${type}Data`, {
						from: this.fromDate,
						to: this.toDate,
					})
					.then(() => {
						// Hide Loading Animation
						this.$nuxt.$loading.finish();
					});
			},
		},
	};
</script>
<style lang="scss">
	.history-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: calc(100vh - 100px);
		font-family: $font-family;
		font-size: 14px;

		.history-container {
			display: flex;
			flex-direction: column;
			width: 100%;
			min-height: calc(100vh - 116px);
			background: $background_img;
			background-size: cover;
			font-family: $font-family;
			font-size: 12px;
			padding-bottom: 90px;

			> ul {
				display: flex;
				flex-direction: row;
				margin: 30px 15px 10px 15px;

				> li {
					display: flex;
					width: 100%;
					border-top: $border-style;
					border-left: $border-style;
					border-bottom: $border-style;

					> a {
						width: 100%;
						color: $color-black;
						font-weight: bold;
						font-size: 14px;
						text-align: center;
						opacity: 0.6;
						padding: 5% 0 5% 0;

						&.active {
							opacity: 1;
							background: $color-yellow;
						}
					}

					&:first-child {
						border-radius: 20px 0 0 20px;

						> a {
							border-radius: 20px 0 0 20px;
						}
					}

					&:last-child {
						border-radius: 0 20px 20px 0;
						border-right: $border-style;

						> a {
							border-radius: 0 20px 20px 0;
						}
					}
				}
			}

			.history-date {
				display: flex;
				justify-content: space-between;
				margin: 4% 8% 6% 8%;
			}

			> button {
				width: 85%;
				font-size: 19px;
				font-weight: bold;
				border-radius: 5px;
				border: $border-style;
				align-self: center;
				background: $color-yellow-linear-unpress;
				opacity: 1;
				padding: 3.5% 0 3.5% 0;

				&:active {
					background: $color-yellow-linear;
				}
			}

			.data-list-wrapper {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				padding: 6% 0 0 0;

				.data-list-container {
					display: flex;
					flex-direction: column;

					&.tab-pane {
						display: none;
					}

					&.active {
						display: flex;
					}

					.title-bar {
						display: flex;
						width: 100%;
						font-size: 14px;
						font-weight: bold;
						color: $color-white;
						background: $color-black;
						padding: 3% 1% 3% 1%;
						text-align: center;

						> li {
							flex: 1;
						}

						&.transaction-bar {
							.title-date {
								flex: 1;
							}
							.title-type {
								flex: 1;
							}
							.title-amount {
								flex: 0.7;
							}
							.title-status {
								flex: 1;
							}
							.title-remark {
								flex: 1;
							}
						}

						&.transfer-bar {
							.title-date {
								flex: 1.05;
							}
							.title-from {
								flex: 1.1;
							}
							.title-to {
								flex: 1;
							}
							.title-amount {
								flex: 0.85;
							}
							.title-status {
								flex: 1;
							}
						}
					}

					.data-list {
						width: 100%;
						height: 300px;
						overflow-y: auto;

						> li {
							display: flex;
							width: 100%;
							font-weight: bold;
							text-align: center;
							align-items: center;
							padding: 3% 1% 3% 1%;

							&:not(:nth-child(2n)) {
								background: rgba(105, 105, 105, 0.5);
							}

							> span {
								flex: 1;

								&.item-date {
									flex: 1;
								}
								&.item-type {
									flex: 1;
								}
								&.item-amount {
									flex: 0.7;
								}
								&.item-status {
									flex: 1;
								}
								&.item-remark {
									flex: 1;
								}
							}
						}
					}
				}
			}
		}
	}
</style>