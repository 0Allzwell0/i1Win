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
            <my-banks-selecter v-on:getBank="getBank"></my-banks-selecter>

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
                <my-date-selecter v-on:getDate="getDate"></my-date-selecter>
                <my-time-selecter v-on:getTime="getTime"></my-time-selecter>
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
            <button
                class="deposit-button"
                type="submit"
                @click="deposit()"
                :disabled="requestState || true"
                :class="{'allow': requestState}"
            >{{ $t('wallet.deposit') }}</button>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyWalletList from '~/components/MyWalletList';
import MyDateSelecter from '~/components/MyDateSelecter';
import MyTimeSelecter from '~/components/MyTimeSelecter';
import MyBanksSelecter from '~/components/MyBanksSelecter';

export default {
    computed: {
        ...mapGetters('auth', {
            accessToken: 'GetAccessToken'
        }),
        ...mapGetters('wallet', {
            requestState: 'GetRequestState',
            bonusList: 'GetBonus',
            limits: 'GetLimits'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList,
        MyDateSelecter,
        MyTimeSelecter,
        MyBanksSelecter
    },
    data() {
        return {
            accountNumber: null,
            choiceAmount: null,
            totalAmount: 0,
            amountError: false,
            currentDate: null,
            currentTime: null,
            referenceNo: null,
            upLoadFile: null,
            selectedBonus: null,
            isShowBonusList: false,
            bankOK: false,
            amountOK: false,
            referenceOK: false,
            uploadFileOK: false,
            bonusOK: false
        };
    },
    mounted() {
        let _this = this;

        // When Touch Others Place, "Promotion" List Will Close
        $(document).click(function(el) {
            let touchEl = $(el.target)[0].className;
            if (touchEl.indexOf('bonus-input') === -1 && touchEl.indexOf('bonus-item') === -1) {
                _this.isShowBonusList = false;
            }
        });

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
        // Get Selected Bank
        getBank(accountNumber, bank, bankOK) {
            if (bankOK) {
                $('.deposit-bank-name-value').text(bank);
                $('.deposit-bank-account-value').text(accountNumber);
                $('.deposit-detail-container').addClass('show');
            } else {
                $('.deposit-detail-container').removeClass('show');
            }
            this.accountNumber = accountNumber;
            this.bankOK = bankOK;
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

        // Get Date Value
        getDate(currentDate) {
            this.currentDate = currentDate;
        },

        // Get Time Value
        getTime(currentTime) {
            this.currentTime = currentTime;
        },

        // Show Or Close Bonus List
        showBonusList() {
            this.isShowBonusList = !this.isShowBonusList;
        },

        // Select Bonus
        selectBonus(bonus) {
            if (bonus !== 'none') {
                $('.bonus-input').text(bonus);
                this.bonusOK = true;
            } else {
                $('.bonus-input').text(this.$t('common.please_select'));
                this.bonusOK = false;
            }

            this.selectedBonus = bonus;
            this.isShowBonusList = false;
            this.checkInfo();
        },

        // Check Information To Allow "Deposit" Button
        checkInfo() {
            $('.deposit-button').removeClass('allow');
            if (this.bankOK && this.amountOK && this.referenceOK && this.uploadFileOK && this.bonusOK) {
                $('.deposit-button').addClass('allow');
                $('.deposit-button').attr('disabled', false);
            } else {
                $('.deposit-button').attr('disabled', true);
            }
        },

        // Convert Data To "FormData" Format
        transDataToFormData() {
            this.formData = new FormData();
            this.formData.append('AccountNumber', this.accountNumber);
            this.formData.append('Amount', this.totalAmount);
            this.formData.append('DateTime', this.currentDate + ' ' + this.currentTime);
            if (this.referenceNo) this.formData.append('Reference', this.referenceNo);
            if (this.uploadFile) this.formData.append('Receipt', this.uploadFile);
            if (this.selectedBonus) this.formData.append('Bonus', this.selectedBonus);
        },

        // Check Deposit Amount
        checkAmount() {
            if (this.limits) {
                if (this.totalAmount > this.limits.maxDeposit) this.amountError = true;
                else this.amountError = false;
                if (this.totalAmount < this.limits.minDeposit) this.amountError = true;
                else this.amountError = false;
            } else {
                if (this.totalAmount > 50000) this.amountError = true;
                else this.amountError = false;
                if (this.totalAmount < 30) this.amountError = true;
                else this.amountError = false;
            }
        },

        // Deposit Submit
        deposit() {
            this.checkAmount();
            if (this.amount) {
                this.transDataToFormData();
                this.$store.dispatch('wallet/deposit', {
                    accessToken: this.accessToken,
                    formData: this.formData
                });
            } else {
                alert('Amount Error !!');
            }
        }
    }
};
</script>
<style lang="scss">
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