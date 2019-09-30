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
                    <li class="deposit-bank-item" @click="selectBank(null, 'none', 'none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="deposit-bank-item"
                        v-for="(item, index) in banksList"
                        :key="`deposit_bank_${index}`"
                        @click="selectBank(item.accountNumber, item.bank, item.name)"
                    >
                        <img class="deposit-bank-img" :src="`/images/bank_${item.name}.png`" />
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
                            id="transfer-date"
                            class="deposit-transfer-date-time"
                            :format="format"
                            :language="language"
                            v-model="currentDate"
                        />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                </div>
                <div class="deposit-transfer-time-container">
                    <client-only>
                        <time-picker
                            id="transfer-time"
                            class="deposit-transfer-date-time"
                            format="HH : mm"
                            v-model="currentTime"
                            :value="currentTime"
                            hide-clear-button
                        />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                </div>
            </div>

            <!-- Reference Number -->
            <h3 class="deposit-title-text">{{ $t('deposit.reference_number') }}</h3>
            <div class="deposit-input-wrapper">
                <input
                    class="deposit-input reference-input"
                    type="text"
                    :placeholder="$t('deposit.reference_msg')"
                    v-model="referenceNo"
                />
            </div>

            <!-- Upload File -->
            <h3 class="deposit-title-text">{{ $t('deposit.file_input') }}</h3>
            <form action class="deposit-input-wrapper" enctype="multipart/form-data">
                <input id="upload-file-input" class="deposit-input" type="file" :placeholder="$t('deposit.no_file_select')" />
            </form>

            <!-- Bonus -->
            <h3 class="deposit-title-text">{{ $t('footer.promotions') }}</h3>
            <div class="deposit-input-wrapper">
                <button class="deposit-input bonus-input" type="button" @click="showBonusList()">{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                <ul class="deposit-bonus-list-wrapper" :class="{'show': isShowBonusList}">
                    <li class="deposit-bonus-list-item select-item" @click="selectBonus('none')">{{ $t('common.please_select') }}</li>
                    <li
                        class="deposit-bonus-list-item type-item"
                        v-for="(typeItem, index) in bonusList"
                        :key="`bonus_type_${index}`"
                        :label="typeItem.type"
                    >
                        {{ typeItem.type }}
                        <ul>
                            <li
                                class="deposit-bonus-list-item bonus-item"
                                v-for="(item, index) in typeItem.data"
                                :key="`bonus_item_${index}`"
                                @click="selectBonus(item)"
                            >{{ item }}</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <!-- Warning Message -->
            <p class="deposit-warning-msg">{{ $t('deposit.agree_certify') }}</p>

            <!-- Deposit Button -->
            <button class="deposit-button" type="submit" @click="deposit()" disabled>{{ $t('wallet.deposit') }}</button>
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
        ...mapGetters('auth', {
            accessToken: 'GetAccessToken'
        }),
        ...mapGetters('wallet', {
            banksList: 'GetBanksList',
            bonusList: 'GetBonus',
            limits: 'GetLimits'
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
            selectedPromotion: null,
            accountNumber: null,
            referenceNo: null,
            upLoadFile: null,
            isShowDateList: false,
            isShowTimeList: false,
            isShowBankList: false,
            isShowBonusList: false,
            bankOK: false,
            amountOK: false,
            dateTimeOK: false,
            referenceOK: false,
            uploadFileOK: false,
            bonusOK: false
        };
    },
    mounted() {
        let _this = this;
        this.getCurrentDate();
        this.getCurrentTime();

        // When Touch Others Place, "Bank" List Or "Promotion" List Will Close
        // Check Date、Time
        $(document).click(function(el) {
            let touchEl = $(el.target)[0].className;

            // 因為點擊日期或時間的箭頭時，沒有"Class Name"，且取到的資料是物件型態。所以要先判斷
            if (typeof touchEl === 'string') {
                if (
                    touchEl.indexOf('bank-input') === -1 &&
                    touchEl.indexOf('deposit-bank-item') === -1 &&
                    touchEl.indexOf('deposit-bank-img') === -1
                ) {
                    _this.isShowBankList = false;
                }

                if (touchEl.indexOf('bonus-input') === -1 && touchEl.indexOf('bonus-item') === -1) {
                    _this.isShowBonusList = false;
                }

                // Check Date
                if ($(el.target)[0].id === 'transfer-date') {
                    this.isShowDateList = !this.isShowDateList;
                    _this.checkDateTime();
                }

                // Check Time
                if (touchEl.indexOf('deposit-transfer-date-time') !== -1) {
                    this.isShowTimeList = !this.isShowTimeList;
                    _this.checkDateTime();
                }
            }
        });

        // Check Date、Time
        this.checkDateTime();

        // Check Amount Input
        $('.deposit-amount-input').keyup(function() {
            if (parseFloat($(this).val()) > 0) {
                _this.amountOK = true;
            } else {
                _this.amountOK = false;
            }
            _this.checkInfo();
        });

        // Check Reference Input
        $('.reference-input').keyup(function() {
            let referenceNum = $('.reference-input').val();
            if (referenceNum.length > 0) {
                _this.referenceOK = true;
            } else {
                _this.referenceOK = false;
            }
            _this.checkInfo();
        });

        // Check Upload File
        $('#upload-file-input').change(function() {
            _this.uploadFile = $('#upload-file-input').val();
            if (_this.uploadFile.length > 0) {
                _this.uploadFileOK = true;
            } else {
                _this.uploadFileOK = false;
            }
            _this.checkInfo();
        });
    },
    methods: {
        // Get Current Date
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

        // Get Current Time
        getCurrentTime() {
            this.currentTime = new Date();
            let hour = this.currentTime.getHours();
            let minute = this.currentTime.getMinutes();
            this.currentTime = `${hour} : ${minute}`;
        },

        // Check Date、Time
        checkDateTime() {
            if (this.currentDate && this.currentTime) {
                this.dateTimeOK = true;
            } else {
                this.dateTimeOK = false;
            }
            this.checkInfo();
        },

        // Show Or Close Bank List
        showBankList() {
            this.isShowBankList = !this.isShowBankList;
        },

        // Select Deposit Bank
        selectBank(accountNumber, bank, name) {
            if (bank !== 'none') {
                $('.bank-input').html(`<img class="deposit-bank-img" src="/images/bank_${name}.png" />`);
                $('.deposit-detail-container').addClass('show');
                this.bankOK = true;
            } else {
                $('.bank-input').text(this.$t('common.please_select'));
                $('.deposit-detail-container').removeClass('show');
                this.bankOK = false;
            }

            this.accountNumber = accountNumber;
            this.isShowBankList = false;
            this.checkInfo();
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

            this.amountOK = true;
            this.checkInfo();
        },

        // Sjow Or Close Promotions List
        showBonusList() {
            this.isShowBonusList = !this.isShowBonusList;
        },

        // Select Promotion
        selectBonus(promotion) {
            if (promotion !== 'none') {
                $('.bonus-input').text(promotion);
                this.bonusOK = true;
            } else {
                $('.bonus-input').text(this.$t('common.please_select'));
                this.bonusOK = false;
            }

            this.selectedPromotion = promotion;
            this.isShowBonusList = false;
            this.checkInfo();
        },

        // Check Info
        checkInfo() {
            $('.deposit-button').removeClass('allow');
            if (this.bankOK && this.amountOK && this.dateTimeOK && this.referenceOK && this.uploadFileOK && this.bonusOK) {
                $('.deposit-button').addClass('allow');
                $('.deposit-button').attr('disabled', false);
            } else {
                $('.deposit-button').attr('disabled', true);
            }
        },

        // Convert data to formData format
        transDataToFormData() {
            this.formData = new FormData();
            this.formData.append('AccountNumber', this.accountNumber);
            this.formData.append('Amount', this.totalAmount);
            this.formData.append('DateTime', this.currentDate + ' ' + this.currentTime);
            if (this.referenceNo) this.formData.append('Reference', this.referenceNo);
            if (this.uploadFile) this.formData.append('Receipt', this.uploadFile);
            if (this.selectedPromotion) this.formData.append('Bonus', this.selectedPromotion);
        },

        // Deposit Submit
        deposit() {
            this.transDataToFormData();
            this.$store.dispatch('wallet/deposit', {
                accessToken: this.accessToken,
                formData: this.formData
            });
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
                &#upload-file-input {
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
            .deposit-bonus-list-wrapper {
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
                .deposit-bonus-list-item {
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