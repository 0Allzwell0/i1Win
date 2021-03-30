<template>
	<div>
		<!-- Game Modal -->
		<modal-game-play ref="child" :game-img="gameImg" :game-name="gameName"></modal-game-play>

		<div class="games-content">
			<ul id="gamesList"></ul>
			<div class="pagination-selector">
				<button class="btn-prev" type="button" data-page="prev">{{ $t('slots.previous') }}</button>
				<ul id="pagePagination"></ul>
				<button class="btn-next" type="button" data-page="next">{{ $t('slots.next') }}</button>
			</div>
		</div>

		<!-- No Games -->
		<div class="no-games">
			<img src="/images/slots/icon_exclamation.svg" alt="" />
			<p>{{ $t('slots.no_game_msg') }}</p>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import ModalGamePlay from '@/components/modal/ModalGamePlay';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
			}),
			...mapGetters('game', {
				gamesList: 'GetGamesList',
				gameURL: 'GetGameURL',
				httpStatus: 'GetHttpStatus',
				errorMsg: 'GetErrorMsg',
				networkError: 'GetNetworkError',
			}),
		},
		components: {
			ModalGamePlay,
		},
		props: {
			productCode: {
				type: String,
				default: '',
			},
			selectedType: {
				type: String,
				default: 'all',
			},
		},
		data() {
			return {
				allDataSize: null,
				pageSize: 24,
				lastPageSize: null,
				totalPages: null,
				currentPage: 1,
				gameImg: null,
				gameName: null,
			};
		},
		mounted() {
			setTimeout(() => {
				if (this.productCode !== 'pgsl') this.loadGames('all');
			}, 100);

			// Selected Page or Go Prev of Go Next
			$('.pagination-selector').click((el) => {
				if (this.allDataSize) {
					// 點擊到的頁碼
					el.preventDefault();
					let className = el.target.nodeName;
					let choosePage = el.target.dataset.page;

					if (className === 'LI') {
						this.currentPage = Number(choosePage);
					} else if (className === 'BUTTON') {
						if (choosePage === 'prev' && this.currentPage !== 1) {
							this.currentPage = this.currentPage - 1;
						} else if (choosePage === 'next' && this.currentPage !== this.totalPages) {
							this.currentPage = this.currentPage + 1;
						}
					}

					$('#gamesList').empty();
					$('#pagePagination').empty();

					this.setSelector();
					this.renderGames();
					$('html, body').animate(
						{
							scrollTop: 0,
						},
						800
					);
				}
			});
		},
		methods: {
			// Initial Data
			initialData() {
				this.allDataSize = null;
				this.pageSize = 24;
				this.lastPageSize = null;
				this.totalPages = null;
				this.currentPage = 1;

				$('#gamesList').empty();
				$('#pagePagination').empty();

				$('.pagination-selector > button').attr('disabled', true);
			},

			// Load Games
			loadGames(type) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.initialData();

				this.$store
					.dispatch(this.isLogined ? 'game/getGamesAfter' : 'game/getGamesBefore', {
						productCode: this.productCode,
						tab: type,
					})
					.then(() => {
						if (this.gamesList && this.gamesList.length > 0) {
							$('.no-games').removeClass('show');
							$('.games-content').addClass('show');
							this.allDataSize = this.gamesList;
							this.lastPageSize = this.allDataSize.length % this.pageSize;
							this.setSelector();
							this.renderGames();
						} else {
							$('.no-games').addClass('show');
							$('.games-content').removeClass('show');
						}

						// Hide Loading Animation
						this.$nuxt.$loading.finish();
					});
			},

			setSelector() {
				let startPageNumber = null;
				let endPageNumber = null;

				this.totalPages = Math.ceil(this.allDataSize.length / this.pageSize);

				// 總頁數小於4
				if (this.totalPages > 0 && this.totalPages <= 4) {
					startPageNumber = 1;
					endPageNumber = this.totalPages;
					this.renderSelector(startPageNumber, endPageNumber);
				} else if (this.totalPages > 4) {
					// 總頁數大於4頁，只印出4個頁碼
					if (this.currentPage >= 1 && this.currentPage <= 2) {
						// 目前點擊的頁碼 <= 2
						startPageNumber = 1;
						endPageNumber = 4;
						this.renderSelector(startPageNumber, endPageNumber);
					} else if (this.currentPage >= this.totalPages - 1 && this.currentPage <= this.totalPages) {
						// 目前點擊的頁碼是倒數 2 頁
						startPageNumber = this.totalPages - 3;
						endPageNumber = this.totalPages;
						this.renderSelector(startPageNumber, endPageNumber);
					} else {
						startPageNumber = this.currentPage - 2;
						endPageNumber = this.currentPage + 1;
						this.renderSelector(startPageNumber, endPageNumber);
					}
				}
			},

			// Render Selector
			renderSelector(startPage, endPage) {
				for (let i = startPage; i <= endPage; i++) {
					if (i === this.currentPage) {
						$('#pagePagination').append('<li class="active" data-page="' + i + '">' + i + '</li>');
					} else {
						$('#pagePagination').append('<li data-page="' + i + '">' + i + '</li>');
					}
				}

				if (this.currentPage === this.totalPages && this.totalPages > 1) {
					$('.btn-prev').attr('disabled', false);
					$('.btn-next').attr('disabled', true);
				} else if (this.currentPage === 1 && this.totalPages > 1) {
					$('.btn-prev').attr('disabled', true);
					$('.btn-next').attr('disabled', false);
				} else if (this.currentPage === 1 && this.totalPages <= 1) {
					$('.btn-prev, .btn-next').attr('disabled', true);
				} else {
					$('.btn-prev, .btn-next').attr('disabled', false);
				}
			},

			// Render Games
			renderGames() {
				let startIndex = null;
				let endIndex = null;

				startIndex = (this.currentPage - 1) * this.pageSize;
				if (this.currentPage === this.totalPages && this.lastPageSize !== 0) {
					endIndex = startIndex + this.lastPageSize;
				} else {
					endIndex = this.currentPage * this.pageSize;
				}

				for (let i = startIndex; i < endIndex; i++) {
					$('#gamesList').append(
						`<li data-id="${this.allDataSize[i].id}"><img src="${this.allDataSize[i].image}" alt="${this.allDataSize[i].name}" /></li>`
					);
				}

				this.setClick();
			},

			// Set Games Element To Be Able To Click
			setClick() {
				$('#gamesList > li').click((el) => {
					let game_id = $(el.currentTarget).data('id');
					this.gameName = $(el.currentTarget).children().attr('alt');
					this.gameImg = $(el.currentTarget).children().attr('src');

					if (this.isLogined) {
						// Show Loading Animation
						this.$nuxt.$loading.start();

						this.$store
							.dispatch('game/getGameURL', {
								category: 'slot',
								product_code: this.productCode,
								game_id,
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
						this.$refs.child.showModal();
					}
				});
			},

			// Search Games
			searchGames(gameName) {
				// Show Loading Animation
				this.$nuxt.$loading.start();

				this.initialData();

				this.$store.dispatch('game/searchGames', gameName).then(() => {
					if (this.gamesList && this.gamesList.length > 0) {
						$('.type-navbar > li').removeClass('active');
						$('.no-games').removeClass('show');
						$('.games-content').addClass('show');
						this.allDataSize = this.gamesList;
						this.lastPageSize = this.allDataSize.length % this.pageSize;
						this.setSelector();
						this.renderGames();
					} else {
						$('.no-games').addClass('show');
						$('.games-content').removeClass('show');
					}

					// Hide Loading Animation
					this.$nuxt.$loading.finish();
				});
			},
		},
	};
</script>
<style lang="scss">
	.games-content {
		display: none;
		width: 100%;
		height: 100%;

		&.show {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		> ul {
			width: 100%;
			padding: 0 4% 35px 4%;

			> li {
				display: inline-block;
				width: calc((100% - 13.2%) / 3);
				height: calc((100% - 13.2%) / 3);
				margin-top: 5%;
				background: $color-black;
				border-radius: 5px;
				text-align: center;

				&:not(:nth-child(3n)) {
					margin-right: 6.6%;
				}

				> img {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
		}

		.pagination-selector {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30px;

			> button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 75px;
				height: 100%;
				font-size: 14px;
				color: $color-white;
				border-radius: 5px;
				border: 1px solid $color-white;
				background: transparent;

				&:disabled {
					opacity: 0.4;
				}
			}

			> ul {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				margin: 0 10px;

				> li {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30px;
					height: 100%;
					color: $color-white;
					border: 1px solid $color-white;
					border-radius: 50%;
					margin-right: 10px;

					&:last-child {
						margin-right: 0;
					}

					&.active {
						color: $color-black;
						border: 0;
						box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.2);
						background: $color-yellow-linear;
					}
				}
			}
		}
	}

	.no-games {
		display: none;
		width: 100%;
		padding-top: 30px;

		&.show {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		> img {
			width: 30%;
		}

		> p {
			font-family: sans-serif;
			font-size: 16px;
			color: $color-black;
			text-align: center;
			padding-top: 10px;
		}
	}
</style>