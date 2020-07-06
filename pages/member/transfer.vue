<template>
    <main class="member-wrapper">
        <!-- Message Modal-->
        <modal-message></modal-message>

        <!-- Member Nav -->
        <the-member-nav></the-member-nav>

        <!-- Wallet List -->
        <the-wallet-list></the-wallet-list>

        <!-- Content -->
        <div class="member-container member-transfer">
            <!-- Available Balance -->
            <h3>{{ $t('member.available_balance') }}</h3>
            <div class="input-wrapper">
                <input type="text" :placeholder="$t('member.available_balance')" v-model="availableBalance" />
            </div>

            <!-- Transfer From -->
            <h3>{{ $t('transfer.transfer_from') }}</h3>
            <base-wallet-selector v-on:getHideGame="getFromGame" :hideGame="toGame" :type="'from'"></base-wallet-selector>

            <!-- Transfer To -->
            <h3>{{ $t('transfer.transfer_to') }}</h3>
            <base-wallet-selector v-on:getHideGame="getToGame" :hideGame="fromGame" :type="'to'"></base-wallet-selector>

            <!-- Amount -->
            <h3>{{ $t('member.amount') }} (THB)</h3>
            <div class="input-wrapper">
                <input type="text" :placeholder="$t('member.amount')" v-model="amount" :disabled="!isEnough" />
            </div>

            <!-- Transfer Button -->
            <button type="button" @click="transfer()">{{ $t('member.transfer') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import ModalMessage from '@/components/modal/ModalMessage';
import TheMemberNav from '@/components/member/TheMemberNav';
import TheWalletList from '@/components/member/TheWalletList';
import BaseWalletSelector from '@/components/member/BaseWalletSelector';

export default {
    computed: {
        ...mapGetters('wallet', {
            httpStatus: 'GetHttpStatus',
            wallets: 'GetWallets',
            balance: 'GetBalance'
        })
    },
    components: {
        ModalMessage,
        TheMemberNav,
        TheWalletList,
        BaseWalletSelector
    },
    data() {
        return {
            availableBalance: 'THB 0.00',
            fromGame: null,
            fromGameOK: false,
            toGame: null,
            toGameOK: false,
            amount: '0.00',
            amountOK: false,
            isEnough: false
        };
    },
    beforeMount() {
        this.$store.dispatch('wallet/getBalance', 'main').then(() => {
            this.availableBalance = `THB ${this.balance.toFixed(2)}`;
        });
    },
    mounted() {
        // Check Amount
        $('.transfer-input').keyup(() => {
            this.checkAmount();
        });
    },
    methods: {
        // Get From Game
        getFromGame(game) {
            this.fromGame = game;
            if (this.fromGame === 'none') {
                this.fromGameOK = false;
                this.amount = '-';
                this.checkAmount();
            } else {
                this.fromGameOK = true;
                this.$store.dispatch('wallet/getBalance', game).then(() => {
                    this.amount = this.balance.toFixed(2);
                    this.checkAmount();
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

        // Transfer Submit
        transfer() {
            this.$store
                .dispatch('wallet/transfer', {
                    from: this.fromGame,
                    to: this.toGame,
                    amount: this.amount
                })
                .then(() => {
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
    @import '@/assets/scss/PageMember.scss';
</style>