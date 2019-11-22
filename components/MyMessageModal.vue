<template>
    <div class="modal fade" id="errorMsg" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog error-msg-wrapper" role="document">
            <div class="error-msg-container"></div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.error-msg-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 33vh;
    padding: 0;

    .error-msg-container {
        position: relative;
        width: 80%;
        max-width: 550px;
    }
}
</style>