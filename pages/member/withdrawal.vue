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
            <div class="withdrawal-input-wrapper">
                <button class="withdrawal-bank-input" type="button" @click="showBankList()">{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="withdrawal-down" />
                <ul class="withdrawal-banks-list" :class="{'show': isShowBankList}">
                    <li class="withdrawal-bank-item" @click="selectBank('none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="withdrawal-bank-item"
                        v-for="(item, index) in banksList"
                        :key="`withdrawal_bank_${index}`"
                        @click="selectBank(item)"
                    >
                        <img class="withdrawal-bank-img" :src="`/images/bank_${item}.png`" />
                    </li>
                </ul>
            </div>

            <!-- Full Name -->
            <h3 class="withdrawal-title-text">{{ $t('common.fullname') }}</h3>
            <div class="withdrawal-content-text">Allzwell</div>

            <!-- Account Number -->
            <h3 class="withdrawal-title-text">{{ $t('withdrawal.account_number') }}</h3>
            <input class="withdrawal-input" type="text" :placeholder="$t('withdrawal.account_number_placeholder')" />

            <!-- Amount -->
            <h3 class="withdrawal-title-text">{{ $t('wallet.amount') }} (THB)</h3>
            <input class="withdrawal-input" type="number" :placeholder="`${$t('wallet.amount')} (THB)`" />

            <!-- Warning Message -->
            <p class="withdrawal-warning-msg">{{ $t('withdrawal.withdrawal_msg') }}</p>

            <!-- Withdrawal Button -->
            <button class="withdrawal-button" type="submit">{{ $t('wallet.withdrawal') }}</button>
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
            banksList: 'GetBanksList'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList
    },
    data() {
        return {
            availableBalance: null,
            isShowBankList: false
        };
    },
    mounted() {
        let _this = this;

        this.availableBalance = this.wallets[0].amount.toFixed(2);

        // When Touch Others Place, "Bank" List Or "Promotion" List Will Close
        $(document).click(function(el) {
            let touchEl = $(el.target)[0].className;

            if (
                touchEl.indexOf('withdrawal-bank-input') === -1 &&
                touchEl.indexOf('withdrawal-bank-item') === -1 &&
                touchEl.indexOf('withdrawal-bank-img') === -1
            ) {
                _this.isShowBankList = false;
            }
        });
    },
    methods: {
        // Show Or Close Bank List
        showBankList() {
            this.isShowBankList = !this.isShowBankList;
        },

        // Select Withdrawal Bank
        selectBank(bank) {
            if (bank !== 'none') {
                $('.withdrawal-bank-input').html(`<img class="withdrawal-bank-img" src="/images/bank_${bank}.png" />`);
            } else {
                $('.withdrawal-bank-input').text(this.$t('common.please_select'));
            }

            this.isShowBankList = false;
        }
    }
};
</script>
<style lang="scss">
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

            .withdrawal-bank-input {
                width: 100%;
                font-size: 14px;
                background: $color-white;
                border-radius: 5px;
                text-align: left;
                padding-left: 10px;

                .withdrawal-bank-img {
                    width: 119px;
                }
                &.upload-file-input {
                    padding: 6px 0 0 6px;
                }
            }
            .withdrawal-down {
                width: 15px;
                font-size: 20px;
                color: $color-black;
                align-self: center;
                margin-right: 8px;
            }
            .withdrawal-banks-list {
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

                &.show {
                    display: block;
                }
                .withdrawal-bank-item {
                    width: 100%;
                    border-bottom: 1px solid #cecece;
                    padding: 10px 0 10px 10px;

                    .withdrawal-bank-img {
                        width: 119px;
                    }
                }
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
            padding: 16px 0 16px 0;
            margin-top: 32px;

            &:active {
                background: $color-yellow-linear;
            }
        }
    }
}
</style>