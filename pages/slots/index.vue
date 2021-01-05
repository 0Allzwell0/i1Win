<template>
	<main class="slots-wrapper">
		<!-- Carousel -->
		<the-carousel></the-carousel>

		<!-- Announcement -->
		<the-announcement></the-announcement>

		<!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
		<the-game-nav-bar></the-game-nav-bar>

		<!-- Games -->
		<div class="slots-container">
			<ul>
				<li v-for="(item, index) in gameList" :key="`slots-${index}`">
					<nuxt-link :to="$i18n.path(`slots/${item[0]}`)">
						<div class="text-wrapper">
							<span class="game-name">{{ item[1] }}</span>
							<span class="game-type">SLOTS</span>
						</div>
						<img :src="`/images/slots/${item[0]}.png`" :alt="item[1]" />
					</nuxt-link>
				</li>
			</ul>
		</div>
	</main>
</template>
<script>
	import { SLOTS } from '~/environment';
	import TheCarousel from '@/components/common/TheCarousel';
	import TheAnnouncement from '@/components/common/TheAnnouncement';
	import TheGameNavBar from '@/components/common/TheGameNavBar';

	export default {
		components: {
			TheCarousel,
			TheAnnouncement,
			TheGameNavBar,
		},
		data() {
			return {
				gameList: SLOTS,
			};
		},
		mounted() {
			// Set Game Tab CSS
			$('.tab-container').removeClass('active');
			$('.tab-slots').addClass('active');
		},
	};
</script>
<style lang="scss" scoped>
	.slots-wrapper {
		width: 100%;
		height: 100%;
		font-size: 12px;
		font-family: $font-family;

		.slots-container {
			width: 100%;
			min-height: 62vh;
			background: $background_img;
			background-size: cover;
			padding-bottom: 70px;

			> ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 100%;
				height: 100%;

				> li {
					position: relative;
					width: 28%;
					background: $color-black;
					border-radius: 10px;
					margin: 4% 0 0 4%;

					> a {
						width: 100%;
						height: 100%;

						.text-wrapper {
							position: absolute;
							top: 7px;
							left: 7px;

							.game-name {
								color: $color-white;
								font-size: 16px;
								line-height: 18px;
							}

							.game-type {
								color: #fdd609;
							}
						}

						> img {
							width: 100%;
							border-radius: 10px;
						}
					}
				}
			}
		}
	}
</style>