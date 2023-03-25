<template>
    <div class="popup-container div-center" @click="closePopup()">
        <div class="popup-form div-center">
            <div class="popup-content div-center">
                <img
                    class="close-icn"
                    src="../../static/icons/close.svg"
                    alt=""
                    @click="closePopup()"
                />
                <h1 class="popup-title" v-if="type == 'create'">
                    Thêm tài sản
                </h1>
                <h1 class="popup-title" v-else>Cập nhật tài sản</h1>
            </div>
            <span class="button-box">
                <button class="btn cancel-btn div-center" @click="closePopup()">
                    Hủy
                </button>
                <button
                    class="btn submit-btn div-center"
                    type="submit"
                    @click="submitForm()"
                >
                    Xác nhận
                </button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'content'],
    methods: {
        submitForm() {
            this.$emit('submitForm');
        },
        closePopup() {
            this.$emit('closePopup');
        },
    },
};
</script>
<style scoped src="../../static/css/popup.css"></style>
<style scoped>
.popup-form {
    top: 5%;
    width: 900px;
    height: 700px;
}
.popup-content {
    position: relative;
    height: 85%;
}
.button-box {
    width: 100%;
}
.popup-title {
    font-size: 24px;
    font-weight: 600;
}
.close-icn {
    cursor: pointer;
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    right: 10px;
    transition: 0.2s ease;
}
.close-icn:hover {
    transform: rotate(90deg);
}
</style>
