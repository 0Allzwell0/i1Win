<template>
    <main class="transfer-wrapper">
        <!-- Error Message -->
        <my-message-modal />

        <!-- Tab -->
        <my-member-tab />

        <!-- Wallet List -->
        <my-wallet-list />

        <!-- Content -->
        <div class="transfer-container">
            <!-- Available Balance -->
            <h3 class="transfer-title-text">{{ $t('wallet.available_balance') }}</h3>
            <div class="transfer-content-text">THB {{ availableBalance || '0.00' }}</div>

            <!-- Transfer From -->
            <h3 class="transfer-title-text">{{ $t('transfer.transfer_from') }}</h3>
            <my-wallet-selecter v-on:getHideGame="getFromGame" :hideGame="toGame" :type="'from'"></my-wallet-selecter>

            <!-- Transfer To -->
            <h3 class="transfer-title-text">{{ $t('transfer.transfer_to') }}</h3>
            <my-wallet-selecter v-on:getHideGame="getToGame" :hideGame="fromGame" :type="'to'"></my-wallet-selecter>

            <!-- Amount -->
            <span class="transfer-title-text">{{ $t('wallet.amount') }} (THB)</span>
            <input class="transfer-input" type="number" :placeholder="$t('wallet.amount')" v-model="amount" :disabled="!isEnough" />

            <!-- Transfer Button -->
            <button
                class="transfer-button"
                type="submit"
                @click="transfer()"
                :disabled="requestState || true"
                :class="{'allow': requestState}"
            >{{ $t('wallet.transfer') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyWalletList from '~/components/MyWalletList';
import MyWalletSelecter from '~/components/MyWalletSelecter';
import MyMessageModal from '~/components/MyMessageModal';

export default {
    computed: {
        ...mapGetters('wallet', {
            httpStatus: 'GetHttpStatus',
            requestState: 'GetRequestState',
            wallets: 'GetWallets',
            balance: 'GetBalance'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList,
        MyWalletSelecter,
        MyMessageModal
    },
    data() {
        return {
            availableBalance: (0).toFixed(2),
            fromGame: null,
            fromGameOK: false,
            toGame: null,
            toGameOK: false,
            amount: (0).toFixed(2),
            amountOK: false,
            isEnough: false
        };
    },
    // beforeMount() {
    //     this.$store.dispatch('wallet/getBalance', 'main').then(() => {
    //         this.availableBalance = this.balance;
    //     });
    // },
    mounted() {
        let scrollTop = $('.wallet-list-container').height();
        $('.transfer-container').css('margin-top', -scrollTop);

        // Check Amount
        $('.transfer-input').keyup(() => {
            this.checkAmount();
            this.checkInfo();
        });
    },
    methods: {
        // Get From Game
        getFromGame(game) {
            this.fromGame = game;
            if (this.fromGame === 'none') {
                this.fromGameOK = false;
                this.amount = (0).toFixed(2);
                this.checkAmount();
                this.checkInfo();
            } else {
                this.fromGameOK = true;
                this.$store.dispatch('wallet/getBalance', game).then(() => {
                    this.amount = this.balance;
                    this.checkAmount();
                    this.checkInfo();
                });
            }
        },

        // Get To Game
        getToGame(game) {
            this.toGame = game;
            if (this.toGame === 'none') {
                this.toGameOK = false;
            } else {
                this.toGameOK = true;
            }
            this.checkInfo();
        },

        // Check Amount
        checkAmount() {
            if (this.amount) {
                if (typeof this.amount === 'string') {
                    this.amount = parseFloat(this.amount);
                }

                if (this.amount > 0 && this.amount <= this.availableBalance) {
                    this.isEnough = true;
                    this.amountOK = true;
                } else {
                    this.isEnough = false;
                    this.amountOK = false;
                }
            } else {
                this.isEnough = false;
                this.amountOK = false;
            }
        },

        // Check Infromation To Allow "Transfer" Button
        checkInfo() {
            $('.transfer-button').removeClass('allow');
            if (this.fromGameOK && this.toGameOK && this.amountOK) {
                $('.transfer-button').addClass('allow');
                $('.transfer-button').attr('disabled', false);
            } else {
                $('.transfer-button').attr('disabled', true);
            }
        },

        // Transfer Submit
        transfer() {
            this.$store.dispatch('wallet/transfer',
            {
                from: this.fromGame,
                to: this.toGame,
                amount: this.amount
            }).then(() => {
                if (this.httpStatus === 422) {
                    let msgArray = [];
                    $('#errorMsg .error-msg-container').html('');
                    for (let i in this.responseMsg) {
                        msgArray.push(this.responseMsg[i]);
                    }
                    for (let j = 0; j < msgArray.length; j++) {
                        $('#errorMsg .error-msg-container').append(`<div class="error-msg">${j + 1}. ${msgArray[j]}</div>`);
                    }
                } else if (this.httpStatus === 200) {
                    $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('transfer.success_msg')}</div>`);
                } else {
                    $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.responseMsg}</div>`);
                }

                $('#errorMsg').modal('show');
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .transfer-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 100px);
        font-family: $font-family;
        font-size: 14px;

        .transfer-container {
            position: absolute;
            z-index: 1;
            top: 161px;
            left: 0;
            display: flex;
            flex-direction: column;
            width: 100%;
            background: $background_img;
            background-size: cover;
            font-family: $font-family;
            font-size: 12px;
            font-weight: bold;
            padding: 5% 5% 90px 5%;
            transition: margin-top 400ms;

            &.expand {
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
                opacity: 0.7;
                padding: 16px 0 16px 0;
                margin-top: 32px;

                &:active {
                    background: $color-yellow-linear;
                }

                &.allow {
                    opacity: 1;
                }
            }
        }
    }
</style>