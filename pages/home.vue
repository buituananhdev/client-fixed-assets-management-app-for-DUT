<template>
    <div class="container">
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
        <div class="main-content">
            <div class="page-main">
                <h1>Manage Assets</h1>
                <div class="table-assets">
                    <span class="table-assets-header">
                        <p>ID</p>
                        <p>Mã thiết bị</p>
                        <p>Mã phòng</p>
                        <p>Tên</p>
                        <p>Năm sử dụng</p>
                        <p>Thông số kỹ thuật</p>
                        <p>Số lượng</p>
                        <p>Thành tiền</p>
                        <p>Trạng thái</p>
                        <p>Ghi chú</p>
                    </span>
                    <assetItem
                        v-for="item in listAssets"
                        :key="item"
                        :itemProp="item"
                        style="width: 100%"
                    ></assetItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabLeft from '@/components/TabLeft.vue';
import assetItem from '@/components/assetItem.vue';

export default {
    //middleware: [auth],
    components: {
        TabLeft,
        assetItem,
    },
    data() {
        return {
            listAssets: [],
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                await this.$axios
                    .get('https://localhost:7011/api/asset')
                    .then((res) => {
                        this.listAssets = res['data']['data'];
                        console.log(this.listAssets);
                    });
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
        },
        openTab() {
            document.querySelector('.page-main').classList.add('open-collapse');
            document
                .querySelector('.page-main')
                .classList.remove('close-collapse');
        },
    },
};
</script>

<style scoped>
* {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}
.main-content {
    position: absolute;
    right: 0;
    padding: 24px;
    width: calc(100% - 255px);
    display: flex;
    justify-content: center;
}
.page-main {
    width: 70%;
}
.table-assets-header {
    display: flex;
    gap: 20px;
}
.table-assets-header p {
    width: 100%;
}
.close-collapse {
    transform: translate(-210px);
    transition: all 0.2s ease;
}
.open-collapse {
    transform: translate(0);
    transition: all 0.2s ease;
}
</style>
