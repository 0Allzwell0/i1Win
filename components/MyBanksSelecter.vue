<template>
    <div class="bank-input-wrapper">
        <button class="bank-input" type="button" @click.stop="expandBankList()">{{ $t('common.please_select') }}</button>
        <fa :icon="['fas', 'caret-down']" class="bank-down" />
        <ul class="bank-list" :class="{'show': showBankList}">
            <li class="bank-item" @click.stop="selectBank(null, 'none', 'none')">{{ $t('common.please_select') }}</li>
            <li
                class="bank-item"
                v-for="(item, index) in banksList"
                :key="`bank-${index}`"
                @click.stop="selectBank(item.accountNumber, item.name, item.bank)"
            >
                <img class="bank-img" :src="`/images/bank_${item.bank}.png`" />
            </li>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('wallet', {
            banksList: 'GetBanksList'
        })
    },
    data() {
        return {
            accountNumber: null,
            bankOK: false,
            showBankList: false
        };
    },
    mounted() {
        let _this = this;

        // When Touch Others Place, "Bank" List Will Close
        $(document).click(function() {
            _this.showBankList = false;
        });
    },
    methods: {
        // Expand Or Close Bank List
        expandBankList() {
            this.showBankList = !this.showBankList;
        },

        // Select Deposit Bank
        selectBank(accountNumber, name, bank) {
            if (bank !== 'none') {
                $('.bank-input').html(`<img class="bank-img" src="/images/bank_${bank}.png" />`);
                this.bankOK = true;
            } else {
                $('.bank-input').text(this.$t('common.please_select'));
                this.bankOK = false;
            }

            this.showBankList = false;
            this.$emit('getBank', accountNumber, name, this.bankOK);
        }
    }
};
</script>
<style lang="scss">
.bank-input-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 39px;
    border-radius: 5px;
    border: 1px solid #cecece;
    background: $color-white;
    margin: 7px 0 24px 0;

    .bank-input {
        width: 100%;
        font-size: 14px;
        background: $color-white;
        border-radius: 5px;
        text-align: left;
        padding-left: 10px;

        .bank-img {
            width: 119px;
        }
    }
    .bank-down {
        width: 15px;
        font-size: 20px;
        color: $color-black;
        align-self: center;
        margin-right: 8px;
    }
    .bank-list {
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
        .bank-item {
            width: 100%;
            border-bottom: 1px solid #cecece;
            padding: 10px 0 10px 10px;

            .bank-img {
                width: 119px;
            }
        }
    }
}
</style>