<template>
    <div class="main" :class="{ evenLine: itemIndex % 2 == 0 }">
        <div class="item div-center">
            <p
                class="div-center stt-col"
                @click="pushToDetails"
            >
                {{ itemIndex }}
            </p>
            <p
                class="div-center device-id-col"
                @click="pushToDetails"
            >
                {{ itemProp.deviceID }}
            </p>
            <p
                class="div-center name-col"
                @click="pushToDetails"
            >
                {{ itemProp.assetName }}
            </p>
            <p
                class="div-center year-used-col"
                @click="pushToDetails"
            >
                {{ itemProp.yearOfUse }}
            </p>
            <p
                class="div-center quantity-col"
                @click="pushToDetails"
            >
                {{ itemProp.quantity }}
            </p>
            <p
                class="div-center cost-col"
                @click="pushToDetails"
            >
                {{ moneyFormart }}
            </p>
            <p class="div-center status-col" v-if="type == 'asset'">
                {{ itemProp.status }}
            </p>
            <p class="div-center status-col" v-if="type == 'disposed'">
                {{ timeFormat }}
            </p>
            <span
                class="div-center show-action-col"
                @mouseover="showAction()"
                @mouseleave="hideAction()"
            >
                <img src="../../static/icons/three-dots-vertical.svg" alt="" />
                <Tooltip
                    class="tooltip"
                    :class="'tooltip' + itemIndex"
                    :type="type"
                    @mouseover="showAction()"
                    @delete="
                        $emit('showPopup', 'xóa', 'tài sản', itemProp.assetID)
                    "
                    @dispose="
                        $emit('showPopup', 'thanh lý', 'tài sản', itemProp.assetID)
                    "
                    @update="
                        $emit('showPopup', 'thêm mới', 'tài sản', itemProp.assetID)
                    "
                    @cancel_dispose="$emit('showPopup', 'hủy thanh lý', 'tài sản', itemProp.assetID)"
                ></Tooltip>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['type', 'itemProp', 'itemIndex'],
    data() {
        return {
            timeFormat: '',
            moneyFormart: null,
        };
    },
    mounted() {
        let date = new Date(this.itemProp.dateDisposed); // Tạo đối tượng Date từ chuỗi thời gian
        this.timeFormat = date.toLocaleDateString('vi-VN');
        this.moneyFormart = this.itemProp.cost.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    },
    computed: {
        pageParam() {
            return this.$route.query.page;
        },
    },
    methods: {
        showAction() {
            document
                .querySelector('.tooltip' + this.itemIndex)
                .classList.add('display-block');
        },
        hideAction() {
            document
                .querySelector('.tooltip' + this.itemIndex)
                .classList.remove('display-block');
        },
        pushToDetails() {
            if(this.type === 'asset') {
                this.$router.push(`/details_asset?id=${this.itemProp.assetID}`);
            }
        }
    },
};
</script>

<style scoped>
.popup {
    height: 120vh;
    top: -80px;
    left: -255px;
    right: 0;
    bottom: 0;
}
.display-block {
    display: block !important;
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
</style>