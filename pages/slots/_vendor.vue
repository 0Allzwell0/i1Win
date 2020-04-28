<template>
    <main class="slots-games-wrapper">
        <!-- Carousel -->
        <my-carousel />

        <!-- Announcement -->
        <my-announcement />

        <!-- Game Types Of Tab => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <my-game-tab />

        <!-- Games -->
        <div class="slots-games-container">
            <ul class="slots-games-selector">
                <!-- Game Vendor Selecter -->
                <li class="slots-games-vendor">
                    <button class="slots-games-vendor-btn" @click.stop="showVendorList()"></button>
                    <fa :icon="['fas', 'caret-down']" class="slots-games-down" />
                    <ul class="slots-games-vendor-list">
                        <li class="slots-games-vendor-item" v-for="(vendor, index) in vendorList" :key="`vendor_${index}`">
                            <nuxt-link :to="$i18n.path(`slots/${vendor}`)">
                                <img class="slots-games-vendor-img" :src="`/images/member/wallet/${vendor}.png`" />
                            </nuxt-link>
                        </li>
                    </ul>
                </li>

                <!-- Game Type Selecter -->
                <li class="slots-games-type">
                    <button class="slots-games-type-btn" @click.stop="showTypeList()"></button>
                    <fa :icon="['fas', 'caret-down']" class="slots-games-down" />
                    <ul class="slots-games-type-list">
                        <li
                            class="slots-games-type-item"
                            :id="type.toLowerCase()"
                            v-for="(type, index) in typeList"
                            :key="`type_${index}`"
                            @click="selectType(type)"
                        >{{ $t(`slots.${type.toLowerCase()}`) }}</li>
                    </ul>
                </li>
            </ul>

            <!-- Games List -->
            <my-slots-game-list ref="child" :tab="tab" />
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyCarousel from '~/components/MyCarousel';
import MyAnnouncement from '~/components/MyAnnouncement';
import MyGameTab from '~/components/MyGameTab';
import MySlotsGameList from '~/components/MySlotsGameList';

export default {
    components: {
        MyCarousel,
        MyAnnouncement,
        MyGameTab,
        MySlotsGameList
    },
    data() {
        return {
            vendorList: ['ygg', 'spg', 'jili', 'bng', 'plt', 'gpi', 'cq9', 'jok', 'mg', 'dt', 'ifun', 'ks9', 'bsg', 'sp', 'maja'],
            typeList: ['All', 'Popular', 'New', 'Jackpot', 'Table'],
            productCode: null,
            tab: 'all',
            showVendor: false,
            showType: false
        };
    },
    mounted() {
        let _this = this;
        this.productCode = this.$route.params.vendor;

        // Set Game Tab CSS
        $('.tab-slots').addClass('active');

        // Show Tthe Vendor's Image Of The Selected Game
        $('.slots-games-vendor-btn').html(`<img class="btn-image" src="/images/member/wallet/${this.productCode}.png" />`);

        // Show Default Game Type => "All"
        $('.slots-games-type-btn').text(this.$t('slots.all'));

        // When Touch Others Places, Close "Vendor" List or "Yype" List
        $(document).click(function(e) {
            if (_this.showVendor) {
                _this.showVendor = false;
                $('.slots-games-vendor-list').removeClass('show');
            }

            if (_this.showType) {
                _this.showType = false;
                $('.slots-games-type-list').removeClass('show');
            }
        });
    },
    methods: {
        // Show or Hidden Game Vendor List
        showVendorList() {
            this.showType = false;
            $('.slots-games-type-list').removeClass('show');

            if (!this.showVendor) {
                $('.slots-games-vendor-list').addClass('show');
            } else {
                $('.slots-games-vendor-list').removeClass('show');
            }

            this.showVendor = !this.showVendor;
        },

        // Show or Hidden Game Type List
        showTypeList() {
            this.showVendor = false;
            $('.slots-games-vendor-list').removeClass('show');

            if (!this.showType) {
                $('.slots-games-type-list').addClass('show');
            } else {
                $('.slots-games-type-list').removeClass('show');
            }

            this.showType = !this.showType;
        },

        // Select Game Type
        selectType(type) {
            $('.slots-games-type-btn').text(type);
            this.tab = type.toLowerCase();
            this.$refs.child.loadGames(this.productCode, this.tab);
        }
    }
};
</script>
<style lang="scss">
    .slots-games-wrapper {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-family: $font-family;

        .slots-games-container {
            width: 100%;
            min-height: 62vh;
            background: $background_img;
            background-size: cover;
            padding: 18px 18px 70px 18px;

            .slots-games-selector {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

                .slots-games-vendor {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 160px;
                    min-height: 40px;
                    border-radius: 5px;
                    box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(25, 25, 25, 0.6);
                    background: $color-white;

                    .slots-games-vendor-btn {
                        width: 100%;
                        min-height: 40px;
                        border-radius: 5px;
                        background: transparent;
                        text-align: left;
                        padding: 0 0 0 10px;

                        .btn-image {
                            width: 100%;
                        }
                    }

                    .slots-games-down {
                        font-size: 20px;
                        color: $color-black;
                        margin: 0 10px 0 0;
                    }

                    .slots-games-vendor-list {
                        position: absolute;
                        z-index: -1;
                        top: 41px;
                        left: -1px;
                        width: 101%;
                        height: 0;
                        border-radius: 5px;
                        box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(25, 25, 25, 0.6);
                        background-color: #f8f8f8;
                        overflow-y: scroll;

                        transition: z-index 0.4s, height 0.4s;
                        -webkit-transition: z-index 0.4s, height 0.4s;
                        -moz-transition: z-index 0.4s, height 0.4s;
                        -o-transition: z-index 0.4s, height 0.4s;

                        &.show {
                            z-index: 10;
                            height: 180px;
                        }

                        .slots-games-vendor-item {
                            width: 100%;
                            border-bottom: 1px solid rgba(25, 25, 25, 0.6);

                            .slots-games-vendor-img {
                                width: 90%;
                                padding: 5px 0 5px 10px;
                            }
                        }
                    }
                }

                .slots-games-type {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 110px;
                    min-height: 40px;
                    border-radius: 5px;
                    box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(25, 25, 25, 0.6);
                    background: #f8f8f8;

                    .slots-games-type-btn {
                        width: 100%;
                        min-height: 40px;
                        font-size: 16px;
                        font-weight: bold;
                        border-radius: 5px;
                        background-color: transparent;
                        text-align: left;
                        padding: 0 0 0 10px;
                    }

                    .slots-games-down {
                        font-size: 20px;
                        color: $color-black;
                        margin: 0 10px 0 0;
                    }

                    .slots-games-type-list {
                        position: absolute;
                        top: 41px;
                        left: 0;
                        z-index: -1;
                        width: 101%;
                        height: 0;
                        border-radius: 5px;
                        box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                        border: 1px solid rgba(25, 25, 25, 0.6);
                        background-color: #f8f8f8;
                        overflow-y: scroll;

                        transition: z-index 0.4s, height 0.4s;
                        -webkit-transition: z-index 0.4s, height 0.4s;
                        -moz-transition: z-index 0.4s, height 0.4s;
                        -o-transition: z-index 0.4s, height 0.4s;

                        &.show {
                            z-index: 10;
                            height: 162px;
                        }

                        .slots-games-type-item {
                            width: 100%;
                            color: $color-black;
                            font-weight: bold;
                            font-size: 15px;
                            padding: 7px 0 7px 10px;

                            &.active {
                                width: 100%;
                                color: $color-white;
                                opacity: 0.9;
                                box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                                background: $color-yellow;
                            }
                        }
                    }
                }
            }
        }
    }
</style>