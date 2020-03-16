<template>
    <ul class="tabs-wrapper">
        <!-- Live Casino -->
        <li class="tab-container tab-livecasino" :class="{'active': $route.name.indexOf('livecasino') !== -1}">
            <nuxt-link class="tab-item" :to="$i18n.path('livecasino')">
                <img
                    class="tab-image"
                    :src="$route.name.indexOf('livecasino') === -1 ? '/images/nav/livecasino.png' : '/images/nav/livecasino_active.png'"
                />
                <span class="tab-text">{{ $t('home.tab.livecasino') }}</span>
            </nuxt-link>
        </li>
        <!-- Sports -->
        <li class="tab-container tab-sports" :class="{'active': $route.name.indexOf('sports') !== -1}">
            <nuxt-link class="tab-item" :to="$i18n.path('sports')">
                <img
                    class="tab-image"
                    :src="$route.name.indexOf('sports') === -1 ? '/images/nav/sports.png' : '/images/nav/sports_active.png'"
                />
                <span class="tab-text">{{ $t('home.tab.sports') }}</span>
            </nuxt-link>
        </li>
        <!-- Slots -->
        <li class="tab-container tab-slots" :class="{'active': $route.name.indexOf('slots') !== -1}">
            <nuxt-link class="tab-item" :to="$i18n.path('slots')">
                <img
                    class="tab-image"
                    :src="$route.name.indexOf('slots') === -1 ? '/images/nav/slots.png' : '/images/nav/slots_active.png'"
                />
                <span class="tab-text">{{ $t('home.tab.slots') }}</span>
            </nuxt-link>
        </li>
        <!-- Lottery -->
        <li class="tab-container tab-lottery" :class="{'active': $route.name.indexOf('lottery') !== -1}">
            <nuxt-link class="tab-item" :to="$i18n.path('lottery')">
                <img
                    class="tab-image"
                    :src="$route.name.indexOf('lottery') === -1 ? '/images/nav/lottery.png' : '/images/nav/lottery_active.png'"
                />
                <span class="tab-text">{{ $t('home.tab.lottery') }}</span>
            </nuxt-link>
        </li>
        <!-- Fishing -->
        <li class="tab-container tab-fishing" :class="{'active': $route.name.indexOf('fishing') !== -1}">
            <nuxt-link class="tab-item" :to="$i18n.path('fishing')">
                <img
                    class="tab-image"
                    :src="$route.name.indexOf('fishing') === -1 ? '/images/nav/fishing.png' : '/images/nav/fishing_active.png'"
                />
                <span class="tab-text">{{ $t('home.tab.fishing') }}</span>
            </nuxt-link>
        </li>
    </ul>
</template>
<script>
export default {
    mounted() {
        $('.tab-container').removeClass('active');
    }
};
</script>
<style lang="scss" scoped>
    .tabs-wrapper {
        display: flex;
        width: 100%;
        height: 100%;

        .tab-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;

            .tab-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: $color-black;
                width: 100%;
                height: 100%;

                .tab-image {
                    width: 31px;
                    align-self: center;
                    margin: 6px 0 4px 0;
                }

                .tab-text {
                    font-weight: bold;
                    color: $color-gray;
                    text-align: center;
                    margin: 2.5px 0;
                }
            }

            &.active {
                .tab-item {
                    .tab-text {
                        color: $color-yellow;
                    }
                }
            }
        }
    }
</style>