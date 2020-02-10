<template>
    <main class="download-slots-wrapper">
        <div class="download-slots-container">
            <p class="download-slots-title">{{ $t('download.title') }}</p>
            <p class="download-slots-msg">{{ $t('download.message') }}</p>

            <ul class="download-slots-tab-wrapper">
                <li class="download-slots-tab-container tab-livecasino">
                    <nuxt-link :to="$i18n.path('download_casino')">{{ $t('download.livecasino') }}</nuxt-link>
                </li>
                <li class="download-slots-tab-container tab-slots">{{ $t('download.slots') }}</li>
            </ul>

            <ul class="download-slots-content-wrapper">
                <!-- Playtech -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_plt.png" />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="pltID" class="download-slots-login-id-text"></span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('plt')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" />
                        <span class="download-slots-download-text">{{ $t('download.application') }}</span>
                    </button>
                </li>
                <!-- Joker -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_joker.png" />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="jokerID" class="download-slots-login-id-text"></span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('joker')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" />
                        <img class="download-slots-download-img ios-img" src="/images/ios.png" />
                        <span class="download-slots-download-text">{{ $t('download.application') }}</span>
                    </button>
                </li>
                <!-- 918Kiss -->
                <li class="download-slots-content-container">
                    <img class="download-slots-img" src="/images/download_918kiss.png" />
                    <div class="download-slots-login-id-wrapper">
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('download.login_id') }} :</span>
                            <span id="kiss918ID" class="download-slots-login-id-text"></span>
                        </div>
                        <div class="download-slots-login-id-container">
                            <span class="download-slots-id-title">{{ $t('common.password') }} :</span>
                            <span id="kiss918PSW" class="download-slots-login-id-text">
                                Y3c
                                <em>Password</em>
                            </span>
                        </div>
                    </div>
                    <button class="download-slots-download-btn" @click="openDownloadURL('918kiss')">
                        <img class="download-slots-download-img android-img" src="/images/android.png" />
                        <img class="download-slots-download-img ios-img" src="/images/ios.png" />
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
            jokerData: 'GetDownloadJOKER',
            kiss918Data: 'GetDownload918Kiss'
        })
    },
    mounted() {
        if (this.isLogined) {
            // Get PLT Download Data
            this.$store.dispatch('game/getGameURL', {
                isDownload: true,
                category: 'slot',
                productCode: 'plt',
                gameID: 'bj21d_mh'
            });

            // Get Joker Download Data
            this.$store.dispatch('game/getGameURL', {
                isDownload: true,
                category: 'slot',
                productCode: 'jok',
                gameID: 'bj21d_mh'
            });

            // Get 918Liss Download Data
            this.$store.dispatch('game/getGameURL', {
                isDownload: true,
                category: 'slot',
                productCode: 'ks9',
                gameID: 'bj21d_mh'
            });
        }
    },
    methods: {
        openDownloadURL(code) {
            if (this.isLogined) {
                if (code == 'plt') {
                    window.open(pltData.url);
                } else if (code == 'joker') {
                    window.open(jokerData.url);
                } else if (code == '918kiss') {
                    window.open(kiss918Data.url);
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
            background: url('/images/download_slots_bg.jpg') no-repeat;
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
                        border-left: 1.5px solid #fcb813;
                        border-radius: 20px 0 0 20px;

                        a {
                            display: block;
                            color: $color-white;
                        }
                    }

                    &.tab-slots {
                        color: $color-black;
                        background: $color-yellow;
                        border-right: 1.5px solid #fcb813;
                        border-radius: 0 20px 20px 0;
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