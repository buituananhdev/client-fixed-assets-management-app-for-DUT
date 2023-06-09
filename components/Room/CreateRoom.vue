<template>
    <div class="popup-container div-center">
        <Notification
            :type="'cảnh báo'"
            :warning="'Lỗi nhập liệu'"
            v-if="showNotification"
        ></Notification>
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
                    v-if="JSON.stringify(roomProp) === '{}'"
                >
                    Thêm phòng
                </h1>
                <h1 class="popup-title" v-else>Cập nhật phòng</h1>
                <div class="form-container">
                    <div class="device-id form-col" v-if="JSON.stringify(roomProp) === '{}'">
                        <p class="form-label">
                            Mã phòng <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentRoom.roomID"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Mã phòng'),
                            }"
                            name="Mã phòng"
                        />
                        <span v-show="errors.has('Mã phòng')" class="err">{{
                            errors.first('Mã phòng')
                        }}</span>
                    </div>
                    <div class="device-id form-col">
                        <p class="form-label">
                            Tên phòng <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentRoom.roomName"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tên phòng'),
                            }"
                            name="Tên phòng"
                        />
                        <span v-show="errors.has('Tên phòng')" class="err">{{
                            errors.first('Tên hòng')
                        }}</span>
                    </div>
                    <div class="status form-col">
                        <p class="form-label">
                            Tổ chức
                            <small style="color: #c7422e">*</small>
                        </p>
                        <multiselect
                            class="multiselect"
                            :options="listOrganizations"
                            v-model="currentRoom.organizationID"
                            label="organizationName"
                            placeholder="Chọn hoặc tìm kiếm tổ chức"
                            v-validate="'required'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tổ chức'),
                            }"
                            name="Tổ chức"
                        ></multiselect>
                        <span v-show="errors.has('Tổ chức')" class="err">{{
                            errors.first('Tổ chức')
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
    props: ['type', 'content', 'roomProp', 'listOrganizations'],
    data() {
        return {
            currentRoom: {},
            listRooms: [],
            checkBtn: false,
            showNotification: false,
            listType: ['Khoa', 'Phòng ban', 'Trung tâm'],
        };
    },
    watch: {
        roomProp(newValue) {
            this.currentRoom = newValue;
            var tmp = this.listOrganizations.find(obj => obj.organizationID === this.currentRoom.organizationID);
            this.currentRoom.organizationID = tmp;
        },
    },
    methods: {
        async submitForm() {
            const result = await this.$validator.validateAll();
            if (result) {
                this.$emit('submitForm', 'thêm mới', this.currentRoom);
                this.currentRoom = {};
            } else {
                this.showNotification = true;
                setTimeout(() => {
                    this.showNotification = false;
                }, 3000);
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
    width: 500px;
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
    font-size: 20px;
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

.note {
    grid-area: note;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    height: 70%;
}
.form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-col {
    height: 68px;
    width: 100%;
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
