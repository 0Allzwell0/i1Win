<template>
    <main class="slots-games-wrapper">
        <!-- Carousel -->
        <the-carousel></the-carousel>

        <!-- Announcement -->
        <the-announcement></the-announcement>

        <!-- Game types Navigation Bar => "Live Casino"、"Sports"、"Slots"、"Lottery"、"Finishing" -->
        <the-game-nav-bar></the-game-nav-bar>

        <!-- Games -->
        <div class="slots-games-container">
            <ul>
                <!-- Game Vendor Selecter -->
                <li class="vendor-selector-wrapper">
                    <button type="button" @click.stop="showVendorList()"></button>
                    <fa :icon="['fas', 'caret-down']" class="icon-down" />
                    <ul>
                        <li v-for="(vendor, index) in vendorList" :key="`vendor_${index}`">
                            <nuxt-link :to="$i18n.path(`slots/${vendor}`)">
                                <img :src="`/images/member/wallet/${vendor}.png`" />
                            </nuxt-link>
                        </li>
                    </ul>
                </li>

                <!-- Game Type Selecter -->
                <li class="type-selector-wrapper">
                    <button type="button" @click.stop="showTypeList()"></button>
                    <fa :icon="['fas', 'caret-down']" class="icon-down" />
                    <ul>
                        <li
                            v-for="(type, index) in typeList"
                            :key="`type_${index}`"
                            @click="selectType(type)"
                        >{{ $t(`slots.${type.toLowerCase()}`) }}</li>
                    </ul>
                </li>
            </ul>

            <!-- Games List -->
            <the-slots-game-list ref="child" :tab="selectedType"></the-slots-game-list>
        </div>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';

import TheCarousel from '@/components/common/TheCarousel';
import TheAnnouncement from '@/components/common/TheAnnouncement';
import TheGameNavBar from '@/components/common/TheGameNavBar';
import TheSlotsGameList from '@/components/common/TheSlotsGameList';

export default {
    components: {
        TheCarousel,
        TheAnnouncement,
        TheGameNavBar,
        TheSlotsGameList
    },
    data() {
        return {
            vendorList: ['ygg', 'spg', 'jili', 'bng', 'plt', 'gpi', 'cq9', 'jok', 'mg', 'dt', 'ifun', 'ks9', 'sp', 'maja', 'pplay'],
            typeList: ['All', 'Popular', 'New', 'Jackpot', 'Table'],
            productCode: null,
            selectedType: 'all',
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
        $('.vendor-selector-wrapper > button').html(`<img src="/images/member/wallet/${this.productCode}.png" alt />`);

        // Show Default Game Type => "All"
        $('.type-selector-wrapper > button').text(this.$t('slots.all'));

        // When Touch Others Places, Close "Vendor" List or "Yype" List
        $(document).click(function(e) {
            if (_this.showVendor) {
                _this.showVendor = false;
                $('.vendor-selector-wrapper > ul').removeClass('show');
            }

            if (_this.showType) {
                _this.showType = false;
                $('.type-selector-wrapper > ul').removeClass('show');
            }
        });
    },
    methods: {
        // Show or Hidden Game Vendor List
        showVendorList() {
            this.showType = false;
            $('.type-selector-wrapper > ul').removeClass('show');

            if (!this.showVendor) {
                $('.vendor-selector-wrapper > ul').addClass('show');
            } else {
                $('.vendor-selector-wrapper > ul').removeClass('show');
            }

            this.showVendor = !this.showVendor;
        },

        // Show or Hidden Game Type List
        showTypeList() {
            this.showVendor = false;
            $('.vendor-selector-wrapper > ul').removeClass('show');

            if (!this.showType) {
                $('.type-selector-wrapper > ul').addClass('show');
            } else {
                $('.type-selector-wrapper > ul').removeClass('show');
            }

            this.showType = !this.showType;
        },

        // Select Game Type
        selectType(type) {
            $('.type-selector-wrapper > button').text(type);
            this.selectedType = type.toLowerCase();
            this.$refs.child.loadGames(this.productCode, this.selectedType);
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

            > ul {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

                > li {
                    .icon-down {
                        font-size: 20px;
                        color: $color-black;
                        margin: 0 10px 0 0;
                    }
                }

                .vendor-selector-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 160px;
                    min-height: 40px;
                    border-radius: 5px;
                    box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(25, 25, 25, 0.6);
                    background: $color-white;

                    > button {
                        width: 100%;
                        min-height: 40px;
                        border-radius: 5px;
                        background: transparent;
                        text-align: left;
                        padding: 0 0 0 10px;

                        > img {
                            width: 100%;
                        }
                    }

                    > ul {
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

                        > li {
                            width: 100%;
                            border-bottom: 1px solid rgba(25, 25, 25, 0.6);

                            > a {
                                > img {
                                    width: 90%;
                                    padding: 5px 0 5px 10px;
                                }
                            }
                        }
                    }
                }

                .type-selector-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 110px;
                    min-height: 40px;
                    border-radius: 5px;
                    box-shadow: inset -5px 5px 8px 0 rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(25, 25, 25, 0.6);
                    background: #f8f8f8;

                    > button {
                        width: 100%;
                        min-height: 40px;
                        font-size: 16px;
                        font-weight: bold;
                        border-radius: 5px;
                        background-color: transparent;
                        text-align: left;
                        padding: 0 0 0 10px;
                    }

                    > ul {
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

                        > li {
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