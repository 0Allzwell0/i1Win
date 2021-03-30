<template>
	<div class="modal fade" id="modalPopUp" tabindex="-1" role="dialog" v-if="popupData">
		<div class="popup-modal-wrapper modal-dialog" role="document">
			<div class="popup-modal-container">
				<fa class="popup-close" data-dismiss="modal" :icon="['fas', 'times']" />
				<img :src="popupData" alt="" />
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('user', {
				popupData: 'GetPopUp',
			}),
		},
		mounted() {
			this.$store.dispatch('user/getPopUp').then(() => {
				$('#modalPopUp').modal('show');
			});
		},
	};
</script>
<style lang="scss" scoped>
	.popup-modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 30vh 0 0 0;

		.popup-modal-container {
			position: relative;
			width: 80%;
			max-width: 550px;

			.popup-close {
				position: absolute;
				top: -20px;
				right: -20px;
				color: $color-white;
				font-size: 20px;
			}

			> img {
				width: 100%;
			}
		}
	}
</style>