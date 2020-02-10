<template>
    <div class="modal fade" id="myPopupModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog my-modal-wrapper" role="document">
            <div class="my-modal-container">
                <img class="my-modal-close" src="/images/modal_close.svg" alt data-dismiss="modal" />
                <img class="my-modal-image" id="modalImage" src="https://static.i1win.com/banner/1568200140855506763.png" alt />
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
    .my-modal-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 33vh;
        padding: 0;

        .my-modal-container {
            position: relative;
            width: 80%;
            max-width: 550px;

            .my-modal-close {
                position: absolute;
                z-index: 1051;
                top: 7%;
                right: 4%;
                width: 20px;
            }

            .my-modal-image {
                width: 100%;
            }
        }
    }
</style>