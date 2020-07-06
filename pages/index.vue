<template>
    <main class="home-wrapper">
        <!-- Carousel -->
        <the-carousel></the-carousel>

        <!-- Announcement -->
        <the-announcement></the-announcement>

        <!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <the-game-nav-bar></the-game-nav-bar>

        <div class="home-container">
            <!-- Jackpot -->
            <div class="jackpot-wrapper">
                <span class="jackpot-container">
                    <span class="jackpot-title">{{ $t('home.jackpot') }}</span>
                    <span class="jackpot-currency">THB</span>
                </span>
                <span class="jackpot-amount">1,830,082,162.31</span>
            </div>

            <!-- Games -->
            <ul>
                <!-- Live Casino -->
                <li>
                    <img src="/images/home/livecasino.png" :alt="$t('home.livecasino')" />
                    <div class="right-wrapper">
                        <span>
                            <img src="/images/home/livecasino_icon.png" alt />
                            <span>{{ $t('home.livecasino') }}</span>
                        </span>
                        <p>{{ $t('home.livecasino_msg') }}</p>
                        <nuxt-link :to="$i18n.path('livecasino')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>

                <!-- Sports -->
                <li>
                    <img src="/images/home/sports.png" :alt="$t('home.sport_events')" />
                    <div class="right-wrapper">
                        <span>
                            <img src="/images/home/sports_icon.png" alt />
                            <span>{{ $t('home.sport_events') }}</span>
                        </span>
                        <p>{{ $t('home.sport_events_msg') }}</p>
                        <nuxt-link :to="$i18n.path('sports')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>

                <!-- Slots -->
                <li>
                    <img src="/images/home/slots.png" :alt="$t('home.slot_games')" />
                    <div class="right-wrapper">
                        <span>
                            <img src="/images/home/slots_icon.png" alt />
                            <span>{{ $t('home.slot_games') }}</span>
                        </span>
                        <p>{{ $t('home.slot_games_msg') }}</p>
                        <nuxt-link :to="$i18n.path('slots')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>

                <!-- Bottom Three Games -->
                <li class="bottom-wrapper">
                    <div class="bottom-container">
                        <nuxt-link :to="$i18n.path('lottery')">
                            <img src="/images/home/lottery.png" :alt="$t('home.online_lottery')" />
                            <span>{{ $t('home.online_lottery') }}</span>
                        </nuxt-link>
                        <nuxt-link :to="$i18n.path('fishing')">
                            <img src="/images/home/fishing.png" :alt="$t('home.cash_fishing')" />
                            <span>{{ $t('home.cash_fishing') }}</span>
                        </nuxt-link>
                        <nuxt-link :to="$i18n.path('promotions')">
                            <img src="/images/home/promotion.png" :alt="$t('home.cash_rebate')" />
                            <span>{{ $t('home.cash_rebate') }}</span>
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import TheCarousel from '@/components/common/TheCarousel';
import TheAnnouncement from '@/components/common/TheAnnouncement';
import TheGameNavBar from '@/components/common/TheGameNavBar';

export default {
    components: {
        TheCarousel,
        TheAnnouncement,
        TheGameNavBar
    },
    computed: {
        ...mapGetters('user', {
            jackpot: 'GetJackpot'
        }),
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        })
    },
    data() {
        return {
            totalJackpot: null,
            numberString: null,
            tempString: null,
            lastThreeString: null,
            amountString: null
        };
    },
    mounted() {
        this.totalJackpot = this.jackpot;

        // Executed every 3 seconds
        let interval = setInterval(() => {
            this.showJackpot();
        }, 300);
    },
    methods: {
        // Show Jackpot
        showJackpot() {
            let randomAdd = Math.random().toFixed(2) % 0.1;
            this.totalJackpot = this.totalJackpot + randomAdd;
            this.numberString = this.totalJackpot.toFixed(2);
            this.tempString = this.numberString.substring(0, this.numberString.length - 3);
            this.lastThreeString = this.numberString.substring(this.numberString.length - 3, this.numberString.length);
            this.amountString = this.toThousands(this.tempString) + this.lastThreeString;

            $('.jackpot-amount').text(this.amountString);
        },

        // Add a comma every 3 digits
        toThousands(num) {
            num = (num || 0).toString();
            let result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + result;
            }
            return result;
        }
    }
};
</script>
<style lang="scss" scoped>
    .home-wrapper {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: $font-family;

        .home-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: $background_img;
            background-size: cover;
            padding: 5% 5% 70px 5%;

            .jackpot-wrapper {
                display: flex;
                align-items: center;
                width: 100%;
                height: 10%;
                border-radius: 5px;
                box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.2);
                background: $color-black;
                padding: 2% 2% 2% 3.5%;

                .jackpot-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    color: $color-yellow;
                    margin-right: 5%;

                    .jackpot-title {
                        font-size: 18px;
                        line-height: 25px;
                        font-weight: bold;
                        white-space: nowrap;
                        margin-top: 3px;
                    }

                    .jackpot-currency {
                        font-size: 14px;
                    }
                }

                .jackpot-amount {
                    width: 100%;
                    color: $color-yellow;
                    font-size: 20px;
                    font-weight: bold;
                    border-radius: 5px;
                    text-align: right;
                    padding: 10px 5px;
                }
            }

            > ul {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;

                > li {
                    display: flex;
                    width: 100%;
                    background: url('/images/home/game_bg.png');
                    background-size: cover;
                    border-radius: 5px;
                    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
                    padding: 3% 2%;
                    margin-top: 5%;

                    > img {
                        width: 50%;
                        height: 100%;
                    }

                    .right-wrapper {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        color: $color-black;
                        padding: 0 3%;

                        > span {
                            display: flex;
                            align-items: center;
                            width: 100%;

                            > img {
                                width: 16%;
                            }

                            > span {
                                width: 100%;
                                font-size: 16px;
                                font-weight: bold;
                                white-space: nowrap;
                                margin: 1px 0 0 6px;
                            }
                        }

                        > p {
                            width: 100%;
                            height: 100%;
                            margin: 8% 0 0 0;
                        }

                        > a {
                            width: 60%;
                            min-height: 30px;
                            line-height: 30px;
                            color: $color-black;
                            text-align: center;
                            border-radius: 5px;
                            border: 1px solid rgba(247, 147, 30, 0.4);
                            background: $color-yellow-linear-unpress;

                            &:active {
                                background: $color-yellow-linear;
                            }
                        }
                    }
                }

                .bottom-wrapper {
                    width: 100%;

                    .bottom-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        margin-top: 5%;

                        > a {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            background: url('/images/home/game_bg.png');
                            background-size: cover;
                            border-radius: 5px;
                            box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
                            margin: 0 3% 0 0;

                            > img {
                                width: 90%;
                                height: auto;
                            }

                            > span {
                                width: 100%;
                                color: $color-black;
                                text-align: center;
                                margin: -13% 0 2% 0;
                            }

                            &:last-child {
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    // RWD
    // Screen: 375px ~
    @media screen and (min-width: 375px) {
        .home-wrapper {
            .home-container {
                .jackpot-wrapper {
                    .jackpot-amount {
                        font-size: 25px;
                    }
                }
            }
        }
    }
</style>
