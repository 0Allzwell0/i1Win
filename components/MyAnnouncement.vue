<template>
    <div class="announcement-text"></div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('user', {
            announcements: 'GetAnnouncements'
        })
    },
    mounted() {
        // Get Announcement
        this.$store.dispatch('user/getAnnouncement').then(() => {
            // Asign Announcemet Data
            for (let i = 0; i < this.announcements.length; i++) {
                $('.announcement-text').append(`[ ${this.announcements[i].date} ] ${this.announcements[i].text} `);
            }

            // Announcement Setting
            $('.announcement-text').marquee({
                duration: 10000
            });
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