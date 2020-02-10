<template>
    <main class="promotions-wrapper">
        <h2 class="promotions-title">{{ $t('footer.promotions') }}</h2>
        <ul class="promotions-list">
            <li class="promotions-item" v-for="(item, index) in promotionsList" :key="`promotion-${index}`">
                <img class="promotions-img" :src="item.image_mobile" />
                <p class="promotions-text">{{ item.name }}</p>
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

                <!-- Detail Modal -->
                <div class="modal fade" :id="`detail_${index}`" tabindex="-1" role="dialog" aria-hidden="true">
                    <my-promotions-detail class="modal-dialog" role="document" :htmlContent="item.body" />
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
            margin: 5% 0 0 0;
        }

        .promotions-list {
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            padding: 3% 3% 0 3%;
            margin: 5% 3% 0 3%;

            .promotions-item {
                display: inline-block;
                width: 100%;
                margin: 0 0 8% 0;
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
                    margin: 5% 0 0 4%;
                }

                .promotions-btn-wrapper {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    margin: 8% 0 3% 0;

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