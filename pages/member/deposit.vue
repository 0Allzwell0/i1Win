<template>
    <main class="deposit-wrapper">
        <!-- Tab -->
        <my-member-tab />

        <!-- Wallet List -->
        <my-wallet-list />

        <!-- Content -->
        <div class="deposit-container">
            <!-- Deposit Bank -->
            <h3 class="deposit-title-text">{{ $t('deposit.deposit_to') }}</h3>
            <div class="deposit-input-wrapper">
                <button class="deposit-input bank-input" type="button" @click="showBankList()">{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                <ul class="deposit-banks-list" :class="{'show': isShowBankList}">
                    <li class="deposit-bank-item" @click="selectBank('none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="deposit-bank-item"
                        v-for="(item, index) in banksList"
                        :key="`deposit_bank_${index}`"
                        @click="selectBank(item)"
                    >
                        <img class="deposit-bank-img" :src="`/images/bank_${item}.png`" />
                    </li>
                </ul>
            </div>

            <!-- Bank Detail -->
            <h3 class="deposit-title-text">{{ $t('deposit.bank_detail') }}</h3>
            <div class="deposit-bank-detail-wrapper">
                <div class="deposit-detail-container">
                    <div class="deposit-bank-name-wrapper">
                        <span class="deposit-bank-name-title">{{ $t('deposit.name') }}</span>
                        <span class="deposit-bank-name-value"></span>
                    </div>
                    <div class="deposit-bank-account-wrapper">
                        <span class="deposit-bank-account-title">{{ $t('wallet.account_number') }}</span>
                        <span class="deposit-bank-account-value"></span>
                    </div>
                </div>
                <div class="deposit-copy-wrapper">
                    <fa :icon="['fas', 'copy']" class="deposit-copy-img" />
                    <span class="deposit-copy-text">{{ $t('deposit.copy_account_number') }}</span>
                </div>
            </div>

            <!-- Amount -->
            <h3 class="deposit-title-text">{{ $t('wallet.amount') }} (THB)</h3>
            <div class="deposit-amount-wrapper">
                <button class="deposit-amount-dollars" type="button" @click="setAmount(250)">฿ 250</button>
                <button class="deposit-amount-dollars" type="button" @click="setAmount(500)">฿ 500</button>
                <button class="deposit-amount-dollars" type="button" @click="setAmount(1000)">฿ 1000</button>
                <button class="deposit-amount-dollars" type="button" @click="setAmount(2000)">฿ 2000</button>
            </div>
            <div class="deposit-amount-wrapper second">
                <button class="deposit-amount-dollars" type="button" @click="setAmount(3000)">฿ 3000</button>
                <button class="deposit-amount-dollars" type="button" @click="setAmount(5000)">฿ 5000</button>
                <input class="deposit-amount-input" type="number" placeholder="THB" />
            </div>

            <!-- Transfer Time -->
            <h3 class="deposit-title-text">{{ $t('deposit.transfer_time') }}</h3>
            <div class="deposit-transfer-time-wrapper">
                <div class="deposit-transfer-time-container">
                    <client-only>
                        <date-picker
                            class="deposit-transfer-date-time"
                            :format="format"
                            :language="language"
                            :value="currentDate"
                        />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                </div>
                <div class="deposit-transfer-time-container">
                    <client-only>
                        <time-picker class="deposit-transfer-date-time" format="HH : mm" v-model="currentTime" hide-clear-button />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                </div>
            </div>

            <!-- Reference Number -->
            <h3 class="deposit-title-text">{{ $t('deposit.reference_number') }}</h3>
            <div class="deposit-input-wrapper">
                <input class="deposit-input" type="text" :placeholder="$t('deposit.reference_msg')" />
            </div>

            <!-- Upload File -->
            <h3 class="deposit-title-text">{{ $t('deposit.file_input') }}</h3>
            <div class="deposit-input-wrapper">
                <input class="deposit-input upload-file-input" type="file" :placeholder="$t('deposit.no_file_select')" />
            </div>

            <!-- Promotion -->
            <h3 class="deposit-title-text">{{ $t('footer.promotions') }}</h3>
            <div class="deposit-input-wrapper">
                <button
                    class="deposit-input promotion-input"
                    type="button"
                    @click="showPromotionList()"
                >{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                <ul class="deposit-promotions-list-wrapper" :class="{'show': isShowPromotionList}">
                    <li
                        class="deposit-promotions-list-item select-item"
                        @click="selectPromotion('none')"
                    >{{ $t('common.please_select') }}</li>
                    <li
                        class="deposit-promotions-list-item type-item"
                        v-for="(typeItem, index) in bonusList"
                        :key="`promotions_type_${index}`"
                        :label="typeItem.type"
                    >
                        {{ typeItem.type }}
                        <ul>
                            <li
                                class="deposit-promotions-list-item promotion-item"
                                v-for="(item, index) in typeItem.data"
                                :key="`promotions_item_${index}`"
                                @click="selectPromotion(item)"
                            >{{ item }}</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <!-- Warning Message -->
            <p class="deposit-warning-msg">{{ $t('deposit.agree_certify') }}</p>

            <!-- Deposit Button -->
            <button class="deposit-button" type="submit">{{ $t('wallet.deposit') }}</button>
        </div>
    </main>
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyWalletList from '~/components/MyWalletList';

export default {
    computed: {
        ...mapGetters('wallet', {
            banksList: 'GetBanks',
            bonusList: 'GetBonus'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList
    },
    data() {
        return {
            format: 'yyyy-MM-dd',
            language: this.$i18n.locale === 'th-TH' ? th : en,
            choiceAmount: null,
            totalAmount: 0,
            currentDate: null,
            currentTime: null,
            isShowBankList: false,
            isShowPromotionList: false
        };
    },
    mounted() {
        let _this = this;
        this.getCurrentDate();
        this.getCurrentTime();

        // When Touch Others Place, "Bank" List Or "Promotion" List Will Close
        $(document).click(function(el) {
            let touchEl = $(el.target)[0].className;

            if (
                touchEl.indexOf('bank-input') === -1 &&
                touchEl.indexOf('deposit-bank-item') === -1 &&
                touchEl.indexOf('deposit-bank-img') === -1
            ) {
                _this.isShowBankList = false;
            }

            if (touchEl.indexOf('promotion-input') === -1 && touchEl.indexOf('promotion-item') === -1) {
                _this.isShowPromotionList = false;
            }
        });
    },
    methods: {
        // Get Now Date
        getCurrentDate() {
            this.currentDate = new Date();
            let year = this.currentDate.getFullYear();
            let month = this.currentDate.getMonth() + 1;
            let date = this.currentDate.getDate();

            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (date >= 0 && date <= 9) {
                date = '0' + date;
            }

            this.currentDate = `${year}-${month}-${date}`;
        },

        // Get Now Time
        getCurrentTime() {
            this.currentTime = new Date();
            let hour = this.currentTime.getHours();
            let minute = this.currentTime.getMinutes();

            this.currentTime = { HH: hour, mm: minute };
        },

        // Show Or Close Bank List
        showBankList() {
            this.isShowBankList = !this.isShowBankList;
        },

        // Select Deposit Bank
        selectBank(bank) {
            if (bank !== 'none') {
                $('.bank-input').html(`<img class="deposit-bank-img" src="/images/bank_${bank}.png" />`);
                $('.deposit-detail-container').addClass('show');
            } else {
                $('.bank-input').text(this.$t('common.please_select'));
                $('.deposit-detail-container').removeClass('show');
            }

            this.isShowBankList = false;
        },

        // Set Deposit Amount
        setAmount(amount) {
            if (this.choiceAmount != amount) {
                this.totalAmount = amount;
                this.choiceAmount = amount;
                $('.deposit-amount-input').val(amount);
            } else {
                this.totalAmount = this.totalAmount + amount;
                $('.deposit-amount-input').val(this.totalAmount);
            }
        },

        // Sjow Or Close Promotions List
        showPromotionList() {
            this.isShowPromotionList = !this.isShowPromotionList;
        },

        // Select Promotion
        selectPromotion(promotion) {
            if (promotion !== 'none') {
                $('.promotion-input').text(promotion);
            } else {
                $('.promotion-input').text(this.$t('common.please_select'));
            }

            this.isShowPromotionList = false;
        }
    }
};
</script>
<style lang="scss">
@import 'vue2-timepicker/dist/VueTimepicker.css';

.deposit-wrapper {
    width: 100%;
    height: 100%;

    .deposit-container {
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
        .deposit-title-text {
            width: 100%;
            font-size: 15px;
        }
        .deposit-input-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 39px;
            border-radius: 5px;
            border: 1px solid #cecece;
            background: $color-white;
            margin: 7px 0 24px 0;

            .deposit-input {
                width: 100%;
                font-size: 14px;
                background: $color-white;
                border-radius: 5px;
                text-align: left;
                padding-left: 10px;

                .deposit-bank-img {
                    width: 119px;
                }
                &.upload-file-input {
                    padding: 6px 0 0 6px;
                }
            }
            .deposit-down {
                width: 15px;
                font-size: 20px;
                color: $color-black;
                align-self: center;
                margin-right: 8px;
            }
            .deposit-banks-list {
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
                .deposit-bank-item {
                    width: 100%;
                    border-bottom: 1px solid #cecece;
                    padding: 10px 0 10px 10px;

                    .deposit-bank-img {
                        width: 119px;
                    }
                }
            }
            .deposit-promotions-list-wrapper {
                display: none;
                position: absolute;
                z-index: 10;
                top: -251px;
                left: 0;
                width: 100%;
                height: 250px;
                font-size: 15px;
                border-radius: 5px;
                border: 1px solid #cecece;
                background: $color-white;
                overflow-y: auto;

                &.show {
                    display: block;
                }
                .deposit-promotions-list-item {
                    font-weight: normal;
                    padding: 10px 20px 5px 20px;

                    &.select-item {
                        padding: 15px 10px 8px 10px;
                    }
                    &.type-item {
                        font-weight: bold;
                        padding: 5px 10px;
                    }
                }
            }
        }
        .deposit-bank-detail-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            color: $color-white-gray;
            padding: 10px;
            margin: 7px 0 24px 0;
            border: 1px solid #cecece;
            border-radius: 5px;

            .deposit-detail-container {
                display: none;
                width: 100%;

                &.show {
                    display: block;
                }
                .deposit-bank-name-wrapper {
                    display: flex;
                    width: 100%;

                    .deposit-bank-name-value {
                        font-size: 13px;
                        color: $color-black;
                        margin-left: 12.5px;
                    }
                }
                .deposit-bank-account-wrapper {
                    display: flex;
                    width: 100%;

                    .deposit-bank-account-value {
                        font-size: 13px;
                        color: $color-black;
                        margin-left: 12.5px;
                    }
                }
            }
            .deposit-copy-wrapper {
                display: flex;
                width: 100%;
                margin-top: 5px;

                .deposit-copy-img {
                    font-size: 18px;
                }
                .deposit-copy-text {
                    margin-left: 4%;
                }
            }
        }
        .deposit-amount-wrapper {
            display: flex;
            justify-content: space-between;
            margin-top: 7px;

            &.second {
                margin-bottom: 24px;
            }
            .deposit-amount-dollars {
                width: 23%;
                height: 39px;
                font-size: 18px;
                color: $color-yellow;
                background: $color-black;
                border-radius: 5px;
                padding-top: 3px;
            }
            .deposit-amount-input {
                width: 49%;
                height: 39px;
                font-size: 16px;
                border-radius: 5px;
                border: 1px solid #cecece;
                background: $color-white;
                padding: 2px 8px 0 10px;
            }
        }
        .deposit-transfer-time-wrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin: 7px 0 24px 0;

            .deposit-transfer-time-container {
                position: relative;
                width: 47%;

                .deposit-transfer-date-time {
                    width: 100%;

                    input {
                        width: 100%;
                        height: 39px;
                        font-size: 15px;
                        border-radius: 5px;
                        border: 1px solid #cecece;
                        background: $color-white;
                        padding: 0 10px;
                    }

                    .dropdown {
                        top: 39px;
                    }
                }
                .deposit-down {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                }
            }
        }
        .deposit-warning-msg {
            width: 100%;
        }
        .deposit-button {
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