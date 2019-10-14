<template>
    <main class="download-slots-wrapper">
        <div class="download-slots-container">
            <p class="download-slots-title">{{ $t('download.title') }}</p>
            <p class="download-slots-msg">{{ $t('download.message') }}</p>

            <ul class="download-slots-tab-wrapper">
                <li class="download-slots-tab-container tab-livecasino">{{ $t('download.livecasino') }}</li>
                <li class="download-slots-tab-container tab-slots">
                    <nuxt-link :to="$i18n.path('download_slots')">{{ $t('download.slots') }}</nuxt-link>
                </li>
            </ul>

            <ul class="download-slots-content-wrapper">
                <!-- Playtech -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_plt.png" alt />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="pltID" class="download-slots-login-id-text">Y3Calexander</span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('plt')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" alt />
                        <span class="download-slots-download-text">{{ $t('download.application') }}</span>
                    </button>
                </li>
                <!-- Asia Gaming (AG) -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_ag.png" alt />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="agID" class="download-slots-login-id-text">Y3_alexander</span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('ag')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" alt />
                        <img class="download-slots-download-img ios-img" src="/images/ios.png" alt />
                        <span class="download-slots-download-text">{{ $t('download.application') }}</span>
                    </button>
                </li>
                <!-- Dream Gaming (DG) -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_dg.png" alt />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="dgID" class="download-slots-login-id-text">alexander@Y3C</span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('dg')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" alt />
                        <img class="download-slots-download-img ios-img" src="/images/ios.png" alt />
                        <span class="download-slots-download-text">{{ $t('download.application') }}</span>
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
            isLogined: 'GetLogined'
        }),
        ...mapGetters('game', {
            pltData: 'GetDownloadPLT',
            agData: 'GetDownloadDT',
            dtData: 'GetDownloadAG'
        })
    },
    mounted() {
        // Get PLT Download Data
        this.$store.dispatch('game/getGameURL', {
            isDownload: true,
            category: 'livecasino',
            productCode: 'plt',
            gameId: 'bj21d_mh'
        });

        // Get AG Download Data
        this.$store.dispatch('game/getGameURL', {
            isDownload: true,
            category: 'slot',
            productCode: 'ag',
            gameId: 'bj21d_mh'
        });

        // Get DT Download Data
        this.$store.dispatch('game/getGameURL', {
            isDownload: true,
            category: 'slot',
            productCode: 'dt',
            gameId: 'bj21d_mh'
        });
    },
    methods: {
        openDownloadURL(code) {
            if (this.isLogined) {
                if (code === 'plt' && pltData.url) {
                    window.open(pltData.url);
                } else if (code === 'ag' && dtData.url) {
                    window.open(dtData.url);
                } else if (code === 'dg' && agData.url) {
                    window.open(agData.url);
                } else {
                    alert('Can not download !');
                }
            } else {
                this.$router.push({ path: this.$i18n.path('login') });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.download-slots-wrapper {
    width: 100%;
    height: 100%;
    font-family: $font-family;
    font-weight: bold;
    color: $color-white;
    background: $color-black;
    padding: 5% 6% 90px 6%;

    .download-slots-container {
        width: 100%;
        background: url('/images/download_livecasino_bg.png') no-repeat;
        background-size: 100%;
        text-align: center;

        .download-slots-title {
            font-size: 24px;
            line-height: 36px;
        }
        .download-slots-msg {
            font-size: 12px;
        }
        .download-slots-tab-wrapper {
            display: flex;
            font-size: 14px;
            margin-top: 7%;

            .download-slots-tab-container {
                width: 100%;
                font-size: 15px;
                border-top: 1.5px solid #fcb813;
                border-bottom: 1.5px solid #fcb813;
                padding: 2% 0% 2% 0;

                &.tab-livecasino {
                    color: $color-black;
                    background: $color-yellow-linear;
                    border-left: 1.5px solid #fcb813;
                    border-radius: 20px 0 0 20px;
                }
                &.tab-slots {
                    border-right: 1.5px solid #fcb813;
                    border-radius: 0 20px 20px 0;

                    a {
                        display: block;
                        color: $color-white;
                    }
                }
            }
        }
        .download-slots-content-wrapper {
            margin-top: 48%;

            .download-slots-content-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                background: #292929;
                border-radius: 12px;
                border: 1px solid rgba(100, 100, 100, 0.5);
                margin-top: 8%;

                .download-slots-img {
                    width: 60%;
                }
                .download-slots-login-id-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    padding: 7px 20px 14px 20px;

                    .download-slots-login-id-container {
                        width: 100%;
                        font-size: 14px;
                        text-align: left;
                        margin-left: 10%;

                        .download-slots-id-title {
                            display: inline-block;
                            color: $color-gray;
                        }
                        .download-slots-login-id-text {
                            display: inline-block;
                            color: $color-white;
                        }
                    }
                }
                .download-slots-download-btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 45px;
                    background: -webkit-linear-gradient(#737182, #545459);
                    border-radius: 0 0 12px 12px;

                    .download-slots-download-img {
                        width: 28px;

                        &.ios-img {
                            margin-left: 7px;
                        }
                    }
                    .download-slots-download-text {
                        font-size: 14px;
                        font-weight: bold;
                        color: $color-white;
                        margin-left: 7px;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 414px) {
    .download-slots-wrapper {
        .download-slots-container {
            .download-slots-content-wrapper {
                margin-top: 53%;
            }
        }
    }
}

@media screen and (min-width: 600px) {
    .download-slots-wrapper {
        .download-slots-container {
            .download-slots-title {
                font-size: 45px;
                line-height: 68px;
            }
            .download-slots-msg {
                font-size: 20px;
            }
            .download-slots-tab-wrapper {
                .download-slots-tab-container {
                    font-size: 22px;

                    &.tab-livecasino {
                        border-radius: 30px 0 0 30px;
                    }
                    &.tab-slots {
                        border-radius: 0 30px 30px 0;
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 768px) {
    .download-slots-wrapper {
        .download-slots-container {
            .download-slots-content-wrapper {
                margin-top: 56%;
            }
        }
    }
}

@media screen and (min-width: 1024px) {
    .download-slots-wrapper {
        .download-slots-container {
            .download-slots-content-wrapper {
                margin-top: 60%;
            }
        }
    }
}
</style>