<template>
	<div class="body-wrapper" :check="checkStatus()">
		<layout-header></layout-header>
		<layout-menu></layout-menu>
		<nuxt />
		<layout-footer></layout-footer>
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
		mounted() {
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
</style>
