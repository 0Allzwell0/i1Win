<template>
	<header>
		<!-- Menu -->
		<img src="/images/header/menu.png" @click="showMenu()" alt />

		<!-- Logo -->
		<h1>
			<nuxt-link :to="$i18n.path('')" title="i1win Home">
				<img src="/images/header/logo.png" alt="i1win" />
			</nuxt-link>
		</h1>

		<!-- 尚未登入前顯示 -->
		<div class="header-btn-wrapper" v-if="!isLogined">
			<nuxt-link :to="$i18n.path('login')">{{ $t('common.login') }}</nuxt-link>
			<nuxt-link class="header-register" :to="$i18n.path('register')">{{ $t('common.register') }}</nuxt-link>
		</div>

		<!-- 已登入後顯示 -->
		<nuxt-link :to="$i18n.path('member/deposit_thirdparty')" v-if="isLogined">{{ $t('member.deposit') }}</nuxt-link>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
			}),
		},
		methods: {
			// Show Menu
			showMenu() {
				$('.menu-background').show();
				setTimeout(() => {
					$('.menu-wrapper').addClass('show-menu');
				}, 100);
				$('html, body').addClass('freezePage');
			},
		},
	};
</script>

<style lang="scss" scoped>
	header {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		font-family: $font-family;
		font-size: 12px;
		width: 100%;
		background: $color-black;
		padding: 2px 0 9px 0;

		> img {
			height: 25px;
			margin: 8px 0 0 15px;
		}

		> h1 {
			width: 90px;
			padding-right: 5px;
			margin-left: 11px;

			> a {
				width: 100%;

				> img {
					width: 100%;
				}
			}
		}

		.header-btn-wrapper {
			position: absolute;
			right: 7px;
			top: 11px;
			font-size: 14px;

			> a {
				display: inline-block;
				width: 80px;
				color: $color-yellow;
				background: transparent;
				border: $border-style;
				text-align: center;
				padding: 5px 0;
				margin-right: 5px;
			}

			.header-register {
				color: $color-black;
				background: $color-yellow-linear;
				margin-right: 0;
			}
		}

		> a {
			position: absolute;
			right: 7px;
			top: 11px;
			width: 80px;
			font-size: 14px;
			color: $color-yellow;
			border: $border-style;
			text-align: center;
			padding: 5px 0;
		}
	}
</style>
