<template>
    <div>
        <div class="slots-game-list-wrapper">
            <ul class="slots-game-list-container"></ul>
            <div class="page-selector">
                <button class="prev-btn" type="button" data-page="prev">{{ $t('slots.previous') }}</button>
                <ul class="num-btn-wrapper"></ul>
                <button class="next-btn" type="button" data-page="next">{{ $t('slots.next') }}</button>
            </div>
        </div>

        <!-- Free Play Modal -->
        <modal-game-play :show-button="showFreePlayBTN" :now-position="nowPosition" :game-img="gameImg" :game-name="gameName"></modal-game-play>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import ModalGamePlay from '@/components/modal/ModalGamePlay';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        }),
        ...mapGetters('game', {
            gamesList: 'GetGamesList',
            gameURL: 'GetGameURL'
        })
    },
    components: {
        ModalGamePlay
    },
    props: { tab: { type: String } },
    data() {
        return {
            productCode: null,
            allDataSize: null,
            pageSize: 24,
            lastPageSize: null,
            totalPages: null,
            currentPage: 1,
            nowPosition: null,
            gameImg: null,
            gameName: null,
            showFreePlayModal: false,
            showFreePlayBTN: true
        };
    },
    mounted() {
        this.productCode = this.$route.params.vendor;

        setTimeout(() => {
            this.loadGames(this.productCode, this.tab);
        }, 100);

        // Selected Page or Go Prev of Go Next
        $('.page-selector').click(el => {
            if (this.allDataSize) {
                // 點擊到的頁碼
                el.preventDefault();
                let className = el.target.nodeName;
                let choosePage = el.target.dataset.page;

                if (className === 'LI') {
                    this.currentPage = Number(choosePage);
                } else if (className === 'BUTTON') {
                    if (choosePage === 'prev' && this.currentPage !== 1) {
                        this.currentPage = this.currentPage - 1;
                    } else if (choosePage === 'next' && this.currentPage !== this.totalPages) {
                        this.currentPage = this.currentPage + 1;
                    }
                }

                $('.slots-game-list-container').empty();
                $('.num-btn-wrapper').empty();

                this.setSelector();
                this.renderGames();
            }
        });
    },
    methods: {
        // Initial Data
        initialData() {
            this.allDataSize = null;
            this.pageSize = 24;
            this.lastPageSize = null;
            this.totalPages = null;
            this.currentPage = 1;

            $('.slots-game-list-container').empty();
            $('.num-btn-wrapper').empty();

            $('.page-selector > button').attr('disabled');
            $('.page-selector > button').css('opacity', '0.4');
        },

        // Load Games
        loadGames(productCode, tab) {
            this.initialData();

            this.$store
                .dispatch(this.isLogined ? 'game/getGamesAfter' : 'game/getGamesBefore', { productCode: 'playtech', tab })
                .then(() => {
                    this.allDataSize = this.gamesList;
                    this.lastPageSize = this.allDataSize.length % this.pageSize;

                    this.setSelector();
                    this.renderGames();
                });
        },

        setSelector() {
            let startPageNumber = null;
            let endPageNumber = null;

            this.totalPages = Math.ceil(this.allDataSize.length / this.pageSize);

            // 總頁數小於4
            if (this.totalPages > 0 && this.totalPages <= 4) {
                startPageNumber = 1;
                endPageNumber = this.totalPages;
                this.renderSelector(startPageNumber, endPageNumber);
            } else if (this.totalPages > 4) {
                // 總頁數大於4頁，只印出4個頁碼
                if (this.currentPage >= 1 && this.currentPage <= 2) {
                    // 目前點擊的頁碼 <= 2
                    startPageNumber = 1;
                    endPageNumber = 4;
                    this.renderSelector(startPageNumber, endPageNumber);
                } else if (this.currentPage >= this.totalPages - 1 && this.currentPage <= this.totalPages) {
                    // 目前點擊的頁碼是倒數 2 頁
                    startPageNumber = this.totalPages - 3;
                    endPageNumber = this.totalPages;
                    this.renderSelector(startPageNumber, endPageNumber);
                } else {
                    startPageNumber = this.currentPage - 2;
                    endPageNumber = this.currentPage + 1;
                    this.renderSelector(startPageNumber, endPageNumber);
                }
            }
        },

        // Render Selector
        renderSelector(startPage, endPage) {
            for (let i = startPage; i <= endPage; i++) {
                if (i === this.currentPage) {
                    $('.num-btn-wrapper').append('<li class="active" data-page="' + i + '">' + i + '</li>');
                } else {
                    $('.num-btn-wrapper').append('<li data-page="' + i + '">' + i + '</li>');
                }
            }

            if (this.currentPage === this.totalPages && this.totalPages > 1) {
                $('.prev-btn').removeAttr('disabled');
                $('.prev-btn').css('opacity', '1');
                $('.next-btn').attr('disabled', 'disabled');
                $('.next-btn').css('opacity', '0.4');
            } else if (this.currentPage === 1 && this.totalPages > 1) {
                $('.prev-btn').attr('disabled', 'disabled');
                $('.prev-btn').css('opacity', '0.4');
                $('.next-btn').removeAttr('disabled');
                $('.next-btn').css('opacity', '1');
            } else if (this.currentPage === 1 && this.totalPages <= 1) {
                $('.prev-btn, .next-btn').attr('disabled', 'disabled');
                $('.prev-btn, .next-btn').css('opacity', '0.4');
            } else {
                $('.prev-btn, .next-btn').removeAttr('disabled');
                $('.prev-btn, .next-btn').css('opacity', '1');
            }
        },

        // Render Games
        renderGames() {
            let startIndex = null;
            let endIndex = null;

            startIndex = (this.currentPage - 1) * this.pageSize;
            if (this.currentPage === this.totalPages && this.lastPageSize !== 0) {
                endIndex = startIndex + this.lastPageSize;
            } else {
                endIndex = this.currentPage * this.pageSize;
            }

            for (let i = startIndex; i < endIndex; i++) {
                $('.slots-game-list-container').append(
                    `<li>
                        <img data-id="${this.allDataSize[i].id}" src="${this.allDataSize[i].image}" alt="${this.allDataSize[i].name}" />
                    </li>`
                );
            }

            this.setClick();
        },

        // Set Games Element To Be Able To Click
        setClick() {
            let _this = this;
            $('.slots-game-list-container > li').click(function(el) {
                let gameID = $(this)
                    .children()
                    .data('id');
                let gameName = $(this)
                    .children()
                    .attr('alt');
                let gameImg = $(this)
                    .children()
                    .attr('src');

                if (_this.isLogined) {
                    if (false) {
                        return alert('The game is unavailable.');
                    }

                    _this.$store
                        .dispatch('game/getGameURL', {
                            isDownload: false,
                            category: 'Slots',
                            productCode: _this.productCode,
                            gameID: gameID
                        })
                        .then(() => {
                            window.open(this.gameURL);
                        });

                    // _this.checkBalance(gameID);
                } else {
                    _this.showModal(gameName, gameImg);
                }
            });
        },

        // Check Balance
        checkBalance(code) {},

        // Show Modal
        showModal(gameName, gameImg) {
            // Record Position
            this.nowPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let vendorCode = this.$route.params.vendor;

            // If Is "Playtech" Or "Joker" Dont Show "Free Play" Button
            if (vendorCode === 'plt' || vendorCode === 'jok') {
                this.showFreePlayBTN = false;
            } else {
                this.showFreePlayBTN = true;
            }

            // Set Game Image & Name On Modal
            this.gameImg = gameImg;
            this.gameName = gameName;

            $('html, body').addClass('freezePage');
            $('#freeModal').css('display', 'block');
            setTimeout(() => {
                $('.game-modal-container').addClass('show');
            }, 100);
        }
    }
};
</script>
<style lang="scss">
    .slots-game-list-wrapper {
        width: 100%;
        height: 100%;

        .slots-game-list-container {
            width: 100%;
            padding: 0 0 35px 0;

            > li {
                display: inline-block;
                width: calc((100% - 13.2%) / 3);
                height: calc((100% - 13.2%) / 3);
                margin-top: 5%;
                background: $color-black;
                border-radius: 5px;
                text-align: center;

                &:not(:nth-child(3n)) {
                    margin-right: 6.6%;
                }

                > img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }
        }

        .page-selector {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px;

            > button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 75px;
                height: 100%;
                font-size: 14px;
                color: $color-black;
                border-radius: 5px;
                border: 1px solid $color-black;
                background: transparent;
                opacity: 0.4;
            }

            .num-btn-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                margin: 0 10px;

                > li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 100%;
                    color: $color-black;
                    border: 1px solid $color-black;
                    border-radius: 50%;
                    background: transparent;
                    margin-right: 10px;

                    &:last-child {
                        margin-right: 0;
                    }

                    &.active {
                        border: 0;
                        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.2);
                        background: $color-yellow-linear;
                    }
                }
            }
        }
    }
</style>