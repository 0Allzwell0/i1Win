<template>
	<main class="slots-game-wrapper">
		<!-- Message Modal -->
		<modal-message></modal-message>

		<!-- Carousel -->
		<the-carousel></the-carousel>

		<!-- Announcement -->
		<the-announcement></the-announcement>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<div class="slots-game-container">
			<ul>
				<!-- Game Vendor Selecter -->
				<li class="selector-vendor">
					<button type="button" @click.stop="showVendorList()"></button>
					<fa :icon="['fas', 'caret-down']" class="icon-down" />
					<ul>
						<li v-for="(vendor, index) in vendorList" :key="`vendor_${index}`">
							<nuxt-link :to="$i18n.path(`slots/${vendor}`)">
								<img :src="`/images/member/wallet/${vendor}.png`" />
							</nuxt-link>
						</li>
					</ul>
				</li>

				<!-- Game Type Selecter -->
				<li class="selector-type">
					<button type="button" @click.stop="showTypeList()">{{ $t('slots.all') }}</button>
					<fa :icon="['fas', 'caret-down']" class="icon-down" />
					<ul>
						<li :class="`type-${type}`" v-for="(type, index) in typeList" :key="`type_${index}`" @click="selectType(type)">
							{{ $t(`slots.${type}`) }}
						</li>
					</ul>
				</li>
			</ul>

			<!-- Games List -->
			<the-slots-game-list ref="child" :selected-type="selectedType" :product-code="productCode"></the-slots-game-list>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalMessage from '@/components/modal/ModalMessage';
	import TheCarousel from '@/components/common/TheCarousel';
	import TheAnnouncement from '@/components/common/TheAnnouncement';
	import TheGameNavBar from '@/components/common/TheGameNavBar';
	import TheSlotsGameList from '@/components/common/TheSlotsGameList';

	export default {
		components: {
			TheCarousel,
			TheAnnouncement,
			TheGameNavBar,
			TheSlotsGameList,
			ModalMessage,
		},
		data() {
			return {
				vendorList: ['ygg', 'spg', 'jili', 'bng', 'plt', 'gpi', 'cq9', 'jok', 'mg', 'dt', 'ifun', 'ks9', 'sp', 'maja', 'pplay'],
				typeList: ['all', 'popular', 'new', 'jackpot', 'table'],
				productCode: null,
				selectedType: 'all',
				showVendor: false,
				showType: false,
			};
		},
		mounted() {
			this.productCode = this.$route.params.vendor;

			// Show Tthe Vendor's Image Of The Selected Game
			$('.selector-vendor > button').html(`<img src="/images/member/wallet/${this.productCode}.png" alt />`);

			// Set Game Tab CSS
			$('.type-all').addClass('active');

			// When Touch Others Places, Close "Vendor" List or "Yype" List
			$(document).click(() => {
				if (this.showVendor) {
					this.showVendor = false;
					$('.selector-vendor > ul').removeClass('show');
				}

				if (this.showType) {
					this.showType = false;
					$('.selector-type > ul').removeClass('show');
				}
			});
		},
		methods: {
			// Show or Hidden Game Vendor List
			showVendorList() {
				this.showType = false;
				$('.selector-type > ul').removeClass('show');

				if (!this.showVendor) {
					$('.selector-vendor > ul').addClass('show');
				} else {
					$('.selector-vendor > ul').removeClass('show');
				}

				this.showVendor = !this.showVendor;
			},

			// Show or Hidden Game Type List
			showTypeList() {
				this.showVendor = false;
				$('.selector-vendor > ul').removeClass('show');

				if (!this.showType) {
					$('.selector-type > ul').addClass('show');
				} else {
					$('.selector-type > ul').removeClass('show');
				}

				this.showType = !this.showType;
			},

			// Select Game Type
			selectType(type) {
				$('.selector-type > button').text(this.$t(`slots.${type}`));
				$('.selector-type > ul > li').removeClass('active');
				$(`.type-${type}`).addClass('active');
				this.selectedType = type;
				this.$refs.child.loadGames();
			},
		},
	};
</script>
<style lang="scss">
	.slots-game-wrapper {
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: $font-family;

		.slots-game-container {
			width: 100%;
			min-height: 62vh;
			background: $background_img;
			background-size: cover;
			padding: 18px 18px 70px 18px;

			> ul {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				> li {
					.icon-down {
						font-size: 20px;
						color: $color-black;
						margin: 0 10px 0 0;
					}
				}

				.selector-vendor {
					position: relative;
					display: flex;
					align-items: center;
					width: 160px;
					min-height: 40px;
					border-radius: 5px;
					box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
					border: 1px solid rgba(25, 25, 25, 0.6);
					background: $color-white;

					> button {
						width: 100%;
						min-height: 40px;
						border-radius: 5px;
						background: transparent;
						text-align: left;
						padding: 0 0 0 10px;

						> img {
							width: 100%;
						}
					}

					> ul {
						position: absolute;
						z-index: -1;
						top: 41px;
						left: -1px;
						width: 101%;
						height: 0;
						border-radius: 5px;
						box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
						border: 1px solid rgba(25, 25, 25, 0.6);
						background-color: #f8f8f8;
						overflow-y: scroll;

						transition: z-index 0.4s, height 0.4s;
						-webkit-transition: z-index 0.4s, height 0.4s;
						-moz-transition: z-index 0.4s, height 0.4s;
						-o-transition: z-index 0.4s, height 0.4s;

						&.show {
							z-index: 10;
							height: 180px;
						}

						> li {
							width: 100%;
							border-bottom: 1px solid rgba(25, 25, 25, 0.6);

							> a {
								> img {
									width: 90%;
									padding: 5px 0 5px 10px;
								}
							}
						}
					}
				}

				.selector-type {
					position: relative;
					display: flex;
					align-items: center;
					width: 110px;
					min-height: 40px;
					border-radius: 5px;
					box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
					border: 1px solid rgba(25, 25, 25, 0.6);
					background: #f8f8f8;

					> button {
						width: 100%;
						min-height: 40px;
						font-size: 16px;
						font-weight: bold;
						border-radius: 5px;
						background-color: transparent;
						text-align: left;
						padding: 0 0 0 10px;
					}

					> ul {
						position: absolute;
						top: 41px;
						left: 0;
						z-index: -1;
						width: 101%;
						height: 0;
						border-radius: 5px;
						box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
						border: 1px solid rgba(25, 25, 25, 0.6);
						background-color: #f8f8f8;
						overflow-y: scroll;

						transition: z-index 0.4s, height 0.4s;
						-webkit-transition: z-index 0.4s, height 0.4s;
						-moz-transition: z-index 0.4s, height 0.4s;
						-o-transition: z-index 0.4s, height 0.4s;

						&.show {
							z-index: 10;
							height: 162px;
						}

						> li {
							width: 100%;
							color: $color-black;
							font-weight: bold;
							font-size: 15px;
							padding: 7px 0 7px 10px;

							&.active {
								width: 100%;
								opacity: 0.9;
								box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
								background: $color-yellow;
							}
						}
					}
				}
			}
		}
	}
</style>