<template>
    <main class="member-wrapper">
        <!-- Message Modal-->
        <modal-message></modal-message>

        <!-- Member Nav -->
        <the-member-nav></the-member-nav>

        <!-- Wallet List -->
        <the-wallet-list></the-wallet-list>

        <!-- Content -->
        <div class="member-container member-withdrawal">
            <!-- Available Balance -->
            <h3>{{ $t('member.available_balance') }}</h3>
            <div class="input-wrapper">
                <input type="text" :placeholder="$t('member.available_balance')" v-model="availableBalance" />
            </div>

            <!-- Withdrawal Bank -->
            <h3>{{ $t('withdrawal.withdrawal_to') }}</h3>
            <base-bank-selector v-on:selectedBank="getBank"></base-bank-selector>

            <!-- Fullname -->
            <h3>{{ $t('member.fullname') }}</h3>
            <div class="input-wrapper">
                <input type="text" :placeholder="$t('member.fullname')" v-model="myFullname" disabled />
            </div>

            <!-- Account Number -->
            <h3>{{ $t('withdrawal.account_number') }}</h3>
            <div class="input-wrapper">
                <input type="number" :placeholder="$t('withdrawal.account_num_placeholder')" v-model="accountNumber" />
            </div>

            <!-- Amount -->
            <h3>{{ $t('member.amount') }} (THB)</h3>
            <div class="input-wrapper">
                <input type="number" v-model="myAmount" :placeholder="amountPlaceholder" :disabled="amountAllowed" />
            </div>

            <!-- Descriptions -->
            <p>{{ $t('withdrawal.withdrawal_msg') }}</p>

            <!-- Withdrawal Button -->
            <button type="button" @click="withdrawal()">{{ $t('member.withdrawal') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import ModalMessage from '@/components/modal/ModalMessage';
import TheMemberNav from '@/components/member/TheMemberNav';
import TheWalletList from '@/components/member/TheWalletList';
import BaseBankSelector from '@/components/member/BaseBankSelector';

export default {
    computed: {
        ...mapGetters('auth', {
            accessToken: 'GetAccessToken'
        }),
        ...mapGetters('wallet', {
            httpStatus: 'GetHttpStatus',
            requestState: 'GetRequestState',
            wallets: 'GetWallets',
            balance: 'GetBalance',
            limits: 'GetLimits'
        })
    },
    components: {
        ModalMessage,
        TheMemberNav,
        TheWalletList,
        BaseBankSelector
    },
    data() {
        return {
            availableBalance: null,
            userData: null,
            myFullname: null,
            accountNumber: null,
            accountNumberOK: false,
            myAmount: null,
            amountOK: false,
            amountAllowed: false,
            amountPlaceholder: this.$t('withdrawal.amount_placeholder') + '50',
            bankOK: false
        };
    },
    mounted() {
        let _this = this;

        this.availableBalance = this.balance || '0.00';
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.myFullname = this.userData.fullname || this.$t('member.fullname');

        this.checkAmount();
    },
    methods: {
        // Check Amount Is Availabled To Input And Change "Placeholder"
        // 1. The number of withdrawals per day has exceeded the limit
        // 2. The amount of one-day withdrawal has exceeded the limit
        // 3. Insufficient balance
        // 4. The minimum withdrawal amount is "minWithdraw" or 50
        checkAmount() {
            this.$store.dispatch('wallet/getLimits').then(() => {
                if (this.limits) {
                    if (this.limits.todayWithdrawTotal >= this.limits.maxDailyWithdraw) {
                        this.amountAllowed = true;
                        this.amountPlaceholder = this.$t('withdrawal.today_withdraw_total');
                    } else if (this.limits.todayCount >= this.limits.maxDaily) {
                        this.amountAllowed = true;
                        this.amountPlaceholder = this.$t('withdrawal.today_count');
                    } else if (this.balance < this.limits.minWithdraw || this.balance <= 0) {
                        this.amountAllowed = true;
                        this.amountPlaceholder = this.$t('withdrawal.insufficient_balance');
                    } else {
                        this.amountAllowed = false;
                        this.amountPlaceholder = this.$t('withdrawal.amount_placeholder') + this.limits.minWithdraw;
                    }
                } else {
                    this.amountAllowed = false;
                    this.amountPlaceholder = this.$t('withdrawal.amount_placeholder') + '50';
                }
            });
        },

        // Get Selected Bank
        getBank(bank) {
            this.selectedBank = bank;
        },

        // Withdrawal Submit
        withdrawal() {
            this.$store
                .dispatch('wallet/withdrawal', {
                    toBank: this.selectedBank,
                    accountNumber: this.accountNumber,
                    amount: this.myAmount
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
                        $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('withdrawal.success_msg')}</div>`);
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