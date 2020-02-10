<template>
    <ul class="member-tab-wrapper">
        <li class="member-tab-container">
            <nuxt-link
                class="member-tab"
                :to="$i18n.path('member/deposit')"
                :class="{'active': $route.name.indexOf('deposit') !== -1}"
            >
                <img class="member-tab-image" src="/images/deposit.png" />
                <span class="member-tab-text">{{ $t('wallet.deposit') }}</span>
            </nuxt-link>
        </li>
        <li class="member-tab-container">
            <nuxt-link
                class="member-tab"
                :to="$i18n.path('member/withdrawal')"
                :class="{'active': $route.name.indexOf('withdrawal') !== -1}"
            >
                <img class="member-tab-image" src="/images/withdraw.png" />
                <span class="member-tab-text">{{ $t('wallet.withdrawal') }}</span>
            </nuxt-link>
        </li>
        <li class="member-tab-container">
            <nuxt-link
                class="member-tab"
                :to="$i18n.path('member/transfer')"
                :class="{'active': $route.name.indexOf('transfer') !== -1}"
            >
                <img class="member-tab-image" src="/images/transfer.png" />
                <span class="member-tab-text">{{ $t('wallet.transfer') }}</span>
            </nuxt-link>
        </li>
        <li class="member-tab-container">
            <nuxt-link
                class="member-tab"
                :to="$i18n.path('member/history')"
                :class="{'active': $route.name.indexOf('history') !== -1}"
            >
                <img class="member-tab-image" src="/images/history.png" />
                <span class="member-tab-text">{{ $t('wallet.history') }}</span>
            </nuxt-link>
        </li>
    </ul>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
    .member-tab-wrapper {
        display: flex;
        flex-direction: row;
        font-family: $font-family;
        font-size: 14px;
        width: 100%;

        .member-tab-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            border-bottom: 2px solid $color-black-gray;
            border-right: 1px solid $color-black-gray;

            &:last-child {
                border-right: none;
            }

            .member-tab {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: $color-white;
                opacity: 0.4;

                &.active {
                    opacity: 1;
                    background: $color-yellow;
                }

                .member-tab-image {
                    align-self: center;
                    width: 35px;
                    padding-top: 9px;
                }

                .member-tab-text {
                    font-weight: bold;
                    color: $color-black;
                    text-align: center;
                    align-self: center;
                    padding: 4px 0;
                }
            }
        }
    }
</style>