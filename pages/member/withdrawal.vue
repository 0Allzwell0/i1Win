<template>
    <main class="withdrawal-wrapper">
        <!-- Tab -->
        <my-member-tab />

        <!-- Wallet List -->
        <my-wallet-list />

        <!-- Content -->
        <div class="withdrawal-container">
            <!-- Available Balance -->
            <h3 class="withdrawal-title-text">{{ $t('wallet.available_balance') }}</h3>
            <div class="withdrawal-content-text">THB {{ availableBalance }}</div>

            <!-- Withdrawal Bank -->
            <h3 class="withdrawal-title-text">{{ $t('withdrawal.withdrawal_to') }}</h3>
            <my-banks-selecter v-on:getBank="getBank"></my-banks-selecter>

            <!-- Full Name -->
            <h3 class="withdrawal-title-text">{{ $t('common.fullname') }}</h3>
            <div class="withdrawal-content-text">{{ userData.fullname }}</div>

            <!-- Account Number -->
            <h3 class="withdrawal-title-text">{{ $t('withdrawal.account_number') }}</h3>
            <input
                class="withdrawal-input account-number-input"
                type="text"
                v-model="accountNumber"
                :placeholder="$t('withdrawal.account_number_placeholder')"
            />

            <!-- Amount -->
            <h3 class="withdrawal-title-text">{{ $t('wallet.amount') }} (THB)</h3>
            <input
                class="withdrawal-input amount-input"
                type="number"
                v-model="amount"
                :placeholder="amountPlaceholder"
                :disabled="amountAllowed"
            />

            <!-- Warning Message -->
            <p class="withdrawal-warning-msg">{{ $t('withdrawal.withdrawal_msg') }}</p>

            <!-- Withdrawal Button -->
            <button
                class="withdrawal-button"
                type="submit"
                @click="withdrawal()"
                :disabled="requestState || true"
                :class="{'allow': requestState}"
            >{{ $t('wallet.withdrawal') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyWalletList from '~/components/MyWalletList';
import MyBanksSelecter from '~/components/MyBanksSelecter';

export default {
    computed: {
        ...mapGetters('auth', {
            accessToken: 'GetAccessToken',
            userData: 'GetUserData'
        }),
        ...mapGetters('wallet', {
            requestState: 'GetRequestState',
            wallets: 'GetWallets',
            limits: 'GetLimits'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList,
        MyBanksSelecter
    },
    data() {
        return {
            availableBalance: null,
            accountNumber: null,
            accountNumberOK: false,
            amount: null,
            amountOK: false,
            amountAllowed: false,
            amountPlaceholder: null,
            bankOK: false
        };
    },
    mounted() {
        let _this = this;

        this.getAvailableBalanve();
        this.checkAmount();

        // Check Account Number
        $('.account-number-input').keyup(function() {
            let accountNumLeng = $('.account-number-input').val().length;
            if (accountNumLeng > 0) {
                _this.accountNumberOK = true;
            } else {
                _this.accountNumberOK = false;
            }
            _this.checkInfo();
        });

        // Check Amount
        $('.amount-input').keyup(function() {
            let amountLength = $('.amount-input').val().length;
            if (amountLength > 0) {
                _this.amountOK = true;
            } else {
                _this.amountOK = false;
            }
            _this.checkInfo();
        });
    },
    methods: {
        // Get Available Balance
        getAvailableBalanve() {
            if (this.wallets) {
                for (let i = 0; i < this.wallets.length; i++) {
                    if (this.wallets[i].name === 'Main') {
                        this.availableBalance = this.wallets[i].amount.toFixed(2);
                        break;
                    }
                }
            } else {
                this.availableBalance = (0).toFixed(2);
            }
        },

        // Check Amount Is Availabled To Input And Change "Placeholder"
        // 1. The number of withdrawals per day has exceeded the limit
        // 2. The amount of one-day withdrawal has exceeded the limit
        // 3. Insufficient balance
        // 4. The minimum withdrawal amount is "minWithdraw" or 50
        checkAmount() {
            if (this.limits && this.wallets) {
                if (this.limits.todayWithdrawTotal >= this.limits.maxDailyWithdraw) {
                    this.amountAllowed = true;
                    this.amountPlaceholder = this.$t('withdrawal.today_withdraw_total');
                } else if (this.limits.todayCount >= this.limits.maxDaily) {
                    this.amountAllowed = true;
                    this.amountPlaceholder = this.$t('withdrawal.today_count');
                } else if (this.wallets[0].amount < this.limits.minWithdraw) {
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
        },

        // Get Selected Bank
        getBank(accountNumber, bank, bankOK) {
            this.selectedBank = bank;
            this.bankOK = bankOK;
            this.checkInfo();
        },

        // Cheeck Information To Allow "Withdrawal" Button
        checkInfo() {
            $('.withdrawal-button').removeClass('allow');
            if (this.bankOK && this.accountNumberOK && this.amountOK) {
                $('.withdrawal-button').addClass('allow');
                $('.withdrawal-button').attr('disabled', false);
            } else {
                $('.withdrawal-button').attr('disabled', true);
            }
        },

        // Withdrawal Submit
        withdrawal() {
            this.$store.dispatch('wallet/withdrawal', {
                accessToken: this.accessToken,
                toBank: this.selectedBank,
                accountNumber: this.accountNumber,
                amount: this.amount
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.withdrawal-wrapper {
    width: 100%;
    height: 100%;

    .withdrawal-container {
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
        .withdrawal-title-text {
            width: 100%;
            font-size: 15px;
        }
        .withdrawal-content-text {
            width: 100%;
            font-size: 14px;
            color: rgba(25, 25, 25, 0.5);
            border: 1px solid #cecece;
            border-radius: 5px;
            margin: 7px 0 24px 0;
            padding: 10px 17px 7px 17px;
        }
        .withdrawal-input-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 39px;
            border-radius: 5px;
            border: 1px solid #cecece;
            background: $color-white;
            margin: 7px 0 24px 0;

            .withdrawal-down {
                width: 15px;
                font-size: 20px;
                color: $color-black;
                align-self: center;
                margin-right: 8px;
            }
        }
        .withdrawal-input {
            width: 100%;
            height: 39px;
            font-size: 14px;
            background: $color-white;
            border-radius: 5px;
            border: 1px solid #cecece;
            padding-left: 10px;
            margin: 7px 0 24px 0;
        }
        .withdrawal-warning-msg {
            width: 100%;
        }
        .withdrawal-button {
            width: 100%;
            font-size: 17px;
            font-weight: bold;
            border: $border-style;
            background: $color-yellow-linear-unpress;
            border-radius: 5px;
            opacity: 0.6;
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