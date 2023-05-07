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
                    Thêm người dùng
                </h1>
                <h1 class="popup-title" v-else>Cập nhật người dùng</h1>
                <div class="form-container">
                    <div class="user-id form-col">
                        <p class="form-label">
                            Họ và Tên <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.fullName"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Họ và Tên'),
                            }"
                            name="Họ và Tên"
                        />
                        <span v-show="errors.has('Họ và Tên')" class="err">{{
                            errors.first('Họ và Tên')
                        }}</span>
                    </div>
                    <div class="asset-name form-col">
                        <p class="form-label">
                            Tài khoản đăng nhập
                            <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.username"
                            v-validate="'required|min:1|max:40'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tài khoản đăng nhập'),
                            }"
                            name="Tài khoản đăng nhập"
                        />
                        <span
                            v-show="errors.has('Tài khoản đăng nhập')"
                            class="err"
                            >{{ errors.first('Tài khoản đăng nhập') }}</span
                        >
                    </div>
                    <div class="asset-name form-col">
                        <p class="form-label">
                            Mật khẩu <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.password"
                            v-validate="'required|min:1|max:40'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Mật khẩu'),
                            }"
                            name="Mật khẩu"
                        />
                        <span v-show="errors.has('Mật khẩu')" class="err">{{
                            errors.first('Mật khẩu')
                        }}</span>
                    </div>
                    <div class="asset-name form-col">
                        <p class="form-label">
                            Chức vụ <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.userRole"
                            v-validate="'required|min:1|max:40'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Chức vụ'),
                            }"
                            name="Chức vụ"
                        />
                        <span v-show="errors.has('Chức vụ')" class="err">{{
                            errors.first('Chức vụ')
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
            currentUser: {},
        };
    },
    mounted() {},
    watch: {
        assetProp(newValue) {
            this.currentUser = newValue;
            this.status = newValue.status;
        },
        status(newVal) {
            this.currentUser.status = this.status;
        },
    },
    methods: {
        async submitForm() {
            const result = await this.$validator.validateAll();
            if (result) {
                this.$emit('submitForm', 'thêm mới', this.currentUser);
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
    width: 550px;
    min-height: 520px;
    padding: 32px 24px 32px 24px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;
}
.popup-content {
    position: relative;
    max-height: 100%;
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
    /* display: grid; */
    /* grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
      grid-auto-columns: 1fr;
      grid-auto-rows: 1fr;
      gap: 24px 24px;
      grid-auto-flow: row; */
    width: 100%;
    max-height: 70%;
    grid-template-areas:
        'user-id room-name'
        'asset-name total'
        'quantity technicalSpecification'
        'status .'
        'note note';
}

.user-id {
    grid-area: user-id;
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
