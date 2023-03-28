<template>
  <div class="popup-container div-center" @click="closePopup()">
    <div class="popup-form div-center">
      <div class="popup-content div-center">
        <img
          class="close-icn"
          src="../../static/icons/close.svg"
          alt=""
          @click="closePopup()" />
        <h1 class="popup-title" v-if="type == 'create'">Thêm tài sản</h1>
        <h1 class="popup-title" v-else>Cập nhật tài sản</h1>
        <div class="form">
          <h1 class="Ma-tai-san">Mã tài sản</h1>
          <input id="textMTS" type="text">
          <h1 class="Ma-lop">Mã lớp</h1>
          <input id="textML" type="text">
          <h1 class="Ten-tai-san">Tên tài sản</h1>
          <input id="textTTS" type="text">
          <h1 class="So-luong">Số lượng</h1>
          <input id="textSL" type="text">
          <h1 class="Nam-su-dung">Năm sử dụng</h1>
          <input id="textNSD" type="text">
          <h1 class="Thanh-tien">Thành tiền</h1>
          <input id="textTT" type="text">
          <h1 class="Thong-so-ki-thuat">Thông số kỹ thuật</h1>
          <input id="textTSKT" type="text">
          <h1 class="Ghi-chu">Ghi chú</h1>
          <input id="textGC" type="text">
        </div>
      </div>
      <span class="button-box">
        <button class="btn cancel-btn div-center" @click="closePopup()">
          Hủy
        </button>
        <button
          class="btn submit-btn div-center"
          type="submit"
          @click="submitForm()">
          Xác nhận
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
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
<style scoped src="../../static/css/creatAssets.css"></style>
<style scoped>
.popup-form {
  top: 5%;
  width: 927px;
  height: 745px;
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
</style>
