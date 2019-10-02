<template>
    <div class="announcement-text"></div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', {
            announcement: 'GetAnnouncement'
        })
    },
    mounted() {
        // Get Announcement
        this.$store.dispatch('user/getAnnouncement');

        // Asign Announcemet Data
        $('.announcement-text').html(this.announcement);

        // Announcement Setting
        $('.announcement-text').marquee({
            duration: 10000
        });
    }
};
</script>
<style lang="scss" scoped>
.announcement-text {
    width: 100%;
    color: $color-white;
    background: $color-black;
    overflow-x: hidden;
    padding: 1px 0;
}
</style>