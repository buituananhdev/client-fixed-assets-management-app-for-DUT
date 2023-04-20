<template>
    <div class="container">
        <Header class="page-top"></Header>
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1 class="page-main-title">
                    <img
                        src="../../static/icons/back.svg"
                        alt=""
                        style="cursor: pointer"
                        @click="$router.go(-1)"
                    />
                    Chi tiết tài sản
                </h1>
                <div class="table-assets">
                    <div class="table-container">
                        <div class="detail-container">
                            <p class="detail-title">Mã thiết bị</p>
                            <p class="detail">{{ currentAsset.deviceID }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Tên thiết bị</p>
                            <p class="detail">{{ currentAsset.assetName }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Phòng đang sử dụng</p>
                            <p class="detail">{{ currentAsset.roomID }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Năm sử dụng</p>
                            <p class="detail">{{ currentAsset.yearOfUse }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Thông số kỹ thuật</p>
                            <p class="detail">
                                {{ currentAsset.technicalSpecification }}
                            </p>
                        </div>
                    </div>
                    <div class="table-container">
                        <div class="detail-container">
                            <p class="detail-title">Số lượng</p>
                            <p class="detail">{{ currentAsset.quantity }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Thành tiền</p>
                            <p class="detail">{{ currentAsset.cost }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Tỷ lệ % CL</p>
                            <p class="detail">
                                {{ currentAsset.percentageCL }}
                            </p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Trạng thái</p>
                            <p class="detail">{{ currentAsset.status }}</p>
                        </div>
                        <div class="detail-container">
                            <p class="detail-title">Ghi chú</p>
                            <p class="detail">{{ currentAsset.notes }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import assetItem from '@/components/Asset/assetItem.vue';

export default {
    components: {
        assetItem,
    },
    data() {
        return {
            currentAsset: [],
            isHaveContent: false,
        };
    },

    computed: {
        pageParam() {
            return this.$route.query.id;
        },
    },
    mounted() {
        this.fetchData();
        console.log(this.pageParam);
    },
    watch: {
        pageParam: async function () {
            this.fetchData();
        },
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get(`/asset/${this.pageParam}`)
                    .then((res) => {
                        this.currentAsset = res['data']['data'];
                        this.isHaveContent = true;
                        console.log(this.currentAsset);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAsset() {
            try {
                await this.$axios.delete(`/asset/${this.itemProp.assetID}`);
            } catch (error) {
                console.log(error);
            }
        },
        async disposeAsset() {
            try {
                await this.$axios.post(`/asset/${this.itemProp.assetID}`);
            } catch (error) {
                console.log(error);
            }
        },
        closeTab() {
            document
                .querySelector('.page-main')
                .classList.add('close-collapse');
            document
                .querySelector('.page-main')
                .classList.remove('open-collapse');
            document.querySelector('.page-top').classList.add('close-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('open-collapse');
        },
        openTab() {
            document.querySelector('.page-main').classList.add('open-collapse');
            document
                .querySelector('.page-main')
                .classList.remove('close-collapse');
            document.querySelector('.page-top').classList.add('open-collapse');
            document
                .querySelector('.page-top')
                .classList.remove('close-collapse');
        },
    },
};
</script>

<style scoped src="../../static/css/table_assets.css"></style>
<style scoped>
.table-assets {
    max-width: 50%;
    padding-top: 32px;
    padding-left: 48px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.table-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.detail-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.detail-title {
    font-size: 20px;
    font-weight: 600;
}

.detail {
    font-size: 16px;
}
</style>
