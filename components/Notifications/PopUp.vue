<template>
    <div class="popup-container div-center">
        <div class="overlay" @click="closePopup()"></div>
        <div class="popup-form div-center">
            <div class="popup-content">
                <img src="../../static/icons/warning.svg" alt="" />
                <h1 class="popup-title">{{ action }} ?</h1>
                <p class="popup-describe">Bạn có chắc muốn {{ action }} {{ object }} này</p>
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
    props: ['type', 'action', 'object'],
    methods: {
        submitForm() {
            this.$emit('submitForm', this.action);
        },
        closePopup() {
            this.$emit('closePopup');
        },
    },
};
</script>
<style scoped src="../../static/css/popup.css">
</style>
