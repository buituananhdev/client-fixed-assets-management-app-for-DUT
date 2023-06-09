<template>
    <div class="popup-container div-center">
        <Notification
            :type="'cảnh báo'"
            :warning="'Lỗi nhập liệu'"
            v-if="showNotification == 'empty'"
        ></Notification>
        <Notification
            :type="'cảnh báo'"
            :warning="'Xác nhận mật khẩu không khớp'"
            v-if="showNotification == 'password'"
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
                    v-if="JSON.stringify(userProp) === '{}'"
                >
                    Thêm tài khoản
                </h1>
                <h1 class="popup-title" v-else>Cập nhật tài khoản</h1>
                <div class="form-container">
                    <div class="device-id form-col">
                        <p class="form-label">
                            Họ và tên <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.fullName"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Họ và tên'),
                            }"
                            name="Họ và tên"
                        />
                        <span v-show="errors.has('Họ và tên')" class="err">{{
                            errors.first('Họ và tên')
                        }}</span>
                    </div>
                    <div class="status form-col">
                        <p class="form-label">
                            Chức vụ
                            <small style="color: #c7422e">*</small>
                        </p>
                        <multiselect
                            class="multiselect"
                            :options="listType"
                            v-model="currentUser.userRole"
                            placeholder="Chọn chức vụ"
                            v-validate="'required'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Chức vụ'),
                            }"
                            name="Chức vụ"
                        ></multiselect>
                        <span v-show="errors.has('Chức vụ')" class="err">{{
                            errors.first('Chức vụ')
                        }}</span>
                    </div>
                    <div class="device-id form-col">
                        <p class="form-label">
                            Tên đăng nhập
                            <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            class="form-inp"
                            v-model="currentUser.username"
                            v-validate="'required|min:1|max:30'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Tên đăng nhập'),
                            }"
                            name="Tên đăng nhập"
                        />
                        <span
                            v-show="errors.has('Tên đăng nhập')"
                            class="err"
                            >{{ errors.first('Tên đăng nhập') }}</span
                        >
                    </div>
                    <div class="device-id form-col">
                        <p class="form-label">
                            Mật khẩu <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            autocomplete="off"
                            v-if="isShowPass"
                            class="form-inp"
                            v-model="currentUser.password"
                            v-validate="'required|min:1|max:30|password'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Mật khẩu'),
                            }"
                            name="Mật khẩu"
                        />
                        <input
                            type="password"
                            autocomplete="off"
                            v-else
                            class="form-inp"
                            v-model="currentUser.password"
                            v-validate="'required|min:1|max:30|password'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Mật khẩu'),
                            }"
                            name="Mật khẩu"
                        />
                        <img
                            class="eye-icn"
                            v-if="isShowPass"
                            src="../../static/icons/eye-slash.svg"
                            alt=""
                            @click="isShowPass = !isShowPass"
                        />
                        <img
                            class="eye-icn"
                            v-else
                            src="../../static/icons/eye.svg"
                            alt=""
                            @click="isShowPass = !isShowPass"
                        />
                        <span v-show="errors.has('Mật khẩu')" class="err">{{
                            errors.first('Mật khẩu')
                        }}</span>
                    </div>
                    <div class="device-id form-col">
                        <p class="form-label">
                            Xác nhận mật khẩu
                            <small style="color: #c7422e">*</small>
                        </p>
                        <input
                            type="text"
                            v-if="isShowConfirm"
                            class="form-inp"
                            v-model="password"
                            v-validate="'required|min:1|max:32|password'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Xác nhận mật khẩu'),
                            }"
                            name="Xác nhận mật khẩu"
                        />
                        <input
                            v-else
                            type="password"
                            class="form-inp"
                            v-model="password"
                            v-validate="'required|min:1|max:32|password'"
                            :class="{
                                input: true,
                                'is-danger': errors.has('Xác nhận mật khẩu'),
                            }"
                            name="Xác nhận mật khẩu"
                        />
                        <img
                            class="eye-icn"
                            v-if="isShowConfirm"
                            src="../../static/icons/eye-slash.svg"
                            alt=""
                            @click="isShowConfirm = !isShowConfirm"
                        />
                        <img
                            class="eye-icn"
                            v-else
                            src="../../static/icons/eye.svg"
                            alt=""
                            @click="isShowConfirm = !isShowConfirm"
                        />
                        <span
                            v-show="errors.has('Xác nhận mật khẩu')"
                            class="err"
                            >{{ errors.first('Xác nhận mật khẩu') }}</span
                        >
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
    props: ['type', 'content', 'userProp'],
    data() {
        return {
            currentUser: {},
            isShowPass: false,
            isShowConfirm: false,
            password: '',
            checkBtn: false,
            showNotification: false,
            listType: ['Nhân viên', 'Quản trị viên'],
        };
    },
    watch: {
        userProp(newValue) {
            this.currentUser = newValue;
            this.password = '';
            this.currentUser.password = '';
        },
    },
    methods: {
        async submitForm() {
            const result = await this.$validator.validateAll();
            if (result && this.currentUser.password === this.password) {
                this.$emit('submitForm', 'thêm mới', this.currentUser);
                console.log(this.currentUser);
            } else if (this.currentUser.password !== this.password) {
                this.showNotification = 'password';
                setTimeout(() => {
                    this.showNotification = '';
                }, 3000);
            } else {
                this.showNotification = 'empty';
                setTimeout(() => {
                    this.showNotification = '';
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
    top: 10%;
    padding: 32px 24px 32px 24px;
    width: 550px;
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
    position: relative;
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

.eye-icn {
    width: 16px;
    position: absolute;
    right: 20px;
    top: 37px;
    cursor: pointer;
}
</style>
