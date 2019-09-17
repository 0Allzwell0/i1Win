<template>
    <div>
        <div class="slots-game-list-wrapper">
            <ul class="slots-game-list-container"></ul>
            <div class="slots-game-page-selector">
                <button class="slots-game-btn prev-btn" type="button" data-page="prev">{{ $t('slots.previous') }}</button>
                <ul class="slots-game-num-btns-wrapper"></ul>
                <button class="slots-game-btn next-btn" type="button" data-page="next">{{ $t('slots.next') }}</button>
            </div>
        </div>

        <!-- Free Play Modal -->
        <my-free-play-modal :showButton="showFreePlayBTN" :nowPosition="nowPosition" />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import MyFreePlayModal from './MyFreePlayModal';

export default {
    computed: {
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        })
    },
    components: {
        MyFreePlayModal
    },
    data() {
        return {
            allDataSize: new Array(100),
            pageSize: 24,
            lastPageSize: null,
            totalPages: null,
            currentPage: 1,
            nowPosition: null,
            showFreePlayModal: false,
            showFreePlayBTN: true
        };
    },
    mounted() {
        let _this = this;

        this.loadGames();

        // Selected Page or Go Prev of Go Next
        $('.slots-game-page-selector').click(function(el) {
            if (_this.allDataSize) {
                // 點擊到的頁碼
                el.preventDefault();
                let className = el.target.nodeName;
                let choosePage = el.target.dataset.page;

                if (className === 'LI') {
                    _this.currentPage = Number(choosePage);
                } else if (className === 'BUTTON') {
                    if (choosePage === 'prev' && _this.currentPage !== 1) {
                        _this.currentPage = _this.currentPage - 1;
                    } else if (choosePage === 'next' && _this.currentPage !== _this.totalPages) {
                        _this.currentPage = _this.currentPage + 1;
                    }
                }

                $('.slots-game-list-container').empty();
                $('.slots-game-num-btns-wrapper').empty();

                _this.setSelector();
                _this.renderGames();
            }
        });
    },
    methods: {
        // Initial Data
        initialData() {
            this.allDataSize = new Array(100);
            this.pageSize = 24;
            this.lastPageSize = null;
            this.totalPages = null;
            this.currentPage = 1;

            $('.slots-game-list-container').empty();
            $('.slots-game-num-btns-wrapper').empty();

            $('.slots-game-prev-btn').attr('disabled');
            $('.slots-game-prev-btn').css('opacity', '0.4');
            $('.slots-game-next-btn').attr('disabled');
            $('.slots-game-next-btn').css('opacity', '0.4');
        },

        // Load Games
        loadGames() {
            this.initialData();

            for (let i = 0; i < this.allDataSize.length; i++) {
                this.allDataSize[i] = {
                    id: 205,
                    name: 'Zhao Cai Tong Zi',
                    code: 'zhao-cai-tong-zi',
                    provider: 'playtech',
                    image: 'http://v2.96star.com/img/slots/playtech/zhao-cai-tong-zi.png'
                };
            }
            this.lastPageSize = this.allDataSize.length % this.pageSize;

            this.setSelector();
            this.renderGames();
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
                    $('.slots-game-num-btns-wrapper').append(
                        '<li class="slots-game-num-btns active" data-page="' + i + '">' + i + '</li>'
                    );
                } else {
                    $('.slots-game-num-btns-wrapper').append('<li class="slots-game-num-btns" data-page="' + i + '">' + i + '</li>');
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
                $('.prev-btn').attr('disabled', 'disabled');
                $('.prev-btn').css('opacity', '0.4');
                $('.next-btn').attr('disabled', 'disabled');
                $('.next-btn').css('opacity', '0.4');
            } else {
                $('.prev-btn').removeAttr('disabled');
                $('.prev-btn').css('opacity', '1');
                $('.next-btn').removeAttr('disabled');
                $('.next-btn').css('opacity', '1');
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
                    `<li class="slots-game-list-item">
                        <img class="slots-game-list-item-img" id="${this.allDataSize[i].id}" src="${this.allDataSize[i].image}" alt="${
                        this.allDataSize[i].name
                    }" />
                    </li>`
                );
            }

            this.setClick();
        },

        // Set Games Element To Be Able To Click
        setClick() {
            let _this = this;
            $('.slots-game-list-item').click(function(el) {
                let gameID = $(this)
                    .children()
                    .attr('id');
                let gameName = $(this)
                    .children()
                    .attr('alt');
                let gameImage = $(this)
                    .children()
                    .attr('src');

                if (_this.isLogined) {
                    if (false) {
                        return alert('The game is unavailable.');
                    }

                    _this.checkBalance(gameID);
                } else {
                    _this.showModal(gameID, gameName, gameImage);
                }
            });
        },

        // Check Balance
        checkBalance(code) {
            window.open('');
        },

        // Show Modal
        showModal(id, name, imgURL) {
            // Record Position
            this.nowPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let vendorCode = this.$route.params.vendor;

            // If Is "Playtech" Or "Joker" Dont Show "Free Play" Button
            if (vendorCode === 'plt' || vendorCode === 'jok') {
                this.showFreePlayBTN = false;
            } else {
                this.showFreePlayBTN = true;
            }

            $('html, body').addClass('freezePage');
            $('#freeModal').css('display', 'block');
            setTimeout(() => {
                $('.free-modal-container').addClass('show');
            }, 100);

            // Set Game Image & Name On Modal
            $('.free-game-img').attr('src', imgURL);
            $('.free-game-name').text(name);
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

        .slots-game-list-item {
            display: inline-block;
            width: calc((100% - 13.2%) / 3);
            margin-top: 5%;
            background: $color-black;
            border-radius: 5px;
            text-align: center;

            &:not(:nth-child(3n)) {
                margin-right: 6.6%;
            }
            .slots-game-list-item-img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
            }
        }
    }
    .slots-game-page-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;

        .slots-game-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 75px;
            height: 100%;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid $color-black;
            background: transparent;
            opacity: 0.4;
        }
        .slots-game-num-btns-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: 0 10px;

            .slots-game-num-btns {
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