<template>
	<div class="time-selector-wrapper">
		<client-only>
			<time-picker class="time-selector-container" format="HH:mm" :value="currentTime" hide-clear-button />
		</client-only>
		<fa class="icon-down" :icon="['fas', 'caret-down']" />
	</div>
</template>
<script>
	export default {
		data() {
			return {
				currentTime: null,
			};
		},
		mounted() {
			this.getCurrentTime();
		},
		methods: {
			// Get Current Time
			getCurrentTime() {
				let dateNow = new Date();
				let hour = dateNow.getHours();
				let minute = dateNow.getMinutes();
				this.currentTime = `${hour}:${minute}`;
			},
		},
	};
</script>
<style lang="scss">
	@import 'vue2-timepicker/dist/VueTimepicker.css';

	.time-selector-wrapper {
		position: relative;
		width: 47%;

		.time-selector-container {
			width: 100%;

			input {
				width: 100%;
				height: 39px;
				font-size: 15px;
				border-radius: 5px;
				border: 1px solid #cecece;
				background: $color-white;
				padding: 0 10px;
			}

			.dropdown {
				top: 39px;
			}
		}

		.icon-down {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 20px;
		}
	}
</style>