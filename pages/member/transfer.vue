<template>
    <main class="transfer-wrapper">
        <!-- Tab -->
        <my-member-tab />

        <!-- Wallet List -->
        <my-wallet-list />

        <!-- Content -->
        <div class="transfer-container">
            <!-- Available Balance -->
            <h3 class="transfer-title-text">{{ $t('wallet.available_balance') }}</h3>
            <div class="transfer-content-text">THB {{ availableBalance }}</div>

            <!-- Transfer From -->
            <h3 class="transfer-title-text">{{ $t('transfer.transfer_from') }}</h3>
            <div class="transfer-input-wrapper">
                <button
                    class="transfer-game-input transfer-from"
                    type="button"
                    @click="showGameList('from')"
                >{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="transfer-down" />
                <ul class="transfer-games-list transfer-from" :class="{'show': isShowGameFrom}">
                    <li class="transfer-game-item" @click="selectGame('from', 'none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="transfer-game-item"
                        :class="{'active': selectedToGame === 'main'}"
                        @click="selectGame('from', 'main')"
                    >
                        <img class="transfer-game-img" src="/images/wallet_main.png" />
                        <span class="transfer-game-text" :class="{'active': true}">{{ $t('wallet.main_wallet') }}</span>
                    </li>
                    <li
                        class="transfer-game-item"
                        :class="{'active': selectedToGame === item}"
                        v-for="(item, index) in gamesList"
                        :key="`transfer_game_${index}`"
                        @click="selectGame('from', item)"
                    >
                        <img class="transfer-game-img" :src="`/images/wallet_${item}.png`" />
                        <span class="transfer-game-text" :class="{'active': item === 'lottery'}">{{ $t('transfer.lottery') }}</span>
                    </li>
                </ul>
            </div>

            <!-- Transfer To -->
            <h3 class="transfer-title-text">{{ $t('transfer.transfer_to') }}</h3>
            <div class="transfer-input-wrapper">
                <button
                    class="transfer-game-input transfer-to"
                    type="button"
                    @click="showGameList('to')"
                >{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="transfer-down" />
                <ul class="transfer-games-list transfer-to" :class="{'show': isShowGameTo}">
                    <li class="transfer-game-item" @click="selectGame('to', 'none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="transfer-game-item"
                        :class="{'active': selectedFromGame === 'main'}"
                        @click="selectGame('to', 'main')"
                    >
                        <img class="transfer-game-img" src="/images/wallet_main.png" />
                        <span class="transfer-game-text" :class="{'active': true}">{{ $t('wallet.main_wallet') }}</span>
                    </li>
                    <li
                        class="transfer-game-item"
                        :class="{'active': selectedFromGame === item}"
                        v-for="(item, index) in gamesList"
                        :key="`transfer_game_${index}`"
                        @click="selectGame('to', item)"
                    >
                        <img class="transfer-game-img" :src="`/images/wallet_${item}.png`" />
                        <span class="transfer-game-text" :class="{'active': item === 'lottery'}">{{ $t('transfer.lottery') }}</span>
                    </li>
                </ul>
            </div>

            <!-- Amount -->
            <span class="transfer-title-text">{{ $t('wallet.amount') }} (THB)</span>
            <input class="transfer-input" type="number" :placeholder="$t('wallet.amount')" />

            <!-- Transfer Button -->
            <button class="transfer-button" type="submit">{{ $t('wallet.transfer') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyWalletList from '~/components/MyWalletList';

export default {
    computed: {
        ...mapGetters('wallet', {
            wallets: 'GetWallets',
            gamesList: 'GetGames'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList
    },
    data() {
        return {
            availableBalance: null,
            isShowGameFrom: false,
            isShowGameTo: false,
            selectedFromGame: null,
            selectedToGame: null
        };
    },
    mounted() {
        let _this = this;

        this.availableBalance = this.wallets[0].amount.toFixed(2);

        // When Touch Others Place, "Games" List Will Close
        $(document).click(function(el) {
            let touchEl = $(el.target)[0].className;

            if (touchEl.indexOf('transfer-game-img') === -1 && touchEl.indexOf('transfer-game-text') === -1) {
                if (touchEl.indexOf('transfer-from') !== -1 && touchEl.indexOf('transfer-to') === -1) {
                    _this.isShowGameTo = false;
                }

                if (touchEl.indexOf('transfer-from') === -1 && touchEl.indexOf('transfer-to') === -1) {
                    _this.isShowGameFrom = false;
                    _this.isShowGameTo = false;
                }

                if (touchEl.indexOf('transfer-from') === -1 && touchEl.indexOf('transfer-to') !== -1) {
                    _this.isShowGameFrom = false;
                }
            }
        });
    },
    methods: {
        // Show Or Close Transfer Game List
        showGameList(type) {
            if (type === 'from') {
                this.isShowGameFrom = !this.isShowGameFrom;
            } else if (type === 'to') {
                this.isShowGameTo = !this.isShowGameTo;
            }
        },

        // Select transfer Bank
        selectGame(type, game) {
            if (type === 'from') {
                this.setHtml(type, game);
                this.isShowGameFrom = false;
            } else if (type === 'to') {
                this.setHtml(type, game);
                this.isShowGameTo = false;
            }
        },

        setHtml(type, game) {
            // Set "From" Game Or "To" Game Button Html
            if (game === 'none') {
                $(`.transfer-game-input.transfer-${type}`).text(this.$t('common.please_select'));
            } else if (game === 'main') {
                $(`.transfer-game-input.transfer-${type}`).html(
                    `<img class="transfer-game-img" src="/images/wallet_main.png" />
                    <span class="transfer-game-text">${this.$t('wallet.main_wallet')}</span>
                    `
                );
            } else if (game === 'lottery') {
                $(`.transfer-game-input.transfer-${type}`).html(
                    `<img class="transfer-game-img" src="/images/wallet_lottery.png" />
                    <span class="transfer-game-text">${this.$t('transfer.lottery')}</span>
                    `
                );
            } else {
                $(`.transfer-game-input.transfer-${type}`).html(`<img class="transfer-game-img" src="/images/wallet_${game}.png" />`);
            }

            // Hide Selected Game Layout From "From" Or "To" Games List
            if (type === 'from') {
                this.selectedFromGame = game;
            } else if (type === 'to') {
                this.selectedToGame = game;
            }
        }
    }
};
</script>
<style lang="scss">
.transfer-wrapper {
    width: 100%;
    height: 100%;

    .transfer-container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 81vh;
        background: url('/images/background_img.jpg');
        background-size: cover;
        font-family: $font-family;
        font-size: 12px;
        font-weight: bold;
        margin-top: -407px;
        padding: 5% 5% 90px 5%;
        transition: margin-top 400ms;

        &.expand {
            margin-top: 0;
            transition: margin-top 400ms;
        }
        .transfer-title-text {
            width: 100%;
            font-size: 15px;
        }
        .transfer-content-text {
            width: 100%;
            font-size: 14px;
            color: rgba(25, 25, 25, 0.5);
            border: 1px solid #cecece;
            border-radius: 5px;
            margin: 7px 0 24px 0;
            padding: 10px 17px 7px 17px;
        }
        .transfer-input-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 39px;
            border-radius: 5px;
            border: 1px solid #cecece;
            background: $color-white;
            margin: 7px 0 24px 0;

            .transfer-game-input {
                display: flex;
                align-items: center;
                width: 100%;
                font-size: 14px;
                background: $color-white;
                border-radius: 5px;
                text-align: left;
                padding-left: 10px;

                .transfer-game-img {
                    width: 119px;
                }
                .transfer-game-text {
                    margin-left: -85px;
                }
            }
            .transfer-down {
                width: 15px;
                font-size: 20px;
                color: $color-black;
                align-self: center;
                margin-right: 8px;
            }
            .transfer-games-list {
                display: none;
                position: absolute;
                z-index: 10;
                top: 38px;
                left: 0;
                width: 100%;
                height: 230px;
                font-weight: normal;
                font-size: 14px;
                border: 1px solid #cecece;
                background: $color-white;
                overflow-y: scroll;
                margin-bottom: 70px;

                &.show {
                    display: block;
                }
                .transfer-game-item {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    border-bottom: 1px solid #cecece;
                    padding: 10px 0 10px 10px;

                    &.active {
                        display: none;
                    }
                    .transfer-game-img {
                        width: 119px;
                    }
                    .transfer-game-text {
                        display: none;

                        &.active {
                            display: block;
                            margin-left: -85px;
                        }
                    }
                }
            }
        }
        .transfer-input {
            width: 100%;
            height: 39px;
            font-size: 14px;
            background: $color-white;
            border-radius: 5px;
            border: 1px solid #cecece;
            padding-left: 10px;
            margin: 7px 0 24px 0;
        }
        .transfer-warning-msg {
            width: 100%;
        }
        .transfer-button {
            width: 100%;
            font-size: 17px;
            font-weight: bold;
            border: $border-style;
            background: $color-yellow-linear-unpress;
            border-radius: 5px;
            padding: 16px 0 16px 0;
            margin-top: 32px;

            &:active {
                background: $color-yellow-linear;
            }
        }
    }
}
</style>