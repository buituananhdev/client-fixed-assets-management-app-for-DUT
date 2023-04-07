<template>
    <div class="popup-container div-center">
        <div class="overlay" @click="closePopup()"></div>
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
                <div class="form-container">
                    <div class="asset-id form-col">
                        <p class="form-label">Mã tài sản <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.assetID">
                    </div>
                    <div class="device-id form-col">
                        <p class="form-label">Mã thiết bị <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.deviceID">
                    </div>
                    <div class="asset-name form-col">
                        <p class="form-label">Tên tài sản <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.assetName">
                    </div>
                    <div class="organization-name form-col">
                        <p class="form-label">Tên khoa sử dụng <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.deviceID">
                    </div>
                    <div class="room-name form-col">
                        <p class="form-label">Phòng sử dụng <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.roomID">
                    </div>
                    <div class="quantity form-col">
                        <p class="form-label">Số lượng <small style="color: #c7422e">*</small></p>
                        <input type="number" class="form-inp" v-model="currentAsset.quantity">
                    </div>
                    <div class="total form-col">
                        <p class="form-label">Thành tiền <small style="color: #c7422e">*</small></p>
                        <input type="text" class="form-inp" v-model="currentAsset.cost">
                    </div>
                    <div class="technicalSpecification form-col">
                        <p class="form-label">Thông số kỹ thuật</p>
                        <input type="text" class="form-inp" v-model="currentAsset.technicalSpecification">
                    </div>
                    <div class="note">
                        <p class="form-label">Ghi chú</p>
                        <textarea name="" id="" cols="30" rows="10" class="form-inp" v-model="currentAsset.notes"></textarea>
                    </div>
                </div>
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
    props: ['type', 'content', 'assetID'],
    data(){
        return {
            currentAsset: {},
        }
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`/asset/${this.assetID}`)
                    .then((res) => {
                        this.currentAsset = res['data']['data'];
                        console.log(this.currentAsset);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        submitForm() {
            console.log(this.assetID);
            this.$emit('submitForm');
        },
        closePopup() {
            this.$emit('closePopup');
        },
    },
    watch: {
        assetID() {
            this.fetchData();
        }
    },
};
</script>
<style scoped src="../../static/css/popup.css"></style>
<style scoped>
.popup-form {
    top: 5%;
    width: 680px;
    height: 620px;
    padding: 32px;
    padding-bottom: 48px;
    justify-content: center;
    align-items: center;
}
.popup-content {
    position: relative;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    gap: 24px;
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
    right: -5px;
    transition: 0.2s ease;
}
.close-icn:hover {
    transform: rotate(90deg);
}
.form-container {
    /* grid setting */
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 12px 24px;
    grid-auto-flow: row;
    width: 100%;
    height: 80%;
}

.asset-id {
    grid-area: 1 / 1 / 2 / 2;
}

.device-id {
    grid-area: 2 / 1 / 3 / 2;
}

.asset-name {
    grid-area: 3 / 1 / 4 / 2;
}

.organization-name {
    grid-area: 1 / 2 / 2 / 3;
}

.room-name {
    grid-area: 2 / 2 / 3 / 3;
}

.quantity {
    grid-area: 4 / 1 / 5 / 2;
}

.total {
    grid-area: 3 / 2 / 4 / 3;
}

.technicalSpecification {
    grid-area: 4 / 2 / 5 / 3;
}

.note {
    grid-area: 5 / 1 / 6 / 3;
}

.form-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
}

.form-inp {
    width: 100%;
    padding: 6px 12px;
    border: solid .5px #dfe0eb;
    border-radius: 8px;
    cursor: pointer;
}
input {
    height: 100%;
}

.form-inp:focus {
    outline-width: 0;
}

textarea {
    resize: none;
    height: 100px;
}
</style>