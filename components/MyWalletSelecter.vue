<template>
    <div class="transfer-input-wrapper">
        <button
            :class="`transfer-game-input transfer-input-${type}`"
            type="button"
            @click.stop="expandGameList()"
        >{{ $t('common.please_select') }}</button>
        <fa :icon="['fas', 'caret-down']" class="transfer-down" />
        <ul class="transfer-games-list" :class="{'show': showGamesList}">
            <li class="transfer-game-item" @click.stop="selectGame('none', 'none', 'none')">{{ $t('common.please_select') }}</li>
            <li
                class="transfer-game-item"
                :class="{'active': hideGame === item.name.toLowerCase()}"
                v-for="(item, index) in wallets"
                :key="`transfer_game_${index}`"
                @click.stop="selectGame(item.name.toLowerCase(), item.status, item.amount)"
            >
                <img class="transfer-game-img" :src="`/images/wallet_${item.name.toLowerCase()}.png`" />
                <span class="transfer-game-text" v-if="(item.name === 'Main')">{{ $t('wallet.main_wallet') }}</span>
                <span class="transfer-maintenance-text" v-if="(item.status === 2)">{{ $t('transfer.maintenance') }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        type: {
            type: String,
            default: null
        },
        hideGame: {
            type: String,
            default: null
        }
    },
    computed: {
        ...mapGetters('wallet', {
            wallets: 'GetWallets'
        })
    },
    data() {
        return {
            showGamesList: false,
            selectedFromGame: null,
            selectedToGame: null
        };
    },
    mounted() {
        let _this = this;

        // When Touch Others Place, "Games" List Will Close
        $(document).click(function() {
            _this.showGamesList = false;
        });
    },
    methods: {
        // Show Or Close Transfer Game List
        expandGameList() {
            this.showGamesList = !this.showGamesList;
        },

        // Select Transfer Game
        selectGame(game, status, amount) {
            if (status !== 2) {
                if (this.type === 'from') {
                    this.selectedFromGame = game;
                    this.setHtml(this.selectedFromGame);
                    this.$emit('getHideGame', this.selectedFromGame, amount);
                } else {
                    this.selectedToGame = game;
                    this.setHtml(this.selectedToGame);
                    this.$emit('getHideGame', this.selectedToGame);
                }

                this.showGamesList = false;
            }
        },

        // Set Image To Game Button Html
        setHtml(game) {
            if (game === 'none') {
                $(`.transfer-input-${this.type}`).text(this.$t('common.please_select'));
            } else if (game === 'main') {
                $(`.transfer-input-${this.type}`).html(
                    `<img class="transfer-game-img" src="/images/wallet_main.png" />
                    <span class="transfer-game-text">${this.$t('wallet.main_wallet')}</span>
                    `
                );
            } else {
                $(`.transfer-input-${this.type}`).html(`<img class="transfer-game-img" src="/images/wallet_${game}.png" />`);
            }
        }
    }
};
</script>
<style lang="scss">
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
            position: relative;
            display: flex;
            justify-content: space-between;
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
                position: absolute;
                left: 45px;
            }
            .transfer-maintenance-text {
                margin-right: 15px;
            }
        }
    }
}
</style>