<template>
    <main class="history-wrapper">
        <!-- Tab -->
        <my-member-tab />

        <!-- Primary Content -->
        <div class="history-container">
            <!-- History Tab -->
            <ul class="history-tab-wrapper list-group">
                <li class="history-tab-container transaction-tab">
                    <a class="history-tab active" data-toggle="list" href="#historyTransaction">{{ $t('history.transaction') }}</a>
                </li>
                <li class="history-tab-container statement-tab">
                    <a class="history-tab" data-toggle="list" href="#historyStatement">{{ $t('history.statement') }}</a>
                </li>
                <li class="history-tab-container transfer-tab">
                    <a class="history-tab" data-toggle="list" href="#historyTransfer">{{ $t('history.transfer') }}</a>
                </li>
            </ul>

            <!-- Date -->
            <div class="history-date-wrapper">
                <!-- Date From -->
                <div class="history-date-container">
                    <client-only>
                        <date-picker class="history-date-input" :format="format" :language="language" :value="currentDate" />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="history-down" />
                </div>
                <!-- Date To -->
                <div class="history-date-container">
                    <client-only>
                        <date-picker
                            class="history-date-input to-date"
                            :format="format"
                            :language="language"
                            :value="currentDate"
                        />
                    </client-only>
                    <fa :icon="['fas', 'caret-down']" class="history-down" />
                </div>
            </div>

            <!-- Search Button -->
            <button class="history-search-button" type="submit">{{ $t('history.search') }}</button>

            <!-- Secondary Content -->
            <div class="history-data-wrapper">
                <!-- Transaction -->
                <div class="history-data-container tab-pane fade show active" id="historyTransaction">
                    <!-- Transaction Title Bar -->
                    <ul class="history-data-title-bar-wrapper transaction-bar">
                        <li class="history-data-title title-date">{{ $t('history.date') }}</li>
                        <li class="history-data-title title-type">{{ $t('history.type') }}</li>
                        <li class="history-data-title title-amount">{{ $t('wallet.amount') }}</li>
                        <li class="history-data-title title-status">{{ $t('history.status') }}</li>
                        <li class="history-data-title title-remark">{{ $t('history.remark') }}</li>
                    </ul>

                    <!-- Transaction Data List -->
                    <ul class="history-data-list transaction-list"></ul>
                </div>

                <!-- Statement -->
                <div class="history-data-container tab-pane fade" id="historyStatement">
                    <!-- Statement Title Bar -->
                    <ul class="history-data-title-bar-wrapper statement-bar">
                        <li class="history-data-title title-type">{{ $t('history.type') }}</li>
                        <li class="history-data-title title-turnover">{{ $t('history.turnover') }}</li>
                        <li class="history-data-title title-winloss">{{ $t('history.winloss') }}</li>
                        <li class="history-data-title title-active_bet">{{ $t('history.active_bet') }}</li>
                    </ul>

                    <!-- Statement Data List -->
                    <ul class="history-data-list statement-list"></ul>
                </div>

                <!-- Transfer -->
                <div class="history-data-container tab-pane fade" id="historyTransfer">
                    <!-- Transfer Title Bar -->
                    <ul class="history-data-title-bar-wrapper transfer-bar">
                        <li class="history-data-title title-date">{{ $t('history.date') }}</li>
                        <li class="history-data-title title-from">{{ $t('history.from') }}</li>
                        <li class="history-data-title title-to">{{ $t('history.to') }}</li>
                        <li class="history-data-title title-amount">{{ $t('wallet.amount') }}</li>
                        <li class="history-data-title title-status">{{ $t('history.status') }}</li>
                    </ul>

                    <!-- Transfer Data List -->
                    <ul class="history-data-list transfer-list"></ul>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';

export default {
    computed: {
        ...mapGetters('history', {
            transactionData: 'GetTransactionData',
            statementData: 'GetStatementData',
            transferData: 'GetTransferData'
        })
    },
    components: {
        MyMemberTab
    },
    data() {
        return {
            format: 'yyyy-MM-dd',
            language: this.$i18n.locale === 'th-TH' ? th : en,
            currentDate: null
        };
    },
    mounted() {
        this.getCurrentDate();
        this.getTransactionData();
        this.getStatementData();
        this.getTransferData();
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

        // Get Transaction Data
        getTransactionData() {
            $('.transaction-list').empty();
            for (let i = 0; i < this.transactionData.length; i++) {
                $('.transaction-list').append(
                    `<li class="history-data-list-item transaction-item">
                        <span class="data-list-item item-date">${this.transactionData[i].date}</span>
                        <span class="data-list-item item-type">${this.transactionData[i].type}</span>
                        <span class="data-list-item item-amount">${this.transactionData[i].amount}</span>
                        <span class="data-list-item item-status">${this.transactionData[i].status}</span>
                        <span class="data-list-item item-remark">${this.transactionData[i].remark}</span>
                    </li>`
                );
            }
        },

        // Get Statement Data
        getStatementData() {
            $('.statement-list').empty();
            for (let i = 0; i < this.statementData.length; i++) {
                $('.statement-list').append(
                    `<li class="history-data-list-item transaction-item">
                        <span class="data-list-item item-type">${this.statementData[i].type}</span>
                        <span class="data-list-item item-turnover">${this.statementData[i].turnover}</span>
                        <span class="data-list-item item-winloss">${this.statementData[i].winloss}</span>
                        <span class="data-list-item item-active_bet">${this.statementData[i].active_bet}</span>
                    </li>`
                );
            }
        },

        // Get Transfer Data
        getTransferData() {
            $('.transfer-list').empty();
            for (let i = 0; i < this.transferData.length; i++) {
                $('.transfer-list').append(
                    `<li class="history-data-list-item transfer-item">
                        <span class="data-list-item item-date">${this.transferData[i].date}</span>
                        <span class="data-list-item item-from">${this.transferData[i].from}</span>
                        <span class="data-list-item item-to">${this.transferData[i].to}</span>
                        <span class="data-list-item item-amount">${this.transferData[i].amount}</span>
                        <span class="data-list-item item-status">${this.transferData[i].status}</span>
                    </li>`
                );
            }
        }
    }
};
</script>
<style lang="scss">
.history-wrapper {
    width: 100%;
    height: 100%;

    .history-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: calc(100vh - 177px);
        background: url('/images/background_img.jpg');
        background-size: cover;
        font-family: $font-family;
        font-size: 12px;
        padding-bottom: 90px;

        .history-tab-wrapper {
            display: flex;
            flex-direction: row;
            margin: 30px 15px 10px 15px;

            .history-tab-container {
                display: flex;
                width: 100%;
                border-top: $border-style;
                border-left: $border-style;
                border-bottom: $border-style;

                &:first-child {
                    border-radius: 20px 0 0 20px;

                    .history-tab {
                        border-radius: 20px 0 0 20px;
                    }
                }
                &:last-child {
                    border-radius: 0 20px 20px 0;
                    border-right: $border-style;

                    .history-tab {
                        border-radius: 0 20px 20px 0;
                    }
                }
                .history-tab {
                    width: 100%;
                    color: $color-black;
                    font-weight: bold;
                    font-size: 14px;
                    text-align: center;
                    opacity: 0.6;
                    padding: 5% 0 5% 0;

                    &.active {
                        opacity: 1;
                        background: $color-yellow;
                    }
                }
            }
        }
        .history-date-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 4% 8% 6% 8%;

            .history-date-container {
                position: relative;
                width: 47%;

                .history-date-input {
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
                    &.to-date .vdp-datepicker__calendar {
                        right: 0;
                    }
                    .vdp-datepicker__calendar {
                        width: 250px;
                    }
                }
                .history-down {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 20px;
                }
            }
        }
        .history-search-button {
            width: 85%;
            font-size: 19px;
            font-weight: bold;
            border-radius: 5px;
            border: $border-style;
            background: $color-yellow-linear-unpress;
            padding: 3.5% 0 3.5% 0;
            align-self: center;

            &:active {
                background: $color-yellow-linear;
            }
        }
        .history-data-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 6% 0 0 0;

            .history-data-container {
                display: flex;
                flex-direction: column;

                &.tab-pane {
                    display: none;
                }
                &.active {
                    display: flex;
                }
                .history-data-title-bar-wrapper {
                    display: flex;
                    width: 100%;
                    font-size: 14px;
                    font-weight: bold;
                    color: $color-white;
                    background: $color-black;
                    padding: 3% 1% 3% 1%;
                    text-align: center;

                    .history-data-title {
                        flex: 1;
                    }
                    &.transaction-bar {
                        .title-date {
                            flex: 1;
                        }
                        .title-type {
                            flex: 1;
                        }
                        .title-amount {
                            flex: 0.7;
                        }
                        .title-status {
                            flex: 1;
                        }
                        .title-remark {
                            flex: 1;
                        }
                    }
                    &.transfer-bar {
                        .title-date {
                            flex: 1.05;
                        }
                        .title-from {
                            flex: 1.1;
                        }
                        .title-to {
                            flex: 1;
                        }
                        .title-amount {
                            flex: 0.85;
                        }
                        .title-status {
                            flex: 1;
                        }
                    }
                }
                .history-data-list {
                    width: 100%;
                    height: 300px;
                    overflow-y: auto;

                    .history-data-list-item {
                        display: flex;
                        width: 100%;
                        font-weight: bold;
                        text-align: center;
                        align-items: center;
                        padding: 3% 1% 3% 1%;

                        &:not(:nth-child(2n)) {
                            background: rgba(105, 105, 105, 0.5);
                        }
                        .data-list-item {
                            flex: 1;

                            &.item-date {
                                flex: 1;
                            }
                            &.item-type {
                                flex: 1;
                            }
                            &.item-amount {
                                flex: 0.7;
                            }
                            &.item-status {
                                flex: 1;
                            }
                            &.item-remark {
                                flex: 1;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>