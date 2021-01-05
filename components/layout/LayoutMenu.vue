<template>
	<aside class="menu-background" @click="closeMenu()">
		<div class="menu-wrapper">
			<div class="menu-head">
				<img class="menu-logo-img" src="/images/menu/logo.png" alt="Menu" />
				<!-- 登入 (尚未登入前顯示) -->
				<nuxt-link :to="$i18n.path('login')" v-if="!isLogined">{{ $t('common.login') }}</nuxt-link>

				<!-- 登出 (已登入後顯示) -->
				<button type="button" @click="logout()" v-if="isLogined">{{ $t('menu.logout') }}</button>
				<fa :icon="['fas', 'times']" class="menu-close" @click="closeMenu()" />
			</div>
			<ul>
				<!-- 登入後才顯示 Start -->
				<li class="title-text" v-if="isLogined">{{ $t('menu.account') }}</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('member/edit_profile')" v-if="isLogined">{{ $t('menu.edit_profile') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('member/change_password')" v-if="isLogined">{{ $t('menu.change_psw') }}</nuxt-link>
				</li>

				<!-- 登入後才顯示 End -->
				<li class="title-text">{{ $t('menu.infor_center') }}</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/about-us')">{{ $t('menu.about_us') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/how-to-join')">{{ $t('menu.how_to_join') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/support')">{{ $t('menu.support') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/responsible-gaming')">{{ $t('menu.responsible_gaming') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/terms-of-use')">{{ $t('menu.terms_of_use') }}</nuxt-link>
				</li>
				<li class="item-wrapper">
					<nuxt-link :to="$i18n.path('articles/privacy-policy')">{{ $t('menu.privacy_policy') }}</nuxt-link>
				</li>

				<!-- Download -->
				<li class="download-wrapper">
					<nuxt-link :to="$i18n.path('download_casino')">
						<span class="title-text">{{ $t('menu.download') }}</span>
						<img src="/images/menu/download.png" :alt="$t('menu.download')" />
					</nuxt-link>
				</li>

				<!-- Language -->
				<li class="lang-wrapper">
					<span class="title-text">{{ $t('menu.language') }}</span>
					<div class="lang-container">
						<img
							:class="{ active: nowLanguage === 'th-TH' }"
							src="/images/menu/language_th.png"
							data-language="th-TH"
							alt="th-TH"
						/>
						<img
							:class="{ active: nowLanguage === 'en-US' }"
							src="/images/menu/language_en.png"
							data-language="en-US"
							alt="en-US"
						/>
					</div>
				</li>

				<!-- Follow Us -->
				<li class="follow-us-wrapper">
					<span class="title-text">{{ $t('menu.follow_us') }}</span>
					<div class="follow-us-container">
						<img src="/images/menu/facebook.png" alt="Facebook" />
						<img src="/images/menu/youtube.png" alt="Youtube" />
						<img src="/images/menu/twitter.png" alt="Twitter" />
						<img src="/images/menu/instagram.png" alt="Instagram" />
					</div>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
			}),
			...mapGetters({
				nowLanguage: 'GetLanguage',
			}),
		},

		mounted() {
			let _this = this;
			$('.menu-head').click(function (event) {
				event.stopPropagation();
			});
			$('.menu-wrapper > li').click(function (event) {
				event.stopPropagation();
			});

			/**
			 * When
			 * 1. Change Language
			 * 2. Go To "Login"、"Download"、"Article" Pages
			 * 3. "Logout
			 * Close Menu
			 */
			$('.menu-head > button, .menu-head > a, .item-wrapper, .download-wrapper, .lang-container > img').click(() => {
				this.closeMenu();
			});

			// Change Language
			$('.lang-container > img').click(function (el) {
				let fallbackLocale = _this.$i18n.fallbackLocale;
				let currentLocale = _this.nowLanguage;
				let chooseLanguage = $(this).data('language');
				let url = null;

				window.localStorage.setItem('LANGUAGE', chooseLanguage);

				// If the language selected is the current language  => Dont move
				if (chooseLanguage === currentLocale) {
					return;
				}

				// If the selected language is the default language
				if (chooseLanguage !== currentLocale && chooseLanguage === fallbackLocale) {
					_this.$store.commit('LANGUAGE', chooseLanguage);
					url = window.location.pathname.replace(`/${currentLocale}`, '');
					_this.$router.push(url);
				}

				// If the selected language is not the default language
				if (chooseLanguage !== currentLocale && chooseLanguage !== fallbackLocale) {
					_this.$store.commit('LANGUAGE', chooseLanguage);
					url = `/${chooseLanguage}${window.location.pathname}`;
					_this.$router.push(url);
				}
			});
		},

		methods: {
			// Logout
			logout() {
				this.$store.commit('auth/INITIAL_STATE');
				this.closeMenu();
				setTimeout(() => {
					this.$router.push(this.$i18n.path(''));
				}, 300);
			},

			// Close Menu Side Bar
			closeMenu() {
				$('.menu-wrapper').removeClass('show-menu');
				setTimeout(() => {
					$('.menu-background').css('display', 'none');
				}, 200);
				$('html, body').removeClass('freezePage');
			},
		},
	};
</script>

<style lang="scss" scoped>
	.menu-background {
		display: none;
		position: fixed;
		z-index: 11;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);

		.menu-wrapper {
			position: relative;
			height: 100%;
			background: transparent;
			overflow-y: auto;
			font-family: $font-family;
			font-weight: bold;

			-webkit-transform: translate(-317px, 0px);
			-ms-transform: translate(-317px, 0px);
			transform: translate(-317px, 0px);
			-webkit-transition: -webkit-transform 300ms;
			transition: transform 300ms;

			.menu-head {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 280px;
				background: $color-black;
				-webkit-box-shadow: 3px 3px 10px #424242;
				box-shadow: 3px 3px 10px #424242;

				> img {
					height: 45px;
					margin: 4.2px 0 4.2px 9.5px;
				}

				> button,
				> a {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 85px;
					height: 31px;
					font-size: 14px;
					font-weight: bold;
					color: $color-yellow;
					background: transparent;
					border: $border-style;
					margin-right: 15px;
				}

				.menu-close {
					position: absolute;
					top: 25%;
					left: 104%;
					font-size: 25px;
					color: #f8f6f6;
				}
			}

			> ul {
				width: 280px;
				min-height: calc(100% - 49px);
				background: $color-black;

				.title-text {
					font-size: 17px;
					color: $color-yellow;
					padding: 14px 0 12px 14px;
				}

				.item-wrapper {
					display: flex;
					font-size: 16px;
					background: #f8f6f6;

					> a {
						display: flex;
						align-items: center;
						font-weight: normal;
						color: $color-black-gray;
						width: 100%;
						height: 50px;
						border-top: 1px solid $color-black-gray;
						padding-left: 28px;
					}
				}

				.download-wrapper {
					display: flex;
					width: 100%;
					border-top: 4px solid $color-gray;

					> a {
						flex: 1;
						display: flex;
						align-items: center;
						width: 100%;
						padding: 6.5px 0;

						> img {
							margin-left: 18px;
							height: 29px;
						}
					}
				}

				.lang-wrapper {
					display: flex;
					width: 100%;
					border-top: 2px solid $color-gray;
					border-bottom: 2px solid $color-gray;
					padding: 6.5px 0;

					.lang-container {
						flex: 1;
						display: flex;
						align-items: center;
						margin-left: 18px;

						> img {
							height: 29px;
							filter: brightness(60%);

							&:first-child {
								margin-right: 16px;
							}

							&.active {
								filter: brightness(110%);
							}
						}
					}
				}

				.follow-us-wrapper {
					display: flex;
					width: 100%;
					padding: 6.5px 0;
					border-bottom: 4px solid $color-gray;

					.follow-us-container {
						flex: 1;
						display: flex;
						align-items: center;
						margin-left: 18px;

						> img {
							height: 29px;
							margin-right: 16px;

							&:last-child {
								margin-right: 0;
							}
						}
					}
				}
			}
		}

		.show-menu {
			-webkit-transform: translate(0px, 0px);
			-ms-transform: translate(0px, 0px);
			transform: translate(0px, 0px);
			-webkit-transition: -webkit-transform 300ms;
			transition: transform 300ms;
		}
	}
</style>
