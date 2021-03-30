<template>
	<ul class="member-navbar">
		<li>
			<nuxt-link :to="$i18n.path('member/deposit_thirdparty')" :class="{ active: $route.name.indexOf('deposit') !== -1 }">
				<img src="/images/member/nav/deposit.png" alt="" />
				<span>{{ $t('member.deposit') }}</span>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link :to="$i18n.path('member/withdrawal')" :class="{ active: $route.name.indexOf('withdrawal') !== -1 }">
				<img src="/images/member/nav/withdraw.png" alt="" />
				<span>{{ $t('member.withdrawal') }}</span>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link :to="$i18n.path('member/transfer')" :class="{ active: $route.name.indexOf('transfer') !== -1 }">
				<img src="/images/member/nav/transfer.png" alt="" />
				<span>{{ $t('member.transfer') }}</span>
			</nuxt-link>
		</li>
		<li>
			<nuxt-link :to="$i18n.path('member/history')" :class="{ active: $route.name.indexOf('history') !== -1 }">
				<img src="/images/member/nav/history.png" alt="" />
				<span>{{ $t('member.history') }}</span>
			</nuxt-link>
		</li>
	</ul>
</template>
<script>
	export default {};
</script>
<style lang="scss" scoped>
	.member-navbar {
		display: flex;
		flex-direction: row;
		font-family: $font-family;
		font-size: 14px;
		width: 100%;

		> li {
			flex: 1;
			display: flex;
			flex-direction: column;
			border-bottom: 2px solid $color-black-gray;
			border-right: 1px solid $color-black-gray;

			&:last-child {
				border-right: none;
			}

			> a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				background: $color-white;
				opacity: 0.4;

				&.active {
					opacity: 1;
					background: $color-yellow;
				}

				> img {
					align-self: center;
					width: 35px;
					padding-top: 9px;
				}

				> span {
					font-weight: bold;
					color: $color-black;
					text-align: center;
					align-self: center;
					padding: 4px 0;
				}
			}
		}
	}
</style>