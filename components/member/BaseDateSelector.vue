<template>
	<div class="date-selector-wrapper">
		<client-only>
			<date-picker class="date-selector-container" :format="format" :language="language" :value="birthday || currentDate" />
		</client-only>
		<fa class="icon-down" :icon="['fas', 'caret-down']" />
	</div>
</template>
<script>
	import { en, th } from 'vuejs-datepicker/dist/locale';

	export default {
		props: {
			birthday: {
				type: String,
				default: null,
			},
		},
		data() {
			return {
				format: 'yyyy-MM-dd',
				language: this.$i18n.locale === 'th-TH' ? th : en,
				currentDate: null,
			};
		},
		mounted() {
			this.getCurrentDate();
		},
		methods: {
			// Get Current Date
			getCurrentDate() {
				this.currentDate = new Date();
				let year = this.currentDate.getFullYear();
				let month = this.currentDate.getMonth() + 1;
				let date = this.currentDate.getDate();

				if (month >= 1 && month <= 9) {
					month = '0' + month;
				}
				if (date >= 0 && date <= 9) {
					date = '0' + date;
				}

				this.currentDate = `${year}-${month}-${date}`;
				this.$emit('getFromDate', this.currentDate);
				this.$emit('getToDate', this.currentDate);
			},
		},
	};
</script>
<style lang="scss">
	.date-selector-wrapper {
		position: relative;
		width: 47%;

		&.form-long {
			width: 100%;

			.date-selector-container {
				input {
					border: none;
				}
			}
		}

		&.to-date .date-selector-container .vdp-datepicker__calendar {
			right: 0;
		}

		.date-selector-container {
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

			.vdp-datepicker__calendar {
				width: 250px;
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