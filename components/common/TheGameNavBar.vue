<template>
	<ul class="nav-bar-wrapper">
		<!-- Live Casino -->
		<li :class="{ active: $route.name.indexOf('livecasino') !== -1 }">
			<nuxt-link :to="$i18n.path('livecasino')">
				<img :src="$route.name.indexOf('livecasino') === -1 ? '/images/nav/livecasino.png' : '/images/nav/livecasino_active.png'" />
				<span>{{ $t('home.nav.livecasino') }}</span>
			</nuxt-link>
		</li>

		<!-- Sports -->
		<li :class="{ active: $route.name.indexOf('sports') !== -1 }">
			<nuxt-link :to="$i18n.path('sports')">
				<img :src="$route.name.indexOf('sports') === -1 ? '/images/nav/sports.png' : '/images/nav/sports_active.png'" />
				<span>{{ $t('home.nav.sports') }}</span>
			</nuxt-link>
		</li>

		<!-- Slots -->
		<li :class="{ active: $route.name.indexOf('slots') !== -1 }">
			<nuxt-link :to="$i18n.path('slots')">
				<img :src="$route.name.indexOf('slots') === -1 ? '/images/nav/slots.png' : '/images/nav/slots_active.png'" />
				<span>{{ $t('home.nav.slots') }}</span>
			</nuxt-link>
		</li>

		<!-- Lottery -->
		<li :class="{ active: $route.name.indexOf('lottery') !== -1 }">
			<nuxt-link :to="$i18n.path('lottery')">
				<img :src="$route.name.indexOf('lottery') === -1 ? '/images/nav/lottery.png' : '/images/nav/lottery_active.png'" />
				<span>{{ $t('home.nav.lottery') }}</span>
			</nuxt-link>
		</li>

		<!-- Fishing -->
		<li :class="{ active: $route.name.indexOf('fishing') !== -1 }">
			<nuxt-link :to="$i18n.path('fishing')">
				<img :src="$route.name.indexOf('fishing') === -1 ? '/images/nav/fishing.png' : '/images/nav/fishing_active.png'" />
				<span>{{ $t('home.nav.fishing') }}</span>
			</nuxt-link>
		</li>
	</ul>
</template>
<script>
	export default {};
</script>
<style lang="scss" scoped>
	.nav-bar-wrapper {
		display: flex;
		width: 100%;
		height: 100%;

		> li {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 100%;

			> a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				background: $color-black;
				width: 100%;
				height: 100%;

				> img {
					width: 31px;
					align-self: center;
					margin: 6px 0 4px 0;
				}

				> span {
					font-weight: bold;
					color: $color-gray;
					line-height: 26px;
					text-align: center;
				}
			}

			&.active {
				> a {
					> span {
						color: $color-yellow;
					}
				}
			}
		}
	}
</style>