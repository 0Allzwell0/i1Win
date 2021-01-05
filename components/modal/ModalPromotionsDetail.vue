<template>
	<div class="promotions-detail-wrapper">
		<!-- Close Button -->
		<fa :icon="['fas', 'times']" class="modal-close" data-dismiss="modal" />

		<div class="promotions-detail-container" v-html="htmlContent"></div>
	</div>
</template>

<script>
	export default {
		props: {
			htmlContent: {
				default: null,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.promotions-detail-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 450px;
		font-size: 12px;
		align-items: center;
		background: $color-white;
		border-radius: 5px;
		padding-bottom: 5%;

		.modal-close {
			font-size: 26px;
			align-self: flex-end;
			margin: 10px 15px 0 0;
		}

		.promotions-detail-container {
			width: 100%;
			height: 100%;
			font-weight: bold;
			text-align: left;
			padding: 4% 4% 0 4%;
			overflow: auto;

			ol {
				list-style: decimal;

				li {
					list-style: decimal;
				}
			}
		}
	}

	// RWD Setting
	// Screen : 600px ~
	@media screen and (min-width: 600px) {
		.promotions-detail-wrapper {
			width: 93%;
		}
	}
</style>
