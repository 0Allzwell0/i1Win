<template>
	<div class="loading-content" v-show="loading">
		<div class="loader"></div>
	</div>
</template>
<script>
	export default {
		data: () => ({
			loading: false,
		}),
		methods: {
			start() {
				this.loading = true;
			},
			finish() {
				setTimeout(() => {
					this.loading = false;

					if (this.$route.name === 'index') {
						setTimeout(() => {
							// Show Ad Popup
							// $('#myPopupModal').modal('show');
						}, 300);
					}
				}, 500);
			},
		},
	};
</script>
<style lang="scss" scoped>
	html.loading,
	body.loading {
		position: fixed;
		width: 100%;
		overflow-y: hidden;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.loading-content {
		position: fixed;
		z-index: 9999;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		overflow: hidden;

		.loader {
			position: absolute;
			top: 40%;
			left: 43%;
			width: 60px;
			height: 60px;
			font-size: 10px;
			border-radius: 50%;
			border: 6px solid #ddb904;
			border-left: 6px solid rgba(255, 255, 255, 0.9);
			animation: spin 1.1s infinite linear;
		}
	}
</style>