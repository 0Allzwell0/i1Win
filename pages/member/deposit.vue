<template>
    <main class="deposit-wrapper">
        <!-- Error Message -->
        <my-message-modal />

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
                <my-date-selecter></my-date-selecter>
                <my-time-selecter></my-time-selecter>
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
            <div class="deposit-input-wrapper">
                <input
                    id="upload-file-input"
                    class="deposit-input"
                    type="file"
                    :placeholder="$t('deposit.no_file_select')"
                    @change="getFile"
                />
            </div>

            <!-- Bonus -->
            <h3 class="deposit-title-text">{{ $t('footer.promotions') }}</h3>
            <div class="deposit-input-wrapper">
                <button class="deposit-input bonus-input" type="button" @click="showBonusList()">{{ $t('common.please_select') }}</button>
                <fa :icon="['fas', 'caret-down']" class="deposit-down" />
                <ul class="deposit-bonus-list-wrapper" :class="{'show': isShowBonusList}">
                    <li
                        class="deposit-bonus-list-item select-item"
                        @click="selectBonus('none', 'none')"
                    >{{ $t('common.please_select') }}</li>
                    <li
                        class="deposit-bonus-list-item type-item"
                        v-for="(typeItem, index) in newBonusList"
                        :key="`bonus_type_${index}`"
                    >
                        {{ typeItem.type }}
                        <ul>
                            <li
                                class="deposit-bonus-list-item bonus-item"
                                v-for="(item, index) in typeItem.bonus"
                                :key="`bonus_item_${index}`"
                                @click="selectBonus(item.name, item.code)"
                            >{{ item.name }}</li>
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
import MyMessageModal from '~/components/MyMessageModal';

export default {
    computed: {
        ...mapGetters('wallet', {
            httpStatus: 'GetHttpStatus',
            requestState: 'GetRequestState',
            responseMsg: 'GetResponseMsg',
            bonusList: 'GetBonus',
            limits: 'GetLimits'
        })
    },
    components: {
        MyMemberTab,
        MyWalletList,
        MyDateSelecter,
        MyTimeSelecter,
        MyBanksSelecter,
        MyMessageModal
    },
    data() {
        return {
            accountNumber: null,
            choiceAmount: null,
            totalAmount: 0,
            depositDate: null,
            depositTime: null,
            referenceNo: null,
            upLoadFile: null,
            formData: null,
            newBonusList: null,
            selectedBonus: null,
            isShowBonusList: false,
            bankOK: false,
            amountOK: false,
            referenceOK: false,
            upLoadFileOK: false,
            bonusOK: false
        };
    },
    mounted() {
        let _this = this;

        // Get Limits
        this.$store.dispatch('wallet/getLimits');

        // Get Bonus
        this.$store.dispatch('wallet/getBonus').then(() => {
            if (this.bonusList) {
                this.calculateType();
            }
        });

        // When Touch Others Place, "Promotion" List Will Close
        $(document).click(el => {
            let touchEl = $(el.target)[0].className;
            if (touchEl.indexOf('bonus-input') === -1 && touchEl.indexOf('bonus-item') === -1) {
                this.isShowBonusList = false;
            }
        });

        // Check Amount Input
        $('.deposit-amount-input').keyup(function() {
            if (parseFloat($(this).val()) > 0) {
                _this.checkAmount();
            } else {
                _this.amountOK = false;
            }
            _this.checkInfo();
        });

        // Check Reference Input
        $('.reference-input').keyup(() => {
            let referenceNum = $('.reference-input').val();
            if (referenceNum.length > 0) {
                this.referenceOK = true;
            } else {
                this.referenceOK = false;
            }
            this.checkInfo();
        });
    },
    methods: {
        // Calculate the number of tpe
        calculateType() {
            let count = 1;
            let haveSame = false;
            for (let i = 1; i < this.bonusList.length; i++) {
                for (let j = 0; j < i; j++) {
                    if (this.bonusList[j].type === this.bonusList[i].type) {
                        haveSame = true;
                    }
                }

                if (!haveSame) {
                    count++;
                }

                haveSame = false;
            }

            this.newBonusList = new Array(count);

            // Set a default value for each item in the "newBonus List" array
            for (let k = 0; k < this.newBonusList.length; k++) {
                this.newBonusList[k] = {
                    type: null,
                    bonus: []
                };
            }

            this.classifyBonus();
        },

        // Classify the bonus and save it to "newBonusList"
        classifyBonus() {
            let noSame = false;

            this.newBonusList[0].type = this.bonusList[0].type;

            for (let i = 0; i < this.newBonusList.length; i++) {
                for (let j = 0; j < this.bonusList.length; j++) {
                    if (this.newBonusList[i].type === null) {
                        noSame = true;
                        for (let k = 0; k < i; k++) {
                            if (this.newBonusList[k].type === this.bonusList[j].type) {
                                noSame = false;
                                break;
                            }
                        }

                        if (noSame) {
                            this.newBonusList[i].type = this.bonusList[j].type;
                        }
                    }
                    if (this.newBonusList[i].type === this.bonusList[j].type) {
                        this.newBonusList[i].bonus.push(this.bonusList[j]);
                    }
                }
            }
        },

        // Get UpLoad File
        getFile(e) {
            if (e.target.files[0]) {
                if (e.target.files[0].size < 2097152) {
                    this.upLoadFile = e.target.files[0];
                    this.upLoadFileOK = true;
                } else {
                    $('#errorMsg .error-msg-container').text(this.$t('deposit.upload_file_error'));
                    $('#errorMsg').modal('show');
                    this.upLoadFile = null;
                    this.upLoadFileOK = false;
                }
            } else {
                this.upLoadFile = null;
                this.upLoadFileOK = false;
            }

            this.checkInfo();
        },

        // Get selected bank
        getBank(accountNumber, name, bankOK) {
            if (bankOK) {
                $('.deposit-bank-name-value').text(name);
                $('.deposit-bank-account-value').text(accountNumber);
                $('.deposit-detail-container').addClass('show');
            } else {
                $('.deposit-detail-container').removeClass('show');
            }
            this.accountNumber = accountNumber;
            this.bankOK = bankOK;
            this.checkInfo();
        },

        // Set deposit amount
        setAmount(amount) {
            if (this.choiceAmount != amount) {
                this.totalAmount = amount;
                this.choiceAmount = amount;
                $('.deposit-amount-input').val(amount);
            } else {
                this.totalAmount = this.totalAmount + amount;
                $('.deposit-amount-input').val(this.totalAmount);
            }
            this.checkAmount();
            this.checkInfo();
        },

        // Check deposit amount
        checkAmount() {
            if (this.totalAmount > 0) {
                if (this.limits) {
                    if (this.totalAmount <= this.limits.maxDeposit) {
                        this.amountOK = true;
                    } else {
                        this.amountOK = false;
                    }

                    if (this.totalAmount >= this.limits.minDeposit) {
                        this.amountOK = true;
                    } else {
                        this.amountOK = false;
                    }
                } else {
                    if (this.totalAmount > 50000) this.amountOK = true;
                    else this.amountOK = false;
                    if (this.totalAmount < 30) this.amountOK = true;
                    else this.amountOK = false;
                }
            } else {
                this.amountOK = false;
            }
        },

        // Get date value
        getDate() {
            this.depositDate = $('.date-container input').val();
        },

        // Get time value
        getTime() {
            this.depositTime = $('#transfer-time').val();
        },

        // Show or close bonus list
        showBonusList() {
            this.isShowBonusList = !this.isShowBonusList;
        },

        // Select bonus
        selectBonus(name, code) {
            if (name !== 'none' && code !== 'none') {
                $('.bonus-input').text(name);
                this.bonusOK = true;
            } else {
                $('.bonus-input').text(this.$t('common.please_select'));
                this.bonusOK = false;
            }

            this.selectedBonus = code;
            this.isShowBonusList = false;
            this.checkInfo();
        },

        // Check information to allow "Deposit" button
        checkInfo() {
            $('.deposit-button').removeClass('allow');
            if (this.bankOK && this.amountOK && this.referenceOK && this.upLoadFileOK && this.bonusOK) {
                $('.deposit-button').addClass('allow');
                $('.deposit-button').attr('disabled', false);
            } else {
                $('.deposit-button').attr('disabled', true);
            }
        },

        // Deposit submit
        deposit() {
            this.getDate();
            this.getTime();
            $('.spinner-wrapper').show();
            this.$store
                .dispatch('wallet/deposit', {
                    accountNumber: this.accountNumber,
                    amount: this.totalAmount,
                    time: this.depositDate + ' ' + this.depositTime,
                    reference: this.referenceNo,
                    receipt: this.upLoadFile,
                    bonus: this.selectedBonus
                })
                .then(() => {
                    $('.spinner-wrapper').hide();
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
                        $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.$t('deposit.success_msg')}</div>`);
                    } else {
                        $('#errorMsg .error-msg-container').html(`<div class="error-msg">${this.responseMsg}</div>`);
                    }

                    $('#errorMsg').modal('show');
                });
        }
    }
};
</script>
<style lang="scss">
    .deposit-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 100px);
        font-family: $font-family;
        font-size: 14px;

        .deposit-container {
            position: absolute;
            z-index: 1;
            top: 161px;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
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
                        padding: 6px;
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
                    top: 38px;
                    left: 0;
                    width: 100%;
                    max-height: 250px;
                    font-size: 15px;
                    border-radius: 5px;
                    border: 1px solid #cecece;
                    background: $color-white;
                    overflow-y: auto;
                    margin-bottom: 100px;

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