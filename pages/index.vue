<template>
    <main class="primary-wrapper">
        <!-- Ad Pop Up -->
        <my-popup />

        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <div class="secondary-wrapper">
            <!-- Jackpot -->
            <div class="jackpot-wrapper">
                <span class="jackpot-container">
                    <span class="jackpot-title">{{ $t('home.jackpot') }}</span>
                    <span class="jackpot-currency">THB</span>
                </span>
                <span class="jackpot-amount" id="amountText">1,830,082,162.31</span>
            </div>

            <!-- Games -->
            <ul class="games-content-wrapper">
                <!-- Live Casino -->
                <li class="game-wrapper">
                    <img class="game-image" src="/images/home_livecasino.png" />
                    <div class="game-right-wrapper">
                        <span class="game-title-wrapper">
                            <img class="game-icon" src="/images/home_livecasino_icon.png" />
                            <span class="game-title">{{ $t('home.livecasino') }}</span>
                        </span>
                        <p class="game-descript">{{ $t('home.livecasino_msg') }}</p>
                        <nuxt-link class="game-play-now-btn" :to="$i18n.path('livecasino')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>
                <!-- Sports -->
                <li class="game-wrapper">
                    <img class="game-image" src="/images/home_sports.png" />
                    <div class="game-right-wrapper">
                        <span class="game-title-wrapper">
                            <img class="game-icon" src="/images/home_sports_icon.png" />
                            <span class="game-title">{{ $t('home.sport_events') }}</span>
                        </span>
                        <p class="game-descript">{{ $t('home.sport_events_msg') }}</p>
                        <nuxt-link class="game-play-now-btn" :to="$i18n.path('sports')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>
                <!-- Slots -->
                <li class="game-wrapper">
                    <img class="game-image" src="/images/home_slots.png" />
                    <div class="game-right-wrapper">
                        <span class="game-title-wrapper">
                            <img class="game-icon" src="/images/home_slots_icon.png" />
                            <span class="game-title">{{ $t('home.slot_games') }}</span>
                        </span>
                        <p class="game-descript">{{ $t('home.slot_games_msg') }}</p>
                        <nuxt-link class="game-play-now-btn" :to="$i18n.path('slots')">{{ $t('common.play_now') }}</nuxt-link>
                    </div>
                </li>

                <!-- Bottom Three Games -->
                <li class="bottom-games-wrapper">
                    <div class="bottom-games-container">
                        <nuxt-link class="bottom-game-item" :to="$i18n.path('lottery')">
                            <img class="bottom-game-image" src="/images/home_lottery.png" />
                            <span class="bottom-game-name">{{ $t('home.online_lottery') }}</span>
                        </nuxt-link>
                        <nuxt-link class="bottom-game-item" :to="$i18n.path('fishing')">
                            <img class="bottom-game-image" src="/images/home_fishing.png" />
                            <span class="bottom-game-name">{{ $t('home.cash_fishing') }}</span>
                        </nuxt-link>
                        <nuxt-link class="bottom-game-item" :to="$i18n.path('promotions')">
                            <img class="bottom-game-image" src="/images/home_promotion.png" />
                            <span class="bottom-game-name">{{ $t('home.cash_rebate') }}</span>
                        </nuxt-link>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyPopup from '~/components/MyPopup';
import MyCarousel from '~/components/MyCarousel';
import MyAnnouncement from '~/components/MyAnnouncement';
import MyGameTab from '~/components/MyGameTab';

export default {
    components: {
        MyPopup,
        MyCarousel,
        MyAnnouncement,
        MyGameTab
    },
    computed: {
        ...mapGetters('user', {
            jackpot: 'GetJackpot'
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

            $('#amountText').text(this.amountString);
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
.primary-wrapper {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: $font-family;

    .secondary-wrapper {
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

        .games-content-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;

            .game-wrapper {
                display: flex;
                width: 100%;
                background: url('/images/game_background.png');
                background-size: cover;
                border-radius: 5px;
                box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
                margin-top: 5%;
                padding: 3% 2%;

                .game-image {
                    width: 50%;
                    height: 100%;
                }
                .game-right-wrapper {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    color: $color-black;
                    padding: 0 3%;

                    .game-title-wrapper {
                        display: flex;
                        align-items: center;
                        width: 100%;

                        .game-icon {
                            width: 16%;
                        }
                        .game-title {
                            width: 100%;
                            font-size: 16px;
                            font-weight: bold;
                            white-space: nowrap;
                            margin: 1px 0 0 6px;
                        }
                    }
                    .game-descript {
                        width: 100%;
                        height: 100%;
                        margin: 8% 0 0 0;
                    }
                    .game-play-now-btn {
                        width: 60%;
                        min-height: 30px;
                        line-height: 30px;
                        color: $color-black;
                        text-align: center;
                        border-radius: 5px;
                        border: 1px solid rgba(247, 147, 30, 0.4);
                        background-image: $color-yellow-linear-unpress;

                        &:active {
                            background-image: $color-yellow-linear;
                        }
                    }
                }
            }

            .bottom-games-wrapper {
                width: 100%;

                .bottom-games-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin-top: 5%;

                    .bottom-game-item {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        background: url('/images/game_background.png');
                        background-size: cover;
                        border-radius: 5px;
                        box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.3);
                        margin: 0 3% 0 0;

                        .bottom-game-image {
                            width: 90%;
                            height: auto;
                        }
                        .bottom-game-name {
                            width: 100%;
                            color: #000000;
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
// Screen: 360px ~
@media screen and (min-width: 375px) {
    .primary-wrapper {
        .secondary-wrapper {
            .jackpot-wrapper {
                .jackpot-amount {
                    font-size: 25px;
                }
            }
        }
    }
}
</style>
