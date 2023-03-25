<template>
    <div class="popup-container div-center" @click="closePopup()">
        <div class="popup-form div-center">
            <div class="popup-content">
                <img src="../../static/icons/warning.svg" alt="" />
                <h1 class="popup-title">{{ title }}</h1>
                <p class="popup-describe">{{ content }}</p>
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
    props: ['title', 'content'],
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
<style scoped src="../../static/css/popup.css">
</style>
