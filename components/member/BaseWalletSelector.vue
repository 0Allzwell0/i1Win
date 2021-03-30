<template>
	<div class="wallets-selector">
		<button :class="`wallet-${type}`" type="button" @click.stop="expandGameList()">
			{{ $t('common.please_select') }}
		</button>
		<fa :icon="['fas', 'caret-down']" class="icon-down" />
		<ul :class="{ show: showGamesList }">
			<li @click="selectGame('none', 0, 0)">{{ $t('common.please_select') }}</li>
			<li @click="selectGame('main', 1, 0)" :class="{ active: hideGame === 'main' }">
				<img :src="`/images/member/wallet/main.png`" alt="" />
				<span class="wallet-name">{{ $t('member.main_wallet') }}</span>
			</li>
			<li
				:class="{ active: hideGame === item.code.toLowerCase() }"
				v-for="(item, index) in wallets"
				:key="`transfer_game_${index}`"
				@click="selectGame(item.code.toLowerCase(), item.isActive, item.isBlocked)"
			>
				<img :src="`/images/member/wallet/${item.code.toLowerCase()}.png`" alt="" />
				<span class="maintenance-text" v-if="item.isBlocked !== 0">{{ $t('transfer.maintenance') }}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		props: {
			type: {
				type: String,
				default: null,
			},
			hideGame: {
				type: String,
				default: null,
			},
		},
		computed: {
			...mapGetters('wallet', {
				wallets: 'GetWallets',
			}),
		},
		data() {
			return {
				showGamesList: false,
				selectedFromGame: null,
				selectedToGame: null,
			};
		},
		mounted() {
			// When Touch Others Place, "Games" List Will Close
			$(document).click(() => {
				this.showGamesList = false;
			});
		},
		methods: {
			// Show Or Close Transfer Game List
			expandGameList() {
				this.showGamesList = !this.showGamesList;
			},

			// Select Transfer Game
			selectGame(game, isActive, isBlocked) {
				if (game === 'none') {
					this.setHtml('none');
					this.$emit('getHideGame', 'none');
					this.showGamesList = false;
				} else if (isActive === 1 && isBlocked !== 1) {
					if (this.type === 'from') {
						this.selectedFromGame = game;
						this.setHtml(this.selectedFromGame);
						this.$emit('getHideGame', this.selectedFromGame);
					} else {
						this.selectedToGame = game;
						this.setHtml(this.selectedToGame);
						this.$emit('getHideGame', this.selectedToGame);
					}

					this.showGamesList = false;
				}
			},

			// Set Image To Game Button Html
			setHtml(game) {
				if (game === 'none') {
					$(`.wallet-${this.type}`).text(this.$t('common.please_select'));
				} else if (game === 'main') {
					$(`.wallet-${this.type}`).html(
						`<img src="/images/member/wallet/main.png" alt="" /><span>${this.$t('member.main_wallet')}</span>`
					);
				} else {
					$(`.wallet-${this.type}`).html(`<img src="/images/member/wallet/${game}.png" alt="" />`);
				}
			},
		},
	};
</script>
<style lang="scss">
	.wallets-selector {
		position: relative;
		display: flex;
		width: 100%;
		height: 39px;
		border-radius: 5px;
		border: 1px solid #cecece;
		background: $color-white;

		> button {
			display: flex;
			align-items: center;
			width: 100%;
			font-size: 14px;
			background: $color-white;
			border-radius: 5px;
			text-align: left;
			padding-left: 10px;

			> img {
				width: 119px;
			}

			> span {
				margin-left: -85px;
			}
		}

		.icon-down {
			width: 15px;
			font-size: 20px;
			color: $color-black;
			align-self: center;
			margin-right: 8px;
		}

		> ul {
			display: none;
			position: absolute;
			z-index: 10;
			top: 38px;
			left: 0;
			width: 100%;
			height: 230px;
			font-weight: normal;
			font-size: 14px;
			border: 1px solid #cecece;
			background: $color-white;
			overflow-y: scroll;
			margin-bottom: 70px;

			&.show {
				display: block;
			}

			> li {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				border-bottom: 1px solid #cecece;
				padding: 10px 0 10px 10px;

				&.active {
					display: none;
				}

				> img {
					width: 119px;
				}

				.wallet-name {
					position: absolute;
					left: 45px;
				}

				.maintenance-text {
					margin-right: 15px;
				}
			}
		}
	}
</style>