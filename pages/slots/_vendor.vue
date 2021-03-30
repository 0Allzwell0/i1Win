<template>
	<main class="slots-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<div class="slots-container" :class="{ 'is-pgsl': productCode === 'pgsl' }">
			<div class="black-content">
				<!-- Vendor Navigation Bar -->
				<ul class="vendor-navbar">
					<li
						v-for="(item, index) in vendorList"
						:key="`slots-${index}`"
						:class="[`vendor-${item[0]}`, { active: productCode === item[0] }]"
					>
						<nuxt-link :to="$i18n.path(`slots/${item[0]}`)">
							<img :src="`/images/slots/gm_${item[0]}.png`" alt="" />
						</nuxt-link>
					</li>
				</ul>

				<!-- Type Navigation Bar -->
				<ul class="type-navbar" :class="{ disabled: productCode === 'pgsl' }">
					<li
						:class="[`type-${type}`, { active: selectedType === type }]"
						v-for="(type, index) in typeList"
						:key="`type-${index}`"
						@click="selectType(type)"
					>
						{{ $t(`slots.${type}`) }}
					</li>
				</ul>

				<!-- Search -->
				<div class="search-form" :class="{ disabled: productCode === 'pgsl' }">
					<div class="form-wrapper">
						<img class="icon-search" src="/images/slots/icon_search.svg" alt="" />
						<input
							class="form-search"
							type="text"
							v-model="gameName"
							:placeholder="$t('slots.search_msg')"
							minlength="3"
							maxlength="8"
						/>
					</div>
				</div>
			</div>

			<!-- PGSL Content -->
			<div class="pgsl-content" v-show="productCode === 'pgsl'">
				<button type="button" @click="openPGSL()">
					<img src="/images/slots/pgsl_banner.jpg" alt="PGSL" />
				</button>
			</div>

			<!-- Games List -->
			<the-slots-game-list
				v-show="productCode !== 'pgsl'"
				ref="child"
				:selectedType="selectedType"
				:product-code="productCode"
			></the-slots-game-list>
		</div>
	</main>
</template>
<script>
	import { SLOTS } from '~/environment';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheGameNavBar from '@/components/common/TheGameNavBar';
	import TheSlotsGameList from '@/components/common/TheSlotsGameList';

	export default {
		components: {
			TheGameNavBar,
			TheSlotsGameList,
			ModalMessage,
		},
		data() {
			return {
				vendorList: SLOTS,
				typeList: ['all', 'popular', 'favorite', 'new', 'jackpot', 'table'],
				productCode: this.$route.params.vendor ? this.$route.params.vendor : SLOTS[0][0],
				selectedType: 'all',
				gameName: null,
			};
		},
		beforeMount() {
			let currentState = history.state;
			if (!this.$route.params.vendor) {
				history.pushState(currentState, null, `${this.$route.path}/${this.vendorList[0][0]}`);
			}
		},
		mounted() {
			$('.vendor-navbar').animate(
				{
					scrollLeft: $('.vendor-navbar > li.active').offset().left - 20,
				},
				0
			);

			// When Input Click Event Is "Enter" => Search Game
			$('.form-search').keydown((e) => {
				if (e.keyCode == 13 /* Enter or Tab */) {
					if (this.gameName.indexOf(' ') !== -1) {
						this.gameName = this.gameName.substring(0, this.gameName.indexOf(' '));
					}
					this.$refs.child.searchGames(this.gameName);
				}
			});

			// Search
			$('.icon-search').click(() => {
				if (this.gameName.indexOf(' ') !== -1) {
					this.gameName = this.gameName.substring(0, this.gameName.indexOf(' '));
				}
				this.$refs.child.searchGames(this.gameName);
			});
		},
		methods: {
			// Selete Slots Types
			selectType(type) {
				$('.type-navbar > li').removeClass('active');
				$(`.type-navbar > li.type-${type}`).addClass('active');
				this.selectedType = type;
				this.$refs.child.loadGames(this.selectedType);
			},

			// Open PGSL Game
			openPGSL() {
				if (this.isLogined) {
					// Show Loading Animation
					this.$nuxt.$loading.start();

					this.$store
						.dispatch('game/getGameURL', {
							category: 'slot',
							product_code: 'pgsl',
						})
						.then(() => {
							// Hide Loading Animation
							this.$nuxt.$loading.finish();

							$('.msg-list').html('');
							if (this.httpStatus && !this.networkError) {
								if (this.httpStatus === 200) {
									window.open(this.gameURL);
								} else {
									if (this.httpStatus === 403) {
										$('.msg-list').append(`<li>${this.$t('common.error_403')}</li>`);
									} else {
										$('.msg-list').append(`<li>${this.errorMsg}</li>`);
									}

									$('#modalMessage').modal('show');
								}
							} else {
								$('.msg-list').append(`<li>${this.$t('common.network_error')}</li>`);
								$('#modalMessage').modal('show');
							}
						});
				} else {
					$('.msg-list').html('');
					$('.msg-list').append(`<li>${this.$t('common.please_login')}</li>`);
					$('#modalMessage').modal('show');
				}
			},
		},
	};
</script>
<style lang="scss">
	.slots-wrapper {
		width: 100%;
		font-size: 12px;
		font-family: $font-family;
		background: $background_img;
		background-size: cover;

		.slots-container {
			width: 100%;
			min-height: calc(100vh - 177px);
			background: $color-black;
			padding-bottom: 90px;

			.black-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				background: $color-black;
				padding: 0 4%;

				.vendor-navbar {
					display: inline-block;
					width: 100%;
					white-space: nowrap;
					overflow-x: scroll;
					background: $color-black;
					padding: 20px 0;

					> li {
						display: inline-block;
						width: 50px;
						height: 50px;
						border-radius: 50%;
						box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);
						border: solid 2px rgba(217, 217, 217, 0.1);
						background-color: #0b131f;
						margin-right: 10px;

						&.active {
							border: 2px solid #f1cc50;
						}

						> a {
							display: block;
							width: 100%;
							height: 100%;

							> img {
								width: 100%;
							}
						}

						&.vendor-all {
							> a {
								display: flex;
								justify-content: center;
								align-items: center;
								color: $color-white;
							}

							&.active {
								> a {
									color: #f1cc50;
								}
							}
						}
					}
				}

				.type-navbar {
					display: inline-block;
					width: 100%;
					overflow-x: auto;
					white-space: nowrap;
					background: $color-black;
					padding-bottom: 5px;

					&.disabled {
						pointer-events: none;
						filter: brightness(0.4);
					}

					> li {
						display: inline-block;
						width: 16%;
						min-width: 47px;
						max-width: 63px;
						color: $color-white;
						font-size: 15px;
						line-height: 24px;
						border-bottom: 1.5px solid transparent;
						text-align: center;
						margin: 0 5px;
						padding-bottom: 5px;

						&.active {
							color: rgb(253, 214, 9);
							border-bottom: 1.5px solid rgb(253, 214, 9);
						}
					}
				}

				.search-form {
					display: flex;
					justify-content: center;
					width: 100%;
					background: #040911;
					padding: 15px 0;

					&.disabled {
						pointer-events: none;
						filter: brightness(0.4);
					}

					.form-wrapper {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 90%;
						max-width: 394px;
						background: $color-white;
						border-radius: 30px;

						> img {
							width: 60px;
							padding: 0 15px 0 20px;
						}

						> input {
							flex: 1;
							width: 100%;
							font-size: 18px;
							color: $color-black;
							min-height: 40px;
							border-radius: 30px 0 0 30px;
							background: 0 0;

							&::-webkit-input-placeholder {
								/* WebKit browsers */
								font-size: 14px;
							}

							&:-moz-placeholder {
								/* Mozilla Firefox 4 to 18 */
								font-size: 14px;
							}

							&::-moz-placeholder {
								/* Mozilla Firefox 19+ */
								font-size: 14px;
							}

							&:-ms-input-placeholder {
								/* Internet Explorer 10+ */
								font-size: 14px;
							}
						}
					}
				}
			}

			.pgsl-content {
				width: 100%;
				min-height: calc(100vh - 463px);
				background: $color-black;

				> button {
					width: 100%;

					> img {
						width: 100%;
					}
				}
			}
		}
	}
</style>