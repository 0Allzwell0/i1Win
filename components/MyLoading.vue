<template>
    <div class="spinner-wrapper" v-if="loading">
        <div class="spinner-container">
            <div class="spinner"></div>
            <div class="spinner"></div>
            <div class="spinner"></div>
        </div>
        <div class="spinner-backdrop"></div>
    </div>
</template>
<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;

            if (this.$route.name === 'index') {
                setTimeout(() => {
                    // Show Ad Popup
                    $('#myPopupModal').modal('show');
                }, 300);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
html.loading,
body.loading {
    position: fixed;
    width: 100%;
    overflow-y: hidden;
}

@-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

.spinner-container {
    position: fixed;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 50%;
    z-index: 9999;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    .check-text {
        display: inline-block;
        color: $color-yellow;
        font-size: 18px;
        font-weight: bold;
        margin-right: 10px;
    }
    .spinner {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: $color-yellow;
        border-radius: 100%;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        margin-bottom: -2px;

        &:nth-child(2) {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }
        &:nth-child(3) {
            -webkit-animation-delay: -0.08s;
            animation-delay: -0.08s;
        }
        &:last-child {
            -webkit-animation-delay: -0.04s;
            animation-delay: -0.04s;
        }
    }
}
.spinner-backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9998;
}
</style>