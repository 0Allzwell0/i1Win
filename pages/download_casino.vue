<template>
	<main class="download-wrapper">
		<div class="download-container">
			<h2>{{ $t('download.title') }}</h2>
			<p>{{ $t('download.message') }}</p>

			<ul class="nav-bar">
				<li class="active">
					<a href="javascript:void(0)">{{ $t('download.livecasino') }}</a>
				</li>
				<li>
					<nuxt-link :to="$i18n.path('download_slots')">{{ $t('download.slots') }}</nuxt-link>
				</li>
			</ul>

			<ul class="content-wrapper">
				<!-- Playtech -->
				<li>
					<img src="/images/download/plt.png" alt="Playtech" />
					<div class="login-id-wrapper">
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('download.login_id') }} :</span>
							<span>{{ pltAccount }}</span>
						</div>
						<p v-else>{{ $t('download.please_login') }}</p>
					</div>
					<button type="button" @click="openDownloadURL('plt')">
						<img src="/images/download/android.png" alt="Android" />
						<span>{{ $t('download.application') }}</span>
					</button>
				</li>
				<!-- Asia Gaming (AG) -->
				<li>
					<img src="/images/download/ag.png" alt="Asia Gaming" />
					<div class="login-id-wrapper">
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('download.login_id') }} :</span>
							<span>{{ agAccount }}</span>
						</div>
						<p v-else>{{ $t('download.please_login') }}</p>
					</div>
					<button type="button" @click="openDownloadURL('ag')">
						<img src="/images/download/android.png" alt="Android" />
						<img src="/images/download/ios.png" alt="iOS" />
						<span>{{ $t('download.application') }}</span>
					</button>
				</li>
				<!-- Dream Gaming (DG) -->
				<li>
					<img src="/images/download/dg.png" alt="Dream Gaming" />
					<div class="login-id-wrapper">
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('download.login_id') }} :</span>
							<span>{{ dgAccount }}</span>
						</div>
						<p v-else>{{ $t('download.please_login') }}</p>
					</div>
					<button type="button" @click="openDownloadURL('dg')">
						<img src="/images/download/android.png" alt="Android" />
						<img src="/images/download/ios.png" alt="iOSd" />
						<span>{{ $t('download.application') }}</span>
					</button>
				</li>
			</ul>
		</div>
	</main>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters('auth', {
				isLogined: 'GetLogined',
			}),
			...mapGetters('user', {
				downloadData: 'GetDownloadData',
			}),
		},
		data() {
			return {
				pltAccount: null,
				agAccount: null,
				dgAccount: null,
			};
		},
		mounted() {
			$('.download-container').css('background-image', "url('/images/download/livecasino_bg.png')");

			if (this.isLogined) {
				this.$store.dispatch('user/getDownload').then(() => {
					for (let i = 0; i < this.downloadData.length; i++) {
						if (this.downloadData[i].product === 'plt') {
							this.pltAccount = this.downloadData[i].account;
						}
						if (this.downloadData[i].product === 'ag') {
							this.agAccount = this.downloadData[i].account;
						}
						if (this.downloadData[i].product === 'dg') {
							this.dgAccount = this.downloadData[i].account;
						}
					}
				});
			}
		},
		methods: {
			openDownloadURL(gameType) {
				if (this.isLogined) {
					switch (gameType) {
						case 'plt': {
							window.open('http://m.ld176988.com/live/download.html', '_blank');
							break;
						}
						case 'ag': {
							window.open('https://www.agmbet.com', '_blank');
							break;
						}
						case 'dg': {
							window.open('https://f.dg99.info/download/cn.html', '_blank');
							break;
						}
						default: {
							break;
						}
					}
				} else {
					this.$router.push(this.$i18n.path('login'));
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/scss/PageDownload.scss';
</style>