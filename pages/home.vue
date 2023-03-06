<template>
    <div class="container">
        <TabLeft @closeTab="closeTab()" @openTab="openTab()"></TabLeft>
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
                ></assetItem>
            </div>
        </div>
    </div>
</template>

<script>
import TabLeft from '@/components/TabLeft.vue';
import assetItem from '@/components/assetItem.vue';
export default {
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
                        this.listAssets = res['data'];
                        console.log(this.listAssets);
                    });
            } catch (error) {
                console.log(error);
            }
        },
        closeTab(){
            document.querySelector('.page-main').classList.add('isClose');
            document.querySelector('.page-main').classList.remove('isOpen');
        },
        openTab(){
            document.querySelector('.page-main').classList.add('isOpen');
            document.querySelector('.page-main').classList.remove('isClose');
        }
    },
};
</script>

<style scoped>
* {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}
.page-main {
    position: absolute;
    right: 0;
    padding-left: 24px;
    width: calc(100% - 255px);
}
.table-assets-header {
    display: flex;
    gap: 20px;
}
.table-assets-header p {
    width: 140px;
}
.isClose{
    transform: translate(-210px);
    transition: all .3s ease;
}
.isOpen{
    transform: translate(0);
    transition: all .3s ease;
}
</style>
