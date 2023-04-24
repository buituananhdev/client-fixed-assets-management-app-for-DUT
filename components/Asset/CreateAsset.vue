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
                <h1
                    class="popup-title"
                    v-if="JSON.stringify(assetProp) === '{}'"
                >
                    Thêm tài sản
                </h1>
                <h1 class="popup-title" v-else>Cập nhật tài sản</h1>
                <div class="form-container">
                    <div class="device-id form-col">
                        <p class="form-label">
                            Mã thiết bị <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentAsset.deviceID"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Mã thiết bị'),
                            }"
                            name="Mã thiết bị"
                        />
                        <span v-show="errors.has('Mã thiết bị')" class="err">{{
                            errors.first('Mã thiết bị')
                        }}</span>
                    </div>
                    <div class="asset-name form-col">
                        <p class="form-label">
                            Tên tài sản <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentAsset.assetName"
                            v-validate="'required|min:1|max:40'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tên tài sản'),
                            }"
                            name="Tên tài sản"
                        />
                        <span v-show="errors.has('Tên tài sản')" class="err">{{
                            errors.first('Tên tài sản')
                        }}</span>
                    </div>
                    <div class="room-name form-col">
                        <p class="form-label">
                            Phòng sử dụng
                            <small style="color: #c7422e">*</small>
                        </p>
                        <multiselect
                            class="multiselect"
                            :options="listRooms"
                            v-model="currentAsset.roomID"
                            placeholder="Tìm kiếm hoặc chọn phòng"
                            v-validate="'required'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Phòng sử dụng'),
                            }"
                            name="Phòng sử dụng"
                        ></multiselect>
                        <span
                            v-show="errors.has('Phòng sử dụng')"
                            class="err"
                            >{{ errors.first('Phòng sử dụng') }}</span
                        >
                    </div>
                    <div class="quantity form-col">
                        <p class="form-label">
                            Số lượng <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentAsset.quantity"
                            v-validate="'required|numeric'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Số lượng'),
                            }"
                            name="Số lượng"
                        />
                        <span v-show="errors.has('Số lượng')" class="err">{{
                            errors.first('Số lượng')
                        }}</span>
                    </div>
                    <div class="total form-col">
                        <p class="form-label">
                            Thành tiền <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentAsset.cost"
                            v-validate="'required|numeric'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Thành tiền'),
                            }"
                            name="Thành tiền"
                        />
                        <span v-show="errors.has('Thành tiền')" class="err">{{
                            errors.first('Thành tiền')
                        }}</span>
                    </div>
                    <div class="technicalSpecification form-col">
                        <p class="form-label">Thông số kỹ thuật</p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentAsset.technicalSpecification"
                            v-validate="'min:1|max:255'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Thông số kỹ thuật'),
                            }"
                            name="Thông số kỹ thuật"
                        />
                        <span
                            v-show="errors.has('Thông số kỹ thuật')"
                            class="err"
                            >{{ errors.first('Thông số kỹ thuật') }}</span
                        >
                    </div>
                    <div class="status form-col" v-if="JSON.stringify(assetProp) != '{}'">
                        <p class="form-label">
                            Tình trạng
                            <small style="color: #c7422e">*</small>
                        </p>
                        <multiselect
                            class="multiselect"
                            :options="listStatus"
                            v-model="status"
                            placeholder="Chọn tình trạng"
                            v-validate="'required'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tình trạng'),
                            }"
                            name="Tình trạng"
                        ></multiselect>
                        <span
                            v-show="errors.has('Tình trạng')"
                            class="err"
                            >{{ errors.first('Tình trạng') }}</span
                        >
                    </div>
                    <div class="note">
                        <p class="form-label">Ghi chú</p>
                        <textarea
                            id=""
                            cols="30"
                            rows="10"
                            class="form-inp"
                            v-model="currentAsset.notes"
                            v-validate="'min:1|max:255'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Ghi chú'),
                            }"
                            name="Ghi chú"
                        ></textarea>
                        <span v-show="errors.has('Ghi chú')" class="err">{{
                            errors.first('Ghi chú')
                        }}</span>
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
    props: ['type', 'content', 'assetProp'],
    data() {
        return {
            currentAsset: {},
            status: "",
            listRooms: [],
            checkBtn: false,
            listStatus: [
                'Hoạt động tốt',
                'Hư hỏng, cần được sửa chữa',
                'Đang bảo dưỡng',
            ],
        };
    },
    mounted() {
        this.fetchRoom();
    },
    watch: {
        assetProp(newValue) {
            this.currentAsset = newValue;
            this.status = newValue.status;
        },
        status(newVal) {
            this.currentAsset.status =  this.status;
            console.log(this.currentAsset);
        }
    },
    methods: {
        async fetchRoom() {
            try {
                const response = await this.$axios.get(`/rooms`);
                this.listRooms = response.data.data.map((room) => room.roomID);
            } catch (error) {
                console.log(error);
            }
        },
        async submitForm() {
            const result = await this.$validator.validateAll();
            if (result) {
                this.$emit('submitForm', 'thêm mới', this.currentAsset);
                console.log(this.currentAsset);
            }
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
    width: 680px;
    min-height: 700px;
    padding: 32px 24px 32px 24px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;
}
.popup-content {
    position: relative;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;
}
.button-box {
    height: 10%;
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
    right: 5px;
    transition: 0.2s ease;
}
.close-icn:hover {
    transform: rotate(90deg);
}

.form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 24px 24px;
    grid-auto-flow: row;
    width: 100%;
    max-height: 70%;
    grid-template-areas:
        'device-id room-name'
        'asset-name total'
        'quantity technicalSpecification'
        'status .'
        'note note';
}

.device-id {
    grid-area: device-id;
}

.asset-name {
    grid-area: asset-name;
}

.quantity {
    grid-area: quantity;
}

.room-name {
    grid-area: room-name;
}

.technicalSpecification {
    grid-area: technicalSpecification;
}

.total {
    grid-area: total;
}

.status {
    grid-area: status;
}

.note {
    grid-area: note;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    height: 70%;
}

.form-col {
    min-height: 66px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
}
.multiselect {
    width: 100%;
    height: 100%;
}
.form-inp {
    width: 100%;
    height: 100%;
    padding: 6px 12px;
    border: solid 0.5px #dfe0eb;
    border-radius: 6px;
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
    height: 120px;
}
.err {
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    color: #ff4433;
}
</style>
