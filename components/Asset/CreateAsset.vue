<template>
  <div class="popup-container div-center">
    <div class="overlay" @click="($event) => closePopup()"></div>
    <div class="popup-form div-center">
      <div class="popup-content div-center">
        <img
          class="close-icn"
          src="../../static/icons/close.svg"
          alt=""
          @click="closePopup()"
        />
        <h1 class="popup-title" v-if="type == 'create'">Thêm tài sản</h1>
        <h1 class="popup-title" v-else>Thêm tài sản</h1>
        <div class="form">
          <div class="form-body1">
            <div class="tile-input">
              <h1 class="form-tile">
                Mã tài sản <small style="color: red; font-size: 16px">*</small>
              </h1>
              <input class="form-input width" type="text" />
              <h1 class="form-tile">
                Tên tài sản<small style="color: red; font-size: 16px">*</small>
              </h1>
              <input class="form-input width" type="text" />
              <h1 class="form-tile">Năm sử dụng</h1>
              <input class="form-input width" type="text" />
            </div>
            <div class="tile-input">
              <h1 class="form-tile">
                Mã lớp<small style="color: red; font-size: 16px">*</small>
              </h1>
              <select class="form-input passClass"></select>
              <h1 class="form-tile">
                Mã thiết bị<small style="color: red; font-size: 16px">*</small>
              </h1>
              <input class="form-input width" type="text" />
              <h1 class="form-tile">
                Số lượng<small style="color: red; font-size: 16px">*</small>
              </h1>
              <input class="form-input width" type="text" />
            </div>
          </div>
          <div class="tile-input3">
            <h1 class="form-tile">
              Thành tiền<small style="color: red; font-size: 16px">*</small>
            </h1>
            <input class="form-input width" type="text" />
            <h1 class="form-tile">Thông số kỹ thuật</h1>
            <input class="form-input width1" type="text" />
            <h1 class="form-tile">Ghi chú</h1>
            <input class="form-input width1" type="text" />
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
import SelectBox from "../SelectBox/SelectBox.vue";
export default {
  components: { SelectBox },
  props: ["type", "content"],
  methods: {
    submitForm() {
      this.$emit("submitForm");
    },
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>
<style scoped src="../../static/css/popup.css"></style>
<style scoped>
.overlay {
  width: 100%;
  height: 100%;
}

.popup-form {
  top: 5%;
  width: 927px;
  height: 745px;
  z-index: 9998;
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
  position: absolute;
  position: absolute;
  width: 200px;
  height: 58px;
  left: 0px;
  top: 0px;
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

.form {
  width: 95.5%;
  height: 80%;
  margin-left: 20px;
}

.form-tile {
  font-family: "Mulish";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  margin: 8px;
}

.form-input {
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 12px;
}

.form-input.width1 {
  flex: 1;
  padding-bottom: 25px;
}

.tile-input3 {
  display: flex;
  flex-direction: column;
}

.form-body1 {
  display: flex;
  justify-content: space-between;
}

.form-input.width {
  padding-right: 200px;
  flex: 1;
}

.form-input.passClass{
  padding-left: 347px;
}

</style>
