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
                <!-- From Date -->
                <my-date-selecter class="from-date" v-on:getFromDate="getFromDate"></my-date-selecter>
                <!-- To Date -->
                <my-date-selecter class="to-date" v-on:getToDate="getToDate"></my-date-selecter>
            </div>

            <!-- Search Button -->
            <button
                class="history-search-button"
                type="submit"
                @click="search()"
                :disabled="requestState"
                :class="{'allow': !requestState}"
            >{{ $t('history.search') }}</button>

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
                    <ul class="history-data-list transaction-list">
                        <li class="history-data-list-item" v-for="(item, index) in transactionData" :key="`transaction-${index}`">
                            <span class="data-list-item item-date">{{ item.date }}</span>
                            <span class="data-list-item item-type">{{ item.type }}</span>
                            <span class="data-list-item item-amount">{{ item.amount }}</span>
                            <span class="data-list-item item-status">{{ item.status }}</span>
                            <span class="data-list-item item-remark">{{ item.remark }}</span>
                        </li>
                    </ul>
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
                    <ul class="history-data-list statement-list">
                        <li class="history-data-list-item" v-for="(item, index) in statementData" :key="`statement-${index}`">
                            <span class="data-list-item item-type">{{ item.type }}</span>
                            <span class="data-list-item item-turnover">{{ item.turnover }}</span>
                            <span class="data-list-item item-winloss">{{ item.winloss }}</span>
                            <span class="data-list-item item-active_bet">{{ item.active_bet }}</span>
                        </li>
                    </ul>
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
                    <ul class="history-data-list transfer-list">
                        <li class="history-data-list-item" v-for="(item, index) in transferData" :key="`transfer-${index}`">
                            <span class="data-list-item item-date">{{ item.date }}</span>
                            <span class="data-list-item item-from">{{ item.from }}</span>
                            <span class="data-list-item item-to">{{ item.to }}</span>
                            <span class="data-list-item item-amount">{{ item.amount }}</span>
                            <span class="data-list-item item-status">{{ item.status }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyMemberTab from '~/components/MyMemberTab';
import MyDateSelecter from '~/components/MyDateSelecter';

export default {
    computed: {
        ...mapGetters('auth', {
            accessToken: 'GetAccessToken'
        }),
        ...mapGetters('history', {
            requestState: 'GetRequestState',
            transactionData: 'GetTransactionData',
            statementData: 'GetStatementData',
            transferData: 'GetTransferData'
        })
    },
    components: {
        MyMemberTab,
        MyDateSelecter
    },
    data() {
        return {
            fromDate: null,
            toDate: null,
            currentTab: 'Transaction'
        };
    },
    mounted() {
        let _this = this;

        this.getHistoryData('Transaction');

        // Judge Selected Tab
        $('.history-tab-container').click(function() {
            let type = $(this).attr('class');
            if (type.indexOf('transaction') !== -1) {
                _this.currentTab = 'Transaction';
                _this.getHistoryData('Transaction');
            } else if (type.indexOf('statement') !== -1) {
                _this.currentTab = 'Statement';
                _this.getHistoryData('Statement');
            } else if (type.indexOf('transfer') !== -1) {
                _this.currentTab = 'Transfer';
                _this.getHistoryData('Transfer');
            }
        });
    },
    methods: {
        // Get History Data
        getHistoryData(type) {
            this.$store.dispatch(`history/get${type}Data`, {
                from: this.fromDate,
                to: this.toDate
            });
        },

        // Get Current From Date Value
        getFromDate(date) {
            this.fromDate = date;
        },

        // Get Current To Date
        getToDate(date) {
            this.toDate = date;
        },

        // Search Submit
        search() {
            this.fromDate = $('.from-date .date-container input').val();
            this.toDate = $('.to-date .date-container input').val();
            this.getHistoryData(this.currentTab);
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
        }
        .history-search-button {
            width: 85%;
            font-size: 19px;
            font-weight: bold;
            border-radius: 5px;
            border: $border-style;
            align-self: center;
            background: $color-yellow-linear-unpress;
            opacity: 0.7;
            padding: 3.5% 0 3.5% 0;

            &:active {
                background: $color-yellow-linear;
            }
            &.allow {
                opacity: 1;
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