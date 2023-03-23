<style scoped>
.popup-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.popup-form {
    cursor: context-menu;
    flex-direction: column;
    padding: 24px;
    gap: 32px;
    position: absolute;
    top: 20%;
    z-index: 999;
    width: 400px;
    height: 248px;
    /* White */
    background: #ffffff;
    /* Shadow/xl */
    box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
        0px 8px 8px -4px rgba(16, 24, 40, 0.03);
    border-radius: 12px;
    animation: show 0.2s ease;
}

@keyframes show {
    from {
        transform: scale(0.2);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
.popup-content {
    /* Content */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    width: 352px;
    height: 124px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}
.popup-title {
    /* Text */
    width: 352px;
    height: 28px;
    /* Text lg/Medium */
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 28px;
    /* identical to box height, or 156% */
    /* Gray/900 */
    color: #101828;
    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}
.popup-describe {
    /* Supporting text */
    width: 352px;
    height: 20px;
    /* Text sm/Normal */
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height, or 143% */
    /* Gray/500 */
    color: #667085;
    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
.button-box {
    /* _Modal actions */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    width: 352px;
    height: 44px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
.btn {
    /*text*/
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */
    /* Gray/700 */
    color: #344054;
    cursor: pointer;
    /* _Button base */
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 8px;
    width: 170px;
    height: 44px;
    /* White */
    background: #ffffff;
    /* Gray/300 */
    border: 1px solid #d0d5dd;
    /* Shadow/xs */
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
}
.btn:hover {
    opacity: .8;
}
.submit-btn {
    background: #7f56d9;
    color: #fff;
}
</style>
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
