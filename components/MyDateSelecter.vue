<template>
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
</template>
<script>
import { en, th } from 'vuejs-datepicker/dist/locale';

export default {
    data() {
        return {
            format: 'yyyy-MM-dd',
            language: this.$i18n.locale === 'th-TH' ? th : en,
            currentDate: null
        };
    },
    mounted() {
        this.getCurrentDate();
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
            this.$emit('getDate', this.currentDate);
        }
    }
};
</script>
<style lang="scss">
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
</style>