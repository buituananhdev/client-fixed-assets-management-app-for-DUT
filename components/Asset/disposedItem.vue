<template>
    <div
        class="main"
        :class="{ evenLine: itemIndex % 2 == 0 }"
        @click="$router.push(`/details_asset/${itemProp.assetID}`)"
    >
        <div class="item div-center">
            <p class="div-center stt-col">{{ itemIndex }}</p>
            <p class="div-center id-col">{{ itemProp.assetID }}</p>
            <p class="div-center device-id-col">{{ itemProp.deviceID }}</p>
            <p class="div-center name-col">{{ itemProp.assetName }}</p>
            <p class="div-center year-used-col">{{ itemProp.yearOfUse }}</p>
            <p class="div-center quantity-col">{{ itemProp.quantity }}</p>
            <p class="div-center cost-col">{{ itemProp.cost }}</p>
            <p class="div-center status-col">{{ formatted }}</p>
            <span class="div-center show-action-col" style="cursor: pointer">
                <img src="../../static/icons/three-dots-vertical.svg" alt="" />
                <!-- <Tooltip class="tooltip" v-show="isShowAction"></Tooltip> -->
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['itemProp', 'itemIndex'],
    data() {
        return {
            isShowAction: true,
            formatted: '',
        };
    },
    mounted() {
        let date = new Date(this.itemProp.dateDisposed); // Tạo đối tượng Date từ chuỗi thời gian
        this.formatted = date.toLocaleDateString("vi-VN");
    },
};
</script>

<style scoped>
.tooltip {
    width: 100px !important;
    height: 100px !important;
    background: red;
}
.main {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 20px;
    padding: 0 32px;
}
.item {
    width: 100%;
    cursor: pointer;
}
.item p {
    font-size: 15px;
}
.item:hover p {
    color: #008cde;
    text-decoration: underline;
}
.item:hover .custom-select-trigger {
    color: #008cde;
}
.evenLine {
    background: #dfe0eb;
}

.show-action-col::after {
    display: none;
    content: '';
    width: 100px;
    height: 100px;
}
</style>
