<template>
	<div class="body-wrapper" :check="checkStatus()">
		<layout-header></layout-header>
		<layout-menu></layout-menu>
		<nuxt v-if="isRouterAlive" />
		<layout-footer></layout-footer>

		<!-- Go Top -->
		<img class="gotop-img" src="/images/gotop.png" alt="" />
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	import LayoutHeader from '@/components/layout/LayoutHeader';
	import LayoutMenu from '@/components/layout/LayoutMenu';
	import LayoutFooter from '@/components/layout/LayoutFooter';

	export default {
		computed: {
			...mapGetters('auth', {
				authStatus: 'GetHttpStatus',
			}),
			...mapGetters('user', {
				userStatus: 'GetHttpStatus',
			}),
			...mapGetters('game', {
				gameStatus: 'GetHttpStatus',
			}),
			...mapGetters('wallet', {
				walletStatus: 'GetHttpStatus',
			}),
			...mapGetters('history', {
				historyStatus: 'GetHttpStatus',
			}),
		},
		components: {
			LayoutHeader,
			LayoutMenu,
			LayoutFooter,
		},
		data() {
			return {
				isRouterAlive: true,
			};
		},
		provide() {
			return {
				reload: this.reload,
			};
		},
		beforeMount() {
			const EXP = parseInt(localStorage.getItem('EXP'));
			const nowTime = Math.floor(Date.now() / 1000);
			if (nowTime - EXP > 600) {
				this.$store.commit('auth/INITIAL_STATE');
			}
		},
		mounted() {
			// Clean EXP and logout when close website
			// window.onunload = () => {
			// 	localStorage.setItem('EXP', 0);
			// 	this.$store.commit('auth/INITIAL_STATE');
			// };

			// Live Chat
			window.__lc = window.__lc || {};
			window.__lc.license = 10974082;
			(function () {
				var lc = document.createElement('script');
				lc.type = 'text/javascript';
				lc.async = true;
				lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(lc, s);
			})();

			// Show "Go Top" image
			$(window).scroll(function () {
				if (window.scrollY > 250) {
					$('.gotop-img').addClass('show');
				} else {
					$('.gotop-img').removeClass('show');
				}
			});

			// Scroll to top
			$('.gotop-img').click(function (e) {
				e.preventDefault();
				$('html, body').animate(
					{
						scrollTop: 0,
					},
					800
				);
			});

			// Loading Animation
			this.$nextTick(() => {
				this.$nuxt.$loading.start();
				setTimeout(() => {
					this.$nuxt.$loading.finish();
				}, 1500);
			});

			if (localStorage.getItem('isLogined') === 'true') {
				this.$store.commit('auth/LOGIN_SUCCESS', {
					data: JSON.parse(localStorage.getItem('userData')),
					status: 200,
				});
			}
		},
		methods: {
			// If Any Response Status Is "401", Logout And Go To Home Page
			checkStatus() {
				if (
					this.authStatus === 401 ||
					this.userStatus === 401 ||
					this.gameStatus === 401 ||
					this.walletStatus === 401 ||
					this.historyStatus === 401
				) {
					this.$store.commit('auth/INITIAL_STATE');
					this.$router.push(this.$i18n.path(''));
				}
			},

			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				});
			},
		},
	};
</script>
<style lang="scss">
	body {
		width: 100%;
		height: 100%;
	}

	.body-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.gotop-img {
		position: fixed;
		z-index: 10;
		right: 5px;
		bottom: 130px;
		width: 30px;
		opacity: 0;
		transition: all 0.2s;
		-webkit-transition: all 0.2s;
		-moz-transition: all 0.2s;

		&.show {
			opacity: 1;
		}
	}
</style>
