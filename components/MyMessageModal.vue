<template>
    <div class="modal fade" id="errorMsg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog error-msg-wrapper" role="document">
            <img class="modal-close" src="/images/modal_close.svg" />
            <div class="error-msg-container"></div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.error-msg-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: $color-white;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
    margin: 40vh 15% 0 15%;
    padding: 10% 0;

    .modal-close {
        position: absolute;
        right: -20px;
        top: -20px;
        width: 8%;
    }

    .error-msg-container {
        font-family: $font-family;
        font-size: 14px;
    }
}
</style>