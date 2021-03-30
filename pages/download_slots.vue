<template>
	<main class="download-wrapper">
		<div class="download-container">
			<h2>{{ $t('download.title') }}</h2>
			<p>{{ $t('download.message') }}</p>

			<ul class="nav-bar">
				<li>
					<nuxt-link :to="$i18n.path('download_casino')">{{ $t('download.livecasino') }}</nuxt-link>
				</li>
				<li class="active">
					<a href="javascript:void(0)">{{ $t('download.slots') }}</a>
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
				<!-- Joker -->
				<li>
					<img src="/images/download/joker.png" alt="Joker" />
					<div class="login-id-wrapper">
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('download.login_id') }} :</span>
							<span>{{ jokAccount }}</span>
						</div>
						<p v-else>{{ $t('download.please_login') }}</p>
					</div>
					<button type="button" @click="openDownloadURL('jok')">
						<img src="/images/download/android.png" alt="Android" />
						<img src="/images/download/ios.png" alt="iOS" />
						<span>{{ $t('download.application') }}</span>
					</button>
				</li>
				<!-- 918Kiss -->
				<li>
					<img src="/images/download/918kiss.png" alt="918Kiss" />
					<div class="login-id-wrapper">
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('download.login_id') }} :</span>
							<span>{{ kis918Account }}</span>
						</div>
						<div class="login-id-container" v-if="isLogined">
							<span>{{ $t('common.password') }} :</span>
							<span> i1win <<em>Password</em>> </span>
						</div>
						<p v-else>{{ $t('download.please_login') }}</p>
					</div>
					<button type="button" @click="openDownloadURL('9kis918')">
						<img src="/images/download/android.png" alt="Android" />
						<img src="/images/download/ios.png" alt="iOS" />
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
				jokAccount: null,
				kis918Account: null,
			};
		},
		mounted() {
			$('.download-container').css('background-image', "url('/images/download/slots_bg.jpg')");

			if (this.isLogined) {
				this.$store.dispatch('user/getDownload').then(() => {
					for (let i = 0; i < this.downloadData.length; i++) {
						if (this.downloadData[i].product === 'plt') {
							this.pltAccount = this.downloadData[i].account;
						}
						if (this.downloadData[i].product === 'jok') {
							this.jokAccount = this.downloadData[i].account;
						}
						if (this.downloadData[i].product === 'ks9') {
							this.kis918Account = this.downloadData[i].account;
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
							window.open('http://m.ld176988.com/download.html', '_blank');
							break;
						}
						case 'jok': {
							window.open('http://www.joker1919.net', '_blank');
							break;
						}
						case 'kis918': {
							window.open('https://do11.918kiss.com', '_blank');
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