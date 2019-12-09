<template>
    <main class="promotions-wrapper">
        <h2 class="promotions-title">{{ $t('footer.promotions') }}</h2>
        <ul class="promotions-list">
            <li class="promotions-item" v-for="(item, index) in promotionsList" :key="`promotion-${index}`">
                <img class="promotions-img" :src="item.src" />
                <p class="promotions-text">{{ item.title }}</p>
                <div class="promotions-btn-wrapper">
                    <!-- Detail -->
                    <button
                        class="promotions-btn detail-btn"
                        data-toggle="modal"
                        :data-target="`#detail_${index}`"
                        type="button"
                    >{{ $t('promotions.detail') }}</button>

                    <!-- Register => 尚未登入時顯示 -->
                    <nuxt-link
                        class="promotions-btn right-btn"
                        :to="$i18n.path('register')"
                        v-if="!isLogined"
                    >{{ $t('common.register') }}</nuxt-link>
                    <!-- Deposit => 已登入後才顯示 -->
                    <nuxt-link
                        class="promotions-btn right-btn"
                        :to="$i18n.path('member/deposit')"
                        v-if="isLogined"
                    >{{ $t('promotions.deposit') }}</nuxt-link>
                </div>

                <div class="modal fade" :id="`detail_${index}`" tabindex="-1" role="dialog" aria-hidden="true">
                    <my-promotions-detail
                        class="modal-dialog modal-dialog-scrollable"
                        role="document"
                        :htmlContent="item.content"
                    />
                </div>
            </li>
        </ul>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import MyPromotionsDetail from '~/components/MyPromotionsDetail';

export default {
    computed: {
        ...mapGetters('user', {
            promotionsList: 'GetPromotionsList'
        }),
        ...mapGetters('auth', {
            isLogined: 'GetLogined'
        })
    },
    components: {
        MyPromotionsDetail
    },
    mounted() {
        this.$store.dispatch('user/getPromotions');
    }
};
</script>
<style lang="scss" scoped>
.promotions-wrapper {
    display: flex;
    flex-direction: column;
    background: $background_img;
    background-size: cover;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 70px;

    .promotions-title {
        font-family: $font-family;
        font-size: 24px;
        font-weight: bold;
        text-shadow: $text-shadow;
        align-self: center;
        margin: 20px 0;
    }
    .promotions-list {
        height: 100%;
        text-align: center;
        padding: 0 10px;

        .promotions-item {
            display: inline-block;
            width: 95%;
            margin-bottom: 30px;
            background: #eeeeee;
            -webkit-box-shadow: 4px 4px 5px #494949;
            box-shadow: 4px 4px 5px #494949;

            .promotions-img {
                width: 100%;
            }
            .promotions-text {
                font-family: $font-family;
                font-weight: bold;
                font-size: 18px;
                color: $color-white;
                text-align: left;
                margin: -25px 0 18px 13px;
            }
            .promotions-btn-wrapper {
                display: flex;
                justify-content: space-around;
                width: 100%;
                margin: 10px 0;

                .promotions-btn {
                    width: 45%;
                    font-family: $font-family;
                    font-weight: bold;
                    font-size: 16px;
                    border-radius: 5px;
                    padding: 3% 0;

                    &.detail-btn {
                        border: 1px solid #000000;
                        background: transparent;
                        color: #494949;
                    }
                    &.right-btn {
                        width: 45%;
                        color: $color-black;
                        text-align: center;
                        border: $border-style;
                        background: $color-yellow-linear-unpress;
                        border: solid 1px rgba(247, 147, 30, 0.4);

                        &:active {
                            background: $color-yellow-linear;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (min-width: 600px) {
    .promotions-wrapper {
        .promotions-list {
            .promotions-item {
                width: calc((100% - 3%) / 2);

                &:not(:nth-child(2n)) {
                    margin-right: 2%;
                }
            }
        }
    }
}
</style>